'use client';

import { Questao } from '@/types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  questoes: Questao[];
}

export function Modal({ isOpen, onClose, title, questoes }: ModalProps) {
  if (!isOpen) return null;

  const totalAcertos = questoes.reduce((sum, q) => sum + q.acertos, 0);
  const totalRespostas = questoes.reduce((sum, q) => sum + q.total, 0);
  const taxaMedia = totalRespostas > 0 ? (totalAcertos / totalRespostas) * 100 : 0;

  const getColor = (taxa: number) => {
    if (taxa >= 70) return 'border-green-500';
    if (taxa >= 50) return 'border-yellow-500';
    return 'border-red-500';
  };

  const getTaxaColor = (taxa: number) => {
    if (taxa >= 70) return 'text-green-500';
    if (taxa >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div 
      className="fixed inset-0 bg-black/85 z-50 flex justify-center items-start p-10 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a2744] rounded-xl p-6 max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/10">
          <h2 className="text-xl text-white font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Summary */}
        <div className="bg-blue-500/10 rounded-lg p-4 mb-5 flex gap-10">
          <div className="text-center">
            <div className="text-xs text-gray-400">Questões</div>
            <div className="text-2xl font-bold text-white">{questoes.length}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">Taxa Média</div>
            <div className={`text-2xl font-bold ${getTaxaColor(taxaMedia)}`}>
              {taxaMedia.toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">Acertos</div>
            <div className="text-2xl font-bold text-white">{totalAcertos}</div>
          </div>
        </div>

        {/* Questões */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {questoes.map((q) => (
            <div 
              key={q.numero}
              className={`bg-white/5 rounded-lg p-4 border-l-4 ${getColor(q.taxa_acerto)}`}
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-white">Questão {q.numero}</span>
                <span className={`font-bold ${getTaxaColor(q.taxa_acerto)}`}>
                  {q.taxa_acerto.toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">{q.enunciado}</p>
              <div className="flex flex-wrap gap-2">
                {q.area && <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">{q.area}</span>}
                {q.bloom && <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">{q.bloom}</span>}
                {q.ciclo_formativo && <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">{q.ciclo_formativo}</span>}
              </div>
              <div className="flex gap-4 mt-3 pt-3 border-t border-white/10 text-xs text-gray-500">
                <span>Acertos: {q.acertos}</span>
                <span>Erros: {q.erros}</span>
                <span>Gabarito: {q.gabarito}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
