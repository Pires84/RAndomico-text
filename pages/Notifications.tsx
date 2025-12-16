import React, { useState } from 'react';
import { Bell, Check, Trash2, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Prazo de Exame Expirando',
    description: 'O colaborador Carlos Mendes (Mat: 4521) tem exames vencendo em 5 dias.',
    time: '2 horas atrás',
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Sorteio Mensal Realizado',
    description: 'O sorteio de exames toxicológicos de Outubro foi processado com sucesso. 5 colaboradores selecionados.',
    time: '1 dia atrás',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Backup do Sistema',
    description: 'O backup automático dos dados foi concluído sem erros.',
    time: '2 dias atrás',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Atualização de Política',
    description: 'A nova política de segurança do trabalho foi publicada na intranet.',
    time: '3 dias atrás',
    read: true,
  },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex-1 overflow-y-auto p-8 pt-2 scrollbar-hide bg-offwhite/50">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
             <div className="relative">
                <div className="p-3 bg-white rounded-xl text-wine border border-gray-200 shadow-sm">
                   <Bell size={24} />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-orange-brand text-white text-xs font-bold rounded-full border-2 border-offwhite">
                    {unreadCount}
                  </span>
                )}
             </div>
             <div>
                <h1 className="text-3xl font-black text-wine-dark tracking-tight">Notificações</h1>
                <p className="text-gray-500 text-sm font-medium">Acompanhe alertas e atividades do sistema.</p>
             </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-wine hover:border-wine transition-colors text-sm font-bold shadow-sm"
            >
              <Check size={16} /> Marcar todas como lidas
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
               <Bell size={48} className="mb-4 opacity-20" />
               <p>Nenhuma notificação encontrada.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`relative flex flex-col md:flex-row gap-4 p-5 rounded-xl border transition-all ${
                  notif.read 
                    ? 'bg-white border-gray-100 opacity-80 hover:opacity-100' 
                    : 'bg-white border-l-4 border-l-orange-brand border-y-gray-100 border-r-gray-100 shadow-sm'
                }`}
              >
                {/* Icon Area */}
                <div className="flex-shrink-0">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    notif.type === 'warning' ? 'bg-orange-50 text-orange-500' :
                    notif.type === 'success' ? 'bg-green-50 text-green-600' :
                    'bg-blue-50 text-blue-500'
                  }`}>
                    {notif.type === 'warning' && <AlertTriangle size={20} />}
                    {notif.type === 'success' && <CheckCircle size={20} />}
                    {notif.type === 'info' && <Info size={20} />}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                   <div className="flex justify-between items-start">
                      <h3 className={`text-lg font-bold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs font-medium text-gray-400 flex items-center gap-1 whitespace-nowrap ml-2">
                        <Clock size={12} /> {notif.time}
                      </span>
                   </div>
                   <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                     {notif.description}
                   </p>
                </div>

                {/* Action Area */}
                <div className="flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4 mt-2 md:mt-0 gap-2">
                   {!notif.read && (
                     <button 
                       onClick={() => {
                         const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
                         setNotifications(updated);
                       }}
                       className="p-2 text-wine hover:bg-wine/10 rounded-lg transition-colors" 
                       title="Marcar como lida"
                     >
                       <Check size={18} />
                     </button>
                   )}
                   <button 
                     onClick={() => deleteNotification(notif.id)}
                     className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                     title="Remover"
                   >
                     <Trash2 size={18} />
                   </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;