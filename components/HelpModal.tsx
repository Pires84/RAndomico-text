import React from 'react';
import { X, BookOpen, Edit, Eye, PieChart } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-offwhite rounded-xl shadow-2xl overflow-hidden border-t-[6px] border-wine animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-wine/10 rounded-lg text-wine">
              <BookOpen size={28} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-wine mb-1">Help & Documentation</p>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Manual de Uso: Dashboard Geral</h1>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-wine transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="max-w-[800px] mx-auto space-y-8">
            <p className="text-base text-gray-600">
              Bem-vindo ao guia do Ibéria ToxManager. Use a tabela de referência abaixo para entender os elementos visuais e indicadores.
            </p>

            {/* Help Table */}
            <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">Elemento Visual</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-2/3">Explicação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Row 1: KPIs */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-6 align-top">
                      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-1 h-32 flex flex-col items-center justify-center text-gray-400 gap-2">
                         <PieChart size={32} />
                         <span className="text-xs font-mono">Gráfico KPI</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 align-top">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-wine">KPIs de Progresso</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Estes widgets monitoram a <span className="font-semibold text-gray-900">% de exames concluídos</span> versus a meta corporativa. Indicadores vermelhos exigem atenção imediata.
                        </p>
                      </div>
                    </td>
                  </tr>
                   {/* Row 2: Status */}
                   <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-6 align-top">
                      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm h-32 flex flex-col items-center justify-center gap-2">
                         <div className="flex items-center gap-3 w-full justify-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <Eye size={18} />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center text-wine cursor-pointer hover:bg-wine hover:text-white transition-colors">
                                <Edit size={18} />
                            </div>
                         </div>
                         <span className="text-[10px] text-gray-400 font-mono mt-2">Botões de Ação</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 align-top">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-wine">Status dos Colaboradores</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Use o ícone <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-wine/10 text-wine align-middle"><Edit size={12} /></span> para definir status de Férias ou Afastamento manualmente.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Tópico 1 de 4</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-wine"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              </div>
           </div>
           <button onClick={onClose} className="px-6 py-2 rounded-lg bg-wine text-white text-sm font-bold hover:bg-wine-dark transition-colors">
              Fechar
           </button>
        </div>

      </div>
    </div>
  );
};

export default HelpModal;