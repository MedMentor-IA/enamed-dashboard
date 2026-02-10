'use client';

import { StackedBarChart } from './StackedBarChart';
import { EffectivenessMap } from './EffectivenessMap';
import { DimensionList } from './DimensionList';

interface SectionProps {
  title: string;
  description?: string;
  data: Array<{
    nome: string;
    qtd: number;
    acertou: number;
    errou: number;
    taxa: number;
    score: number;
  }>;
  onItemClick?: (nome: string, numeros: number[]) => void;
  legendas?: Record<string, string>;
}

export function Section({ title, description, data, onItemClick, legendas }: SectionProps) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
      {description && (
        <p className="text-xs text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: description }} />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Linha 1: Gráficos */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-xs text-gray-400 mb-3">Distribuição</div>
          <StackedBarChart 
            data={data.map(d => ({
              nome: d.nome,
              acertou: d.acertou,
              errou: d.errou,
              taxa: d.taxa
            }))}
            height={Math.max(150, data.length * 40)}
          />
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-xs text-gray-400 mb-3">Mapa de Efetividade</div>
          <EffectivenessMap 
            data={data.map(d => ({
              nome: d.nome,
              qtd: d.qtd,
              taxa: d.taxa,
              score: d.score
            }))}
          />
        </div>
      </div>
      
      {/* Linha 2: Lista */}
      <div className="mt-4">
        <DimensionList 
          data={data} 
          onItemClick={onItemClick}
          legendas={legendas}
        />
      </div>
    </div>
  );
}
