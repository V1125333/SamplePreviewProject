
import React from 'react';
import { exceptions } from '../mockData';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, BrainCircuit, Zap, ShieldAlert, BarChart } from 'lucide-react';

const ExceptionPrediction = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Exception Prediction</h1>
          <p className="text-slate-500 mt-1 font-medium">Predictive modeling identifying logistics bottlenecks before they occur.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-indigo-600 text-sm font-bold flex items-center space-x-2">
          <BrainCircuit size={18} />
          <span>Model Accuracy: 94.2%</span>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exceptions.map((ex) => (
          <div 
            key={ex.id} 
            onClick={() => navigate(`/exceptions/${ex.id}`)}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-12 -translate-y-12 rounded-full opacity-10 ${
              ex.impact === 'High' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
            
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${
                ex.impact === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <ShieldAlert size={24} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-800">{ex.probability}%</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Confidence</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">{ex.type}</h3>
            <p className="text-sm font-bold text-indigo-600 mb-4">{ex.shipmentId}</p>
            
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Threat Impact</span>
                <span className={ex.impact === 'High' ? 'text-rose-500' : 'text-amber-500'}>{ex.impact}</span>
              </div>
              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full ${ex.impact === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: `${ex.probability}%` }} />
              </div>
            </div>

            <div className="mt-8 flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
              <span>Analyze Detail</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Risk Distribution Widget */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-20 pointer-events-none">
          <BarChart size={300} strokeWidth={1} />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h2 className="text-3xl font-bold">Risk Management Hub</h2>
            </div>
            <p className="text-indigo-100 text-lg leading-relaxed mb-8 font-medium">
              LogiIntel's AI engine is currently processing 15,000+ data points including global weather, port traffic, fuel surcharges, and carrier health.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-indigo-900 px-8 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors">
                Run Simulation
              </button>
              <button className="border border-white/20 text-white px-8 py-3 rounded-2xl font-bold hover:bg-white/10 transition-colors">
                View History
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Weather Related Risk</span>
                <span className="text-emerald-400 font-black">+12%</span>
              </div>
              <p className="text-sm text-indigo-100">Storm systems near Shanghai port may delay 14 shipments.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Labor Strike Risk</span>
                <span className="text-rose-400 font-black">HIGH</span>
              </div>
              <p className="text-sm text-indigo-100">Threat level increased in Northern France freight corridors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExceptionPrediction;
