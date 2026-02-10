import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

function findLatestFile(dir: string, ext: string) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith(ext))
    .map(f => ({
      name: f,
      path: path.join(dir, f),
      time: fs.statSync(path.join(dir, f)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);
  return files[0] || null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const escola = searchParams.get('escola') || 'integrado';
  const areaFormacao = searchParams.get('area_formacao') || '';
  const areaConhecimento = searchParams.get('area_conhecimento') || '';

  try {
    // Diretório base
    const baseDir = path.resolve(process.cwd(), '..');
    const relatoriosDir = path.join(baseDir, 'relatorios');
    const docxScript = path.join(baseDir, '.skills/criar-dashboard-faculdade/exportar_filtro_sprmed_docx.py');
    const converterScript = path.join(baseDir, '.skills/criar-dashboard-faculdade/converter_pdf_marca_dagua.py');

    // Monta comando de exportação DOCX
    let cmd = `python3 "${docxScript}" --nome ${escola}`;
    if (areaFormacao) {
      cmd += ` --area_formacao ${areaFormacao}`;
    }
    if (areaConhecimento) {
      const safeArea = areaConhecimento.replace(/"/g, '\\"');
      cmd += ` --area_conhecimento "${safeArea}"`;
    }

    console.log('Executando:', cmd);

    // Executa script DOCX
    const { stdout, stderr } = await execAsync(cmd, { cwd: baseDir, timeout: 180000, maxBuffer: 10 * 1024 * 1024 });
    console.log('Saída:', stdout);
    if (stderr) console.error('Erros:', stderr);

    // Extrai caminho do DOCX gerado
    let docxPath: string | null = null;
    const match = stdout.match(/Arquivo:\s*(.+\.docx)/i) || stdout.match(/Relat[oó]rio salvo:\s*(.+\.docx)/i);
    if (match && match[1]) {
      docxPath = match[1].trim();
    }

    // Fallback: pega o DOCX mais recente
    if (!docxPath) {
      const latestDocx = findLatestFile(relatoriosDir, '.docx');
      if (!latestDocx) throw new Error('Nenhum arquivo DOCX gerado');
      docxPath = latestDocx.path;
    }

    // Converte para PDF com marca d'água
    const convertCmd = `python3 "${converterScript}" "${docxPath}"`;
    console.log('Convertendo:', convertCmd);
    await execAsync(convertCmd, { cwd: baseDir, timeout: 180000, maxBuffer: 10 * 1024 * 1024 });

    // PDF final
    const pdfPath = docxPath.replace(/\.docx$/i, '.pdf');
    if (!fs.existsSync(pdfPath)) {
      throw new Error('Nenhum arquivo PDF gerado');
    }

    // Lê o arquivo
    const fileBuffer = fs.readFileSync(pdfPath);
    const filename = path.basename(pdfPath);

    // Retorna o arquivo
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error('Erro ao exportar:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
