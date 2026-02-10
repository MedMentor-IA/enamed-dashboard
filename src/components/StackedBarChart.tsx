'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StackedBarChartProps {
  data: Array<{
    nome: string;
    acertou: number;
    errou: number;
    taxa: number;
  }>;
  height?: number;
}

export function StackedBarChart({ data, height = 300 }: StackedBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <XAxis type="number" tick={{ fill: '#888', fontSize: 10 }} />
        <YAxis 
          dataKey="nome" 
          type="category" 
          tick={{ fill: '#888', fontSize: 11 }} 
          width={75}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a2744', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px'
          }}
          labelStyle={{ color: '#fff' }}
          formatter={(value, name) => {
            if (typeof value !== 'number') return ['', ''];
            return [value, name === 'acertou' ? 'Maioria acertou' : 'Maioria errou'];
          }}
        />
        <Bar dataKey="acertou" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
        <Bar dataKey="errou" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
