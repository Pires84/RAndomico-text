import React, { useState } from 'react';
import { View, Collaborator } from './types';
import Sidebar from './components/Sidebar';
import HelpModal from './components/HelpModal';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Collaborators from './pages/Collaborators';
import Sorteios from './pages/Sorteios';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

// Mock Data with Gender instead of Photos
const MOCK_COLLABORATORS: Collaborator[] = [
  { id: '1', matricula: '4521', name: 'Carlos Mendes', gender: 'M', sector: 'Logística', status: 'Ativo', lastExam: '12/08/2023' },
  { id: '2', matricula: '3320', name: 'Juliana Paes', gender: 'F', sector: 'RH', status: 'Férias', lastExam: '05/09/2023' },
  { id: '3', matricula: '8912', name: 'Roberto Firmino', gender: 'M', sector: 'Produção', status: 'Pendente', lastExam: '10/01/2023' },
  { id: '4', matricula: '1290', name: 'Ana Souza', gender: 'F', sector: 'Qualidade', status: 'Ativo', lastExam: '22/10/2023' },
  { id: '5', matricula: '5678', name: 'Marcos Silva', gender: 'M', sector: 'TI', status: 'Afastado', lastExam: '15/05/2023' },
  { id: '6', matricula: '9988', name: 'Patricia Lima', gender: 'F', sector: 'Vendas', status: 'Ativo', lastExam: '01/11/2023' },
  { id: '7', matricula: '2231', name: 'Lucas Oliveira', gender: 'M', sector: 'Logística', status: 'Ativo', lastExam: '14/09/2023' },
  { id: '8', matricula: '7765', name: 'Fernanda Costa', gender: 'F', sector: 'Produção', status: 'Pendente', lastExam: '30/08/2023' },
  { id: '9', matricula: '1122', name: 'Ricardo Santos', gender: 'M', sector: 'Manutenção', status: 'Ativo', lastExam: '10/02/2023' },
  { id: '10', matricula: '3344', name: 'Camila Rocha', gender: 'F', sector: 'RH', status: 'Ativo', lastExam: '15/03/2023' },
  { id: '11', matricula: '5566', name: 'Paulo Dias', gender: 'M', sector: 'Produção', status: 'Ativo', lastExam: '20/04/2023' },
  { id: '12', matricula: '7788', name: 'Beatriz Melo', gender: 'F', sector: 'Vendas', status: 'Pendente', lastExam: '05/01/2023' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(MOCK_COLLABORATORS);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleLogin = () => {
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentView(View.LOGIN);
  };

  const handleUpdateStatus = (id: string, newStatus: Collaborator['status']) => {
    setCollaborators(prev => prev.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const handleAddCollaborators = (newCollabs: Collaborator[]) => {
    setCollaborators(prev => [...newCollabs, ...prev]);
  };

  if (currentView === View.LOGIN) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-offwhite overflow-hidden font-sans text-gray-900">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        onLogout={handleLogout}
        onOpenHelp={() => setIsHelpOpen(true)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden relative shadow-inner">
        {currentView === View.DASHBOARD && (
          <Dashboard 
            collaborators={collaborators} 
            onChangeView={setCurrentView}
          />
        )}
        {currentView === View.COLLABORATORS && (
          <Collaborators 
            collaborators={collaborators} 
            onUpdateStatus={handleUpdateStatus} 
            onAddCollaborators={handleAddCollaborators}
          />
        )}
        {currentView === View.SORTEIOS && (
          <Sorteios collaborators={collaborators} />
        )}
        {currentView === View.SETTINGS && (
           <Settings />
        )}
         {currentView === View.NOTIFICATIONS && (
           <Notifications />
        )}
      </main>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default App;