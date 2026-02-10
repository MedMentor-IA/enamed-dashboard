'use client';

interface CardProps {
  label: string;
  value: string | number;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
  stats?: { ok: number; gap: number };
}

export function Card({ label, value, description, variant = 'default', onClick, stats }: CardProps) {
  const valueColors = {
    default: 'text-white',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500'
  };

  return (
    <div 
      className={`bg-white/5 rounded-xl p-4 border border-white/10 ${onClick ? 'cursor-pointer hover:bg-white/10 transition-all' : ''}`}
      onClick={onClick}
    >
      <div className="text-xs text-gray-400 uppercase">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${valueColors[variant]}`}>{value}</div>
      {description && <div className="text-xs text-gray-500 mt-1">{description}</div>}
      {stats && (
        <div className="flex gap-2 mt-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-500">{stats.ok} ok</span>
          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-500">{stats.gap} gap</span>
        </div>
      )}
    </div>
  );
}
