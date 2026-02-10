'use client';

import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface EffectivenessMapProps {
  data: Array<{
    nome: string;
    qtd: number;
    taxa: number;
    score: number;
  }>;
  height?: number;
}

export function EffectivenessMap({ data, height = 280 }: EffectivenessMapProps) {
  // Calcula cor baseada no score (vermelho = alto, azul = baixo)
  const getColor = (score: number) => {
    const intensity = Math.min(1, score / 120);
    const r = Math.round(239 * intensity + 59 * (1 - intensity));
    const g = Math.round(68 * intensity + 130 * (1 - intensity));
    const b = Math.round(68 * intensity + 246 * (1 - intensity));
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis 
          dataKey="qtd" 
          type="number" 
          name="Quantidade" 
          tick={{ fill: '#888', fontSize: 9 }}
          label={{ value: 'Qtd', position: 'bottom', fill: '#666', fontSize: 10 }}
        />
        <YAxis 
          dataKey="taxa" 
          type="number" 
          name="Taxa" 
          domain={[0, 100]}
          tick={{ fill: '#888', fontSize: 9 }}
          label={{ value: 'Taxa %', angle: -90, position: 'left', fill: '#666', fontSize: 10 }}
        />
        <ZAxis dataKey="score" range={[50, 400]} />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{ 
            backgroundColor: '#1a2744', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            fontSize: '12px'
          }}
          formatter={(value, name) => {
            if (typeof value !== 'number') return ['', ''];
            if (name === 'Quantidade') return [value, 'Questões'];
            if (name === 'Taxa') return [`${value.toFixed(1)}%`, 'Taxa'];
            return [value.toFixed(1), 'Score'];
          }}
          labelFormatter={(label) => data.find(d => d.qtd === label)?.nome || ''}
        />
        <Scatter data={data}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
