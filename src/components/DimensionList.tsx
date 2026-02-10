'use client';

interface DimensionListProps {
  data: Array<{
    nome: string;
    qtd: number;
    acertou: number;
    errou: number;
    taxa: number;
  }>;
  onItemClick?: (nome: string, numeros: number[]) => void;
  legendas?: Record<string, string>;
}

export function DimensionList({ data, onItemClick, legendas }: DimensionListProps) {
  const getColor = (taxa: number) => {
    if (taxa >= 70) return 'text-green-500';
    if (taxa >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {data.map((item) => (
        <div
          key={item.nome}
          className="bg-white/5 rounded-lg p-3 border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
          onClick={() => onItemClick?.(item.nome, [])}
        >
          <div className="text-xs text-white font-medium truncate" title={legendas?.[item.nome] || item.nome}>
            {item.nome}
          </div>
          <div className={`text-lg font-bold ${getColor(item.taxa)}`}>
            {item.taxa.toFixed(1)}%
          </div>
          <div className="flex gap-2 mt-1 text-xs">
            <span className="text-green-500">{item.acertou}</span>
            <span className="text-gray-500">/</span>
            <span className="text-red-500">{item.errou}</span>
          </div>
          {legendas?.[item.nome] && (
            <div className="text-xs text-gray-500 mt-1 truncate" title={legendas[item.nome]}>
              {legendas[item.nome]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
