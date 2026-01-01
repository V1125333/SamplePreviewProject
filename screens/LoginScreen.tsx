
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600 transform skew-x-12 translate-x-1/2" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply opacity-50" />
      
      <div className="max-w-md w-full p-8 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-2xl p-10 border border-slate-100">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-4 rotate-3 hover:rotate-0 transition-all duration-300">
              <Truck size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">LogiIntel</h1>
            <p className="text-slate-500 mt-2 font-medium">Unified Intelligence Platform</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  defaultValue="alex.rivers@logintel.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" 
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="password" 
                  defaultValue="password123"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" 
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 py-2">
              <input type="checkbox" id="remember" className="rounded text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="remember" className="text-xs font-semibold text-slate-500">Keep me logged in for 30 days</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white rounded-2xl py-3.5 font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all flex items-center justify-center space-x-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center space-x-2 text-slate-400 mb-1">
              <ShieldCheck size={14} />
              <span className="text-[10px] uppercase font-bold tracking-widest">Enterprise Secure Session</span>
            </div>
            <p className="text-xs text-slate-400">© 2023 LogiIntel Platforms Inc.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
