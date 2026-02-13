import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const escola = searchParams.get('escola') || 'Dashboard ENAMED 2025';
  const nota = searchParams.get('nota') || '';
  const alunos = searchParams.get('alunos') || '';
  const cidade = searchParams.get('cidade') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a1628 0%, #0f2847 40%, #1a3a5c 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid decorativo */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            opacity: 0.05,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Barra superior colorida */}
        <div
          style={{
            width: '100%',
            height: '6px',
            display: 'flex',
            background: 'linear-gradient(90deg, #00d4aa, #00b4d8, #7c3aed)',
          }}
        />

        {/* Conteúdo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '48px 64px',
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00d4aa, #00b4d8)',
                  fontSize: '22px',
                }}
              >
                📊
              </div>
              <span
                style={{
                  color: '#94a3b8',
                  fontSize: '22px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase' as const,
                }}
              >
                SPRMed Analytics
              </span>
            </div>

            {/* Nome da escola */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '16px',
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  fontSize: escola.length > 30 ? '46px' : '56px',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {escola}
              </span>
              {cidade && (
                <span
                  style={{
                    color: '#64748b',
                    fontSize: '24px',
                    marginTop: '8px',
                  }}
                >
                  {cidade}
                </span>
              )}
            </div>
          </div>

          {/* Métricas */}
          <div style={{ display: 'flex', gap: '40px', marginBottom: '8px' }}>
            {nota && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
                  Nota Média
                </span>
                <span style={{ color: '#00d4aa', fontSize: '52px', fontWeight: 800, lineHeight: 1 }}>
                  {nota}
                </span>
              </div>
            )}
            {alunos && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
                  Alunos
                </span>
                <span style={{ color: '#00b4d8', fontSize: '52px', fontWeight: 800, lineHeight: 1 }}>
                  {alunos}
                </span>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
                Dimensões
              </span>
              <span style={{ color: '#7c3aed', fontSize: '52px', fontWeight: 800, lineHeight: 1 }}>
                13
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(148, 163, 184, 0.15)',
              paddingTop: '20px',
            }}
          >
            <span style={{ color: '#475569', fontSize: '18px' }}>
              Relatório Filtro SPRMed  |  Microdados ENAMED 2025 - INEP
            </span>
            <span style={{ color: '#334155', fontSize: '16px' }}>
              enamed.sprmed.com.br
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
