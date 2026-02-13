import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://enamed.sprmed.com.br';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard ENAMED 2025 | SPRMed Analytics',
    template: '%s | SPRMed Analytics',
  },
  description: 'Análise detalhada dos microdados ENAMED 2025 por faculdade. 13 dimensões pedagógicas, mapa de efetividade, relatórios por aluno. Dados oficiais INEP.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'SPRMed Analytics',
    title: 'Dashboard ENAMED 2025 | SPRMed Analytics',
    description: 'Análise detalhada dos microdados ENAMED 2025 por faculdade. 13 dimensões pedagógicas, mapa de efetividade, relatórios por aluno.',
    images: [{
      url: '/api/og?escola=Dashboard+ENAMED+2025',
      width: 1200,
      height: 630,
      alt: 'SPRMed Analytics - Dashboard ENAMED 2025',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard ENAMED 2025 | SPRMed Analytics',
    description: 'Análise detalhada dos microdados ENAMED 2025 por faculdade. 13 dimensões pedagógicas, mapa de efetividade.',
    images: ['/api/og?escola=Dashboard+ENAMED+2025'],
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/logo_sprmed.png',
    apple: '/logo_sprmed.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
