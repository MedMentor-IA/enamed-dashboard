import { Questao, IndicesDimensao, SPRMedDimensao } from '@/types';

export interface ProcessedDimension {
  nome: string;
  qtd: number;
  acertou: number;
  errou: number;
  taxa: number;
  score: number;
  numeros: number[];
}

// Calcula score de efetividade: (100 - taxa) * log(qtd + 1)
// Prioriza gaps que são comuns E têm baixo desempenho
export function calcularScore(taxa: number, qtd: number): number {
  return (100 - taxa) * Math.log(qtd + 1);
}

// Processa dimensão para gerar dados do gráfico
export function processarDimensao(
  indices: IndicesDimensao,
  taxas: SPRMedDimensao | Record<string, { taxa: number }>,
  questoes: Questao[],
  ordenacao: 'efetividade' | 'taxa-asc' | 'taxa-desc' | 'qtd-desc' = 'efetividade'
): ProcessedDimension[] {
  const resultado: ProcessedDimension[] = [];

  for (const [nome, numeros] of Object.entries(indices)) {
    const taxa = taxas[nome]?.taxa ?? 0;
    const qtd = numeros.length;
    
    // Conta acertos e erros baseado na taxa
    const qsFiltradas = questoes.filter(q => numeros.includes(q.numero));
    const totalAcertos = qsFiltradas.reduce((sum, q) => sum + q.acertos, 0);
    const totalRespostas = qsFiltradas.reduce((sum, q) => sum + q.total, 0);
    
    const acertou = qsFiltradas.filter(q => q.taxa_acerto >= 50).length;
    const errou = qsFiltradas.filter(q => q.taxa_acerto < 50).length;
    
    resultado.push({
      nome,
      qtd,
      acertou,
      errou,
      taxa,
      score: calcularScore(taxa, qtd),
      numeros
    });
  }

  // Ordena conforme critério
  switch (ordenacao) {
    case 'efetividade':
      resultado.sort((a, b) => b.score - a.score);
      break;
    case 'taxa-asc':
      resultado.sort((a, b) => a.taxa - b.taxa);
      break;
    case 'taxa-desc':
      resultado.sort((a, b) => b.taxa - a.taxa);
      break;
    case 'qtd-desc':
      resultado.sort((a, b) => b.qtd - a.qtd);
      break;
  }

  return resultado;
}

// Calcula taxas a partir dos índices e questões (para dimensões sem dados SPRMed)
export function calcularTaxas(
  indices: IndicesDimensao,
  questoes: Questao[]
): Record<string, { taxa: number }> {
  const taxas: Record<string, { taxa: number }> = {};

  for (const [nome, numeros] of Object.entries(indices)) {
    const qsFiltradas = questoes.filter(q => numeros.includes(q.numero));
    const totalAcertos = qsFiltradas.reduce((sum, q) => sum + q.acertos, 0);
    const totalRespostas = qsFiltradas.reduce((sum, q) => sum + q.total, 0);
    
    taxas[nome] = {
      taxa: totalRespostas > 0 ? (totalAcertos / totalRespostas) * 100 : 0
    };
  }

  return taxas;
}

// Filtra questões por área de formação (principal OU secundária)
export function filtrarPorAreaFormacao(
  questoes: Questao[],
  areaFormacao: string | null
): Questao[] {
  if (!areaFormacao) return questoes;
  
  return questoes.filter(q => 
    q.area_formacao_principal === areaFormacao || 
    (q.area_formacao_secundaria && q.area_formacao_secundaria.includes(areaFormacao))
  );
}

// Filtra questões por área de conhecimento
export function filtrarPorAreaConhecimento(
  questoes: Questao[],
  areaConhecimento: string | null
): Questao[] {
  if (!areaConhecimento) return questoes;
  return questoes.filter(q => q.area === areaConhecimento);
}

// Gera índices dinâmicos a partir de questões filtradas
export function gerarIndicesDinamicos(
  questoes: Questao[],
  campo: keyof Questao
): IndicesDimensao {
  const indices: IndicesDimensao = {};
  
  for (const q of questoes) {
    const valor = q[campo] as string;
    if (!valor) continue;
    
    if (!indices[valor]) {
      indices[valor] = [];
    }
    indices[valor].push(q.numero);
  }
  
  return indices;
}
