import React from 'react';
import { Package2, User, Lock, EyeOff, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-offwhite font-display">
      {/* Left Side: Branding */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-wine relative flex-col items-center justify-center p-8 overflow-hidden">
        {/* Halftone Pattern Overlay simulated with css radial gradient in config */}
        <div className="absolute inset-0 bg-dot-pattern opacity-10 w-full h-full pointer-events-none"></div>
        
        {/* Logo Section */}
        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-white/20">
            <Package2 className="text-white w-16 h-16" />
          </div>
          <h1 className="text-white text-4xl font-bold tracking-tight">Ibéria Embalagens</h1>
          <p className="text-white/80 text-lg font-medium max-w-sm">Sistema de Gestão de Saúde Corporativa</p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-brand/20 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full md:w-7/12 lg:w-1/2 flex-col justify-center items-center p-4 sm:p-12 relative bg-offwhite">
        <div className="w-full max-w-[420px] flex flex-col gap-8">
          
          {/* Mobile Header */}
          <div className="md:hidden flex flex-col items-center mb-4">
             <div className="w-16 h-16 bg-wine rounded-xl flex items-center justify-center mb-2 shadow-lg">
                <Package2 className="text-white w-8 h-8" />
             </div>
             <h2 className="text-wine font-bold text-xl">Ibéria ToxManager</h2>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-wine-dark text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] font-display">
              Acesso ao Sistema
            </h2>
            <p className="text-slate-500 text-sm">
              Entre com suas credenciais para acessar o painel.
            </p>
          </div>

          <form 
            className="flex flex-col gap-5"
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-wine-dark text-sm font-semibold">Usuário/Email</span>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 flex items-center pointer-events-none">
                  <User size={20} />
                </div>
                <input 
                  className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-brand focus:border-transparent placeholder:text-gray-400 transition-shadow" 
                  placeholder="ex: usuario@iberia.com.br" 
                  type="text" 
                  defaultValue="admin@iberia.com"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-wine-dark text-sm font-semibold">Senha</span>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 flex items-center pointer-events-none">
                  <Lock size={20} />
                </div>
                <input 
                  className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-orange-brand focus:border-transparent placeholder:text-gray-400 transition-shadow" 
                  placeholder="Digite sua senha" 
                  type="password" 
                  defaultValue="password"
                />
                <button type="button" className="absolute right-3.5 text-slate-400 hover:text-wine-dark flex items-center cursor-pointer transition-colors">
                  <EyeOff size={20} />
                </button>
              </div>
            </label>

            <button 
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-orange-brand hover:bg-orange-dark text-white text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Entrar
            </button>

            <div className="flex justify-center pt-2">
              <a className="text-slate-500 hover:text-orange-brand text-sm font-medium underline decoration-slate-300 hover:decoration-orange-brand underline-offset-4 transition-all" href="#">
                Esqueci minha senha
              </a>
            </div>
          </form>
        </div>

        <div className="absolute bottom-6 flex items-center gap-2 text-slate-400 opacity-80 hover:opacity-100 transition-opacity cursor-help">
          <ShieldCheck size={16} />
          <span className="text-xs font-medium uppercase tracking-wider">Ambiente Seguro e Auditável</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
