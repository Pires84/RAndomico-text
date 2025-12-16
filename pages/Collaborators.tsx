import React, { useState, useRef } from 'react';
import { Upload, Plus, Search, CheckCircle, Edit, X, Filter, FileSpreadsheet, Download, User } from 'lucide-react';
import { Collaborator } from '../types';

interface CollaboratorsProps {
  collaborators: Collaborator[];
  onUpdateStatus: (id: string, newStatus: Collaborator['status']) => void;
  onAddCollaborators: (newCollabs: Collaborator[]) => void;
}

const Collaborators: React.FC<CollaboratorsProps> = ({ collaborators, onUpdateStatus, onAddCollaborators }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollab, setSelectedCollab] = useState<Collaborator | null>(null);
  const [newStatus, setNewStatus] = useState<Collaborator['status']>('Ativo');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredCollaborators = collaborators.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.matricula.includes(searchTerm) ||
    c.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (collab: Collaborator) => {
    setSelectedCollab(collab);
    setNewStatus(collab.status);
  };

  const handleSave = () => {
    if (selectedCollab) {
      onUpdateStatus(selectedCollab.id, newStatus);
      setSelectedCollab(null);
    }
  };

  const handleExport = () => {
    // Simulation of CSV download
    const headers = "ID,Nome,Matricula,Setor,Status,UltimoExame\n";
    const rows = collaborators.map(c => `${c.id},${c.name},${c.matricula},${c.sector},${c.status},${c.lastExam}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "colaboradores_iberia.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate parsing Excel/CSV
      // In a real app, use 'xlsx' library here
      alert(`Arquivo "${file.name}" processado com sucesso! Adicionando dados simulados.`);
      
      const importedMock: Collaborator[] = [
        { id: Math.random().toString(), matricula: '9901', name: 'Novo Importado 1', gender: 'M', sector: 'Operacional', status: 'Ativo', lastExam: 'PENDENTE' },
        { id: Math.random().toString(), matricula: '9902', name: 'Nova Importada 2', gender: 'F', sector: 'RH', status: 'Ativo', lastExam: 'PENDENTE' },
      ];
      
      onAddCollaborators(importedMock);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleManualAdd = () => {
    // Adds a mock user and opens edit modal to simulate "New Registration" flow
    const newId = Math.random().toString();
    const newCollab: Collaborator = {
        id: newId,
        matricula: String(Math.floor(Math.random() * 9000) + 1000),
        name: "Novo Colaborador",
        gender: Math.random() > 0.5 ? 'M' : 'F',
        sector: "A Definir",
        status: "Pendente",
        lastExam: "Aguardando"
    };
    onAddCollaborators([newCollab]);
    
    // Optional: Open edit immediately
    setSelectedCollab(newCollab);
    setNewStatus('Pendente');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-offwhite/50">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        hidden 
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex flex-col gap-6 shadow-sm z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-wine-dark tracking-tight">Gestão de Colaboradores</h1>
            <p className="text-gray-500 mt-1">Gerencie os funcionários e acompanhe os exames periódicos.</p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={handleExport}
               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
             >
               <Download size={18} />
               <span>Exportar CSV</span>
             </button>
             <button 
               onClick={handleImportClick}
               className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-colors shadow-md shadow-green-600/20"
             >
               <FileSpreadsheet size={18} />
               <span>Importar Excel</span>
             </button>
             <button 
               className="flex items-center gap-2 px-4 py-2 bg-wine text-white rounded-lg font-bold text-sm hover:bg-wine-dark transition-colors shadow-md shadow-wine/20"
               onClick={handleManualAdd}
             >
               <Plus size={18} />
               <span>Novo Cadastro</span>
             </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Pesquisar por nome, matrícula ou setor..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-wine hover:border-wine transition-colors shadow-sm" onClick={() => alert("Filtros avançados em breve.")}>
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCollaborators.map(collab => (
            <div key={collab.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col gap-4">
              <div className="flex items-start justify-between">
                {/* Gender based Avatar */}
                <div className={`h-16 w-16 rounded-full flex items-center justify-center border-2 border-white shadow-md ${
                  collab.gender === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                }`}>
                   <User size={32} />
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                   collab.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                   collab.status === 'Férias' ? 'bg-blue-100 text-blue-700' :
                   collab.status === 'Pendente' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-700'
                }`}>
                  {collab.status}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{collab.name}</h3>
                <p className="text-sm text-gray-500">{collab.sector}</p>
                <p className="text-xs text-gray-400 mt-1 font-mono">MAT: {collab.matricula}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-400 font-bold">Último Exame</span>
                  <span className="text-sm font-medium text-gray-700">{collab.lastExam}</span>
                </div>
                <button 
                  onClick={() => handleEditClick(collab)}
                  className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-wine hover:text-white transition-colors"
                  title="Editar Status"
                >
                  <Edit size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCollab(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="bg-wine p-6 text-white flex justify-between items-start">
               <div>
                 <h3 className="text-xl font-bold">{selectedCollab.name === "Novo Colaborador" ? "Novo Cadastro" : "Editar Status"}</h3>
                 <p className="text-white/80 text-sm mt-1">{selectedCollab.name}</p>
               </div>
               <button onClick={() => setSelectedCollab(null)} className="text-white/70 hover:text-white transition-colors">
                 <X size={24} />
               </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-center -mt-12 mb-2">
                 <div className={`h-24 w-24 rounded-full border-4 border-white shadow-md flex items-center justify-center ${
                   selectedCollab.gender === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                 }`}>
                   <User size={48} />
                 </div>
              </div>

              <div className="space-y-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-gray-700">Status Atual</span>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Collaborator['status'])}
                    className="w-full rounded-lg border-gray-300 border bg-white px-4 py-3 focus:ring-2 focus:ring-wine focus:border-transparent outline-none transition-all cursor-pointer"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Férias">Férias</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Afastado">Afastado</option>
                  </select>
                </label>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex gap-3">
                    <div className="text-orange-500 mt-0.5"><CheckCircle size={16} /></div>
                    <p className="text-xs text-orange-800 leading-relaxed">
                      Alterar o status pode afetar o agendamento automático de exames periódicos. Certifique-se que a informação está correta no RH.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button 
                  onClick={() => setSelectedCollab(null)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-wine text-white font-bold hover:bg-wine-dark shadow-lg shadow-wine/20 transition-all active:scale-[0.98]"
                >
                  {selectedCollab.name === "Novo Colaborador" ? "Criar Colaborador" : "Salvar Alterações"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborators;