import React from 'react';
import { View } from '../types';
import { LayoutDashboard, Users, Settings, HelpCircle, LogOut, Hexagon, Component, Bell, User } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  onLogout: () => void;
  onOpenHelp: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onLogout, onOpenHelp }) => {
  const navItemClass = (view: View) => 
    `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer ${
      currentView === view 
        ? 'bg-white/10 text-white font-semibold' 
        : 'hover:bg-white/5 text-white/80 hover:text-white font-medium'
    }`;

  return (
    <aside className="w-72 bg-wine text-white flex flex-col flex-shrink-0 shadow-xl z-20 transition-all duration-300">
      {/* Logo Area */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <Hexagon className="text-white w-8 h-8" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-wide leading-tight">Ibéria</h1>
            <span className="text-xs text-white/70 font-medium tracking-widest uppercase">ToxManager</span>
          </div>
        </div>
        <div className="h-px bg-white/20 w-full mt-6"></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        <div onClick={() => onChangeView(View.DASHBOARD)} className={navItemClass(View.DASHBOARD)}>
          <LayoutDashboard className="group-hover:scale-110 transition-transform w-6 h-6" />
          <span>Dashboard</span>
        </div>
        <div onClick={() => onChangeView(View.COLLABORATORS)} className={navItemClass(View.COLLABORATORS)}>
          <Users className="group-hover:scale-110 transition-transform w-6 h-6" />
          <span>Colaboradores</span>
        </div>
        <div onClick={() => onChangeView(View.SORTEIOS)} className={navItemClass(View.SORTEIOS)}>
          <Component className="group-hover:scale-110 transition-transform w-6 h-6" />
          <span>Sorteios</span>
        </div>
        <div onClick={() => onChangeView(View.NOTIFICATIONS)} className={navItemClass(View.NOTIFICATIONS)}>
            <Bell className="group-hover:scale-110 transition-transform w-6 h-6" />
            <span>Notificações</span>
        </div>
        
        <div className="my-2 border-t border-white/10 mx-4"></div>
        
        <div onClick={() => onChangeView(View.SETTINGS)} className={navItemClass(View.SETTINGS)}>
          <Settings className="group-hover:scale-110 transition-transform w-6 h-6" />
          <span>Configurações</span>
        </div>
        <div onClick={onOpenHelp} className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 hover:text-white font-medium transition-all cursor-pointer">
          <HelpCircle className="group-hover:scale-110 transition-transform w-6 h-6" />
          <span>Ajuda</span>
        </div>
      </nav>

      {/* User Profile Snippet */}
      <div className="p-6">
        <div className="flex items-center justify-between p-3 rounded-xl bg-wine-dark/50 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 border-2 border-orange-brand">
                <User size={20} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate">Dra. Ana Silva</span>
              <span className="text-xs text-white/60 truncate">Administradora</span>
            </div>
          </div>
          <button onClick={onLogout} className="text-white/70 hover:text-white">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;