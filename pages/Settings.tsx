import React, { useState } from 'react';
import { User, Bell, Shield, Sliders, Save, Moon, Globe, Mail, Check } from 'lucide-react';

type Tab = 'general' | 'notifications' | 'security';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [isDark, setIsDark] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const tabClass = (tab: Tab) => `
    flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-colors cursor-pointer
    ${activeTab === tab ? 'border-wine text-wine' : 'border-transparent text-gray-400 hover:text-gray-600'}
  `;

  return (
    <div className="flex-1 overflow-y-auto p-8 pt-2 scrollbar-hide bg-offwhite/50">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mt-6">
           <div className="p-3 bg-wine rounded-xl text-white shadow-lg shadow-wine/20">
              <Sliders size={24} />
           </div>
           <div>
              <h1 className="text-3xl font-black text-wine-dark tracking-tight">Configurações</h1>
              <p className="text-gray-500 text-sm font-medium">Gerencie suas preferências e configurações do sistema.</p>
           </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">
           
           {/* Tabs */}
           <div className="flex border-b border-gray-100 px-6 pt-2 bg-gray-50/50">
              <button onClick={() => setActiveTab('general')} className={tabClass('general')}>
                <User size={18} /> Perfil e Geral
              </button>
              <button onClick={() => setActiveTab('notifications')} className={tabClass('notifications')}>
                <Bell size={18} /> Notificações
              </button>
              <button onClick={() => setActiveTab('security')} className={tabClass('security')}>
                <Shield size={18} /> Segurança
              </button>
           </div>

           {/* Content */}
           <div className="p-8 flex-1">
              
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-8 animate-fade-in-up">
                   
                   {/* Avatar Section */}
                   <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-pink-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-pink-500">
                           <User size={48} />
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-wine text-white rounded-full border-2 border-white hover:bg-wine-dark transition-colors">
                           <User size={14} />
                        </button>
                      </div>
                      <div>
                         <h3 className="text-xl font-bold text-gray-900">Dra. Ana Silva</h3>
                         <p className="text-gray-500 text-sm">Administrador do Sistema</p>
                         <button className="text-orange-brand text-xs font-bold hover:underline mt-1">Alterar Ícone</button>
                      </div>
                   </div>

                   {/* Form Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="space-y-1.5">
                         <span className="text-sm font-bold text-gray-700">Nome Completo</span>
                         <input type="text" defaultValue="Ana Silva" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-wine focus:ring-1 focus:ring-wine outline-none transition-all" />
                      </label>
                      <label className="space-y-1.5">
                         <span className="text-sm font-bold text-gray-700">Email Corporativo</span>
                         <input type="email" defaultValue="ana.silva@iberia.com.br" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-wine focus:ring-1 focus:ring-wine outline-none transition-all" />
                      </label>
                      <label className="space-y-1.5">
                         <span className="text-sm font-bold text-gray-700">Departamento</span>
                         <input type="text" defaultValue="Saúde Ocupacional" disabled className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" />
                      </label>
                   </div>

                   {/* Preferences */}
                   <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Preferências do Sistema</h4>
                      <div className="space-y-4">
                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                               <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600"><Moon size={20} /></div>
                               <div>
                                  <p className="font-bold text-gray-800">Modo Escuro</p>
                                  <p className="text-xs text-gray-500">Ajustar aparência para ambientes com pouca luz.</p>
                               </div>
                            </div>
                            <button 
                              onClick={() => setIsDark(!isDark)}
                              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${isDark ? 'bg-wine' : 'bg-gray-300'}`}
                            >
                               <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                               <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600"><Globe size={20} /></div>
                               <div>
                                  <p className="font-bold text-gray-800">Idioma</p>
                                  <p className="text-xs text-gray-500">Português (Brasil)</p>
                               </div>
                            </div>
                            <span className="text-sm font-bold text-wine cursor-pointer hover:underline">Alterar</span>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                 <div className="space-y-8 animate-fade-in-up">
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 mb-2">Canais de Comunicação</h3>
                       <p className="text-gray-500 text-sm">Escolha como você deseja receber os alertas do ToxManager.</p>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-wine/30 transition-colors cursor-pointer" onClick={() => setEmailAlerts(!emailAlerts)}>
                          <div className={`mt-1 p-0.5 rounded border ${emailAlerts ? 'bg-wine border-wine text-white' : 'bg-white border-gray-300'}`}>
                             <Check size={14} className={emailAlerts ? 'opacity-100' : 'opacity-0'} />
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                                <Mail size={16} className="text-gray-400" />
                                <span className="font-bold text-gray-800">Alertas por Email</span>
                             </div>
                             <p className="text-sm text-gray-500">Receba resumos semanais e alertas críticos diretamente no seu email corporativo.</p>
                          </div>
                       </div>

                       <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl opacity-60">
                          <div className="mt-1 p-0.5 rounded border bg-gray-100 border-gray-300"></div>
                          <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                                <Bell size={16} className="text-gray-400" />
                                <span className="font-bold text-gray-800">Push Notifications (Mobile)</span>
                             </div>
                             <p className="text-sm text-gray-500">Indisponível na versão web desktop.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                 <div className="space-y-6 animate-fade-in-up">
                     <div>
                       <h3 className="text-xl font-bold text-gray-900 mb-2">Segurança da Conta</h3>
                       <p className="text-gray-500 text-sm">Gerencie sua senha e métodos de autenticação.</p>
                    </div>
                    
                    <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                       <div className="flex gap-3">
                          <Shield className="text-orange-500" size={24} />
                          <div>
                             <h4 className="font-bold text-orange-800">Autenticação de Dois Fatores (2FA)</h4>
                             <p className="text-sm text-orange-700 mt-1">Recomendamos ativar o 2FA para maior segurança dos dados sensíveis de saúde.</p>
                             <button className="mt-3 px-4 py-2 bg-white text-orange-600 text-xs font-bold rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                                Ativar Agora
                             </button>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="font-bold text-gray-800">Alterar Senha</h4>
                       <input type="password" placeholder="Senha Atual" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-wine" />
                       <input type="password" placeholder="Nova Senha" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-wine" />
                       <input type="password" placeholder="Confirmar Nova Senha" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-wine" />
                    </div>
                 </div>
              )}

           </div>

           {/* Footer */}
           <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex justify-end">
              <button 
                className="flex items-center gap-2 px-6 py-2.5 bg-wine text-white font-bold rounded-xl hover:bg-wine-dark transition-all shadow-md shadow-wine/20 active:scale-95"
                onClick={() => alert("Configurações salvas com sucesso!")}
              >
                 <Save size={18} />
                 Salvar Alterações
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;