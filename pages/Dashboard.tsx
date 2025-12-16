import React, { useState } from 'react';
import { BadgeCheck, Target, TrendingUp, TrendingDown, Search, Filter, Plus, Eye, Edit, User, ArrowUpDown } from 'lucide-react';
import { Collaborator, View } from '../types';

interface DashboardProps {
  collaborators: Collaborator[];
  onChangeView?: (view: View) => void;
}

const ITEMS_PER_PAGE = 5;

const Dashboard: React.FC<DashboardProps> = ({ collaborators, onChangeView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filtered = collaborators
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
        return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name) 
            : b.name.localeCompare(a.name);
    });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleSort = () => {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 pt-2 scrollbar-hide">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between group h-40">
            <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-wine font-medium text-sm uppercase tracking-wide">Colaboradores Ativos</p>
                <h3 className="text-4xl font-bold text-wine mt-2">{collaborators.filter(c => c.status === 'Ativo').length}</h3>
              </div>
              <div className="bg-wine/10 p-2 rounded-lg text-wine">
                <BadgeCheck size={24} />
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-2 mt-4">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={14} /> +2.5%
              </span>
              <span className="text-xs text-gray-400">vs. mês anterior</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between group h-40">
            <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-wine font-medium text-sm uppercase tracking-wide">Exames Realizados</p>
                <h3 className="text-4xl font-bold text-orange-brand mt-2">85%</h3>
              </div>
              <div className="bg-orange-brand/10 p-2 rounded-lg text-orange-brand">
                <BadgeCheck size={24} />
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-2 mt-4">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={14} /> +5.0%
              </span>
              <span className="text-xs text-gray-400">vs. mês anterior</span>
            </div>
          </div>

          {/* Card 3 (Orange) */}
          <div className="relative overflow-hidden rounded-2xl bg-orange-brand p-6 shadow-lg shadow-orange-brand/20 flex flex-col justify-between group h-40">
            <div className="absolute -right-4 -top-4 bg-white/10 h-32 w-32 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-white/90 font-medium text-sm uppercase tracking-wide">Meta Restante</p>
                <h3 className="text-4xl font-bold text-white mt-2">15%</h3>
              </div>
              <div className="bg-white/20 p-2 rounded-lg text-white">
                <Target size={24} />
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-2 mt-4">
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingDown size={14} /> -3.2%
              </span>
              <span className="text-xs text-white/70">para o prazo</span>
            </div>
          </div>
        </section>

        {/* Main Table Section */}
        <section className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-6 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <h3 className="text-lg font-bold text-wine">Colaboradores Recentes</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine w-64 text-gray-700" 
                  placeholder="Buscar por nome..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button 
                onClick={toggleSort}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${sortOrder === 'desc' ? 'bg-wine/10 text-wine border-wine/20' : 'bg-offwhite text-gray-600 border-gray-200 hover:bg-gray-200'}`}
              >
                {sortOrder === 'asc' ? <Filter size={18} /> : <ArrowUpDown size={18} />}
                <span>{sortOrder === 'asc' ? 'Filtrar (A-Z)' : 'Filtrar (Z-A)'}</span>
              </button>
              <button 
                onClick={() => onChangeView && onChangeView(View.COLLABORATORS)}
                className="flex items-center gap-2 px-4 py-2 bg-wine text-white rounded-full text-sm font-semibold shadow-md shadow-wine/20 hover:bg-wine-dark transition-colors"
              >
                <Plus size={18} />
                <span>Novo Colaborador</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Matrícula</th>
                  <th className="px-6 py-4">Nome</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Último Exame</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((colab, idx) => (
                  <tr key={colab.id} className={`group transition-colors ${idx % 2 === 0 ? 'hover:bg-gray-50' : 'bg-gray-50/30 hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">#{colab.matricula}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center border border-gray-100 ${
                           colab.gender === 'M' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'
                        }`}>
                          <User size={16} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{colab.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        colab.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                        colab.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                        colab.status === 'Férias' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {colab.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{colab.lastExam}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="h-8 w-8 flex items-center justify-center rounded-full text-wine hover:bg-wine/10 transition-colors" 
                          title="Visualizar Detalhes"
                          onClick={() => onChangeView && onChangeView(View.COLLABORATORS)}
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="h-8 w-8 flex items-center justify-center rounded-full text-wine hover:bg-wine/10 transition-colors" 
                          title="Editar"
                          onClick={() => onChangeView && onChangeView(View.COLLABORATORS)}
                        >
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Mostrando {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)} a {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de {filtered.length} resultados
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors disabled:opacity-50"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
                 <button
                   key={i}
                   onClick={() => setCurrentPage(i + 1)}
                   className={`h-9 w-9 flex items-center justify-center rounded-full text-sm font-bold shadow-sm transition-colors ${
                     currentPage === i + 1 ? 'bg-wine text-white shadow-wine/20' : 'text-gray-700 hover:bg-gray-100'
                   }`}
                 >
                   {i + 1}
                 </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;