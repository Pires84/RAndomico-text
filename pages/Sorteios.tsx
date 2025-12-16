import React, { useState } from 'react';
import { Shuffle, RefreshCw, Calendar, CheckSquare, Users, User } from 'lucide-react';
import { Collaborator } from '../types';

interface SorteiosProps {
  collaborators: Collaborator[];
}

const Sorteios: React.FC<SorteiosProps> = ({ collaborators }) => {
  const [selectedEmployees, setSelectedEmployees] = useState<Collaborator[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quantity, setQuantity] = useState(3);

  const handleGenerate = () => {
    setIsGenerating(true);
    setSelectedEmployees([]);
    
    // Simulate complex calculation delay
    setTimeout(() => {
      const eligible = collaborators.filter(c => c.status === 'Ativo');
      const shuffled = [...eligible].sort(() => 0.5 - Math.random());
      setSelectedEmployees(shuffled.slice(0, quantity));
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 pt-2 scrollbar-hide">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-wine rounded-xl text-white shadow-lg shadow-wine/20">
                <Shuffle size={24} />
             </div>
             <h1 className="text-3xl font-black text-wine-dark tracking-tight">Sorteio Aleatório</h1>
          </div>
          <p className="text-gray-500 max-w-2xl text-lg">
            Geração de listas randômicas para exames toxicológicos periódicos baseados na portaria vigente.
          </p>
        </div>

        {/* Configuration Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 w-full space-y-4">
             <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Quantidade de Colaboradores</label>
             <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-wine"
                />
                <span className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg font-bold text-xl text-wine border border-gray-200">
                  {quantity}
                </span>
             </div>
             <p className="text-xs text-gray-400 flex items-center gap-1">
                <Users size={14} /> Total elegível: {collaborators.filter(c => c.status === 'Ativo').length} colaboradores ativos
             </p>
          </div>

          <div className="h-16 w-px bg-gray-100 hidden md:block"></div>

          <div className="w-full md:w-auto">
             <button 
               onClick={handleGenerate}
               disabled={isGenerating}
               className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
                 isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-brand hover:bg-orange-dark shadow-orange-brand/30 hover:shadow-xl hover:-translate-y-1'
               }`}
             >
                <RefreshCw size={24} className={isGenerating ? 'animate-spin' : ''} />
                {isGenerating ? 'Processando...' : 'Realizar Sorteio'}
             </button>
          </div>
        </div>

        {/* Results Section */}
        {selectedEmployees.length > 0 && (
           <div className="space-y-4 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Colaboradores Selecionados</h3>
                <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                   <Calendar size={16} /> {new Date().toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                 {selectedEmployees.map((collab, index) => (
                    <div key={collab.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-wine/30 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-wine/10 text-wine flex items-center justify-center font-bold text-sm">
                             {index + 1}
                          </div>
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center border border-gray-100 ${
                             collab.gender === 'M' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'
                          }`}>
                            <User size={20} />
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-900">{collab.name}</h4>
                             <p className="text-xs text-gray-500">{collab.sector} • Matrícula: {collab.matricula}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-2">
                          <button 
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                            title="Confirmar Agendamento"
                            onClick={() => alert(`Agendamento confirmado para ${collab.name}`)}
                          >
                             <CheckSquare size={20} />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="flex justify-end pt-4">
                 <button 
                  className="text-wine font-bold text-sm hover:underline"
                  onClick={() => alert("Imprimindo relatório...")}
                 >
                   Imprimir Relatório Oficial
                 </button>
              </div>
           </div>
        )}

        {selectedEmployees.length === 0 && !isGenerating && (
           <div className="flex flex-col items-center justify-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <Shuffle size={48} className="mb-4 opacity-50" />
              <p className="font-medium">Nenhum sorteio realizado hoje.</p>
              <p className="text-sm">Configure a quantidade e clique em "Realizar Sorteio".</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Sorteios;