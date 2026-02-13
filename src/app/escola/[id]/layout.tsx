import type { Metadata } from 'next';
import { ESCOLAS } from '@/lib/report/constants';

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const escola = ESCOLAS[id];

  if (!escola) {
    return { title: 'Escola não encontrada' };
  }

  const title = `${escola.nome} - ENAMED 2025`;
  const description = `Análise ENAMED 2025 de ${escola.nome} (${escola.cidade}/${escola.uf}). ${escola.alunos} alunos, nota média ${escola.nota}, proficiência ${escola.proficiencia > 0 ? '+' : ''}${escola.proficiencia}. 13 dimensões pedagógicas analisadas.`;

  const ogParams = new URLSearchParams({
    escola: escola.nome,
    nota: String(escola.nota),
    alunos: String(escola.alunos),
    cidade: `${escola.cidade}/${escola.uf}`,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: `/api/og?${ogParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `${escola.nome} - Dashboard ENAMED 2025`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?${ogParams.toString()}`],
    },
  };
}

export default function EscolaLayout({ children }: Props) {
  return <>{children}</>;
}
