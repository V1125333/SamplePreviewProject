
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, History, Tag, Package, Building, 
  User, Zap, Database, CheckCircle2, Loader2, Sparkles, 
  ArrowRight, ShieldCheck, Trophy, MapPin, Truck, Calendar,
  AlertTriangle, ChevronRight, BarChart3, Star, Award, TrendingUp
} from 'lucide-react';
import { getAIResponse } from '../geminiService';
import { vendors, shipments } from '../mockData';

const GlobalSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<{ text: string; toolCall?: any } | null>(null);
  const [recentSearches] = useState(['SHP-90021', 'Swift Logistics analytics', 'Top vendors for Hyderabad to Guntur']);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setAiResult(null);
    setActiveTool(null);

    const result = await getAIResponse(query);
    
    if (result.toolCall) {
      setActiveTool(result.toolCall.name);
      await new Promise(r => setTimeout(r, 1200));
      setActiveTool(null);
    }

    setAiResult(result);
    setIsSearching(false);
  };

  const handleRecentClick = (q: string) => {
    setQuery(q);
    setTimeout(() => handleSearch(), 50);
  };

  // Find shipment if tool was called
  const targetedShipment = useMemo(() => {
    if (aiResult?.toolCall?.name === 'analyze_shipment_risk') {
      const id = aiResult.toolCall.args.shipment_id;
      return shipments.find(s => s.id === id);
    }
    return null;
  }, [aiResult]);

  // Find vendor if tool was called
  const targetedVendor = useMemo(() => {
    if (aiResult?.toolCall?.name === 'get_vendor_analytics') {
      const name = aiResult.toolCall.args.vendor_name?.toLowerCase();
      return vendors.find(v => v.name.toLowerCase().includes(name) || name.includes(v.name.toLowerCase()));
    }
    return null;
  }, [aiResult]);

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-1.5 rounded-full text-indigo-600 mb-2">
          <Sparkles size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Agentic Search Hub</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Intelligence Command</h1>
        <p className="text-slate-500 text-lg font-medium">Instantly track IDs or analyze vendor performance with AI.</p>
      </div>

      <div className="relative group max-w-3xl mx-auto">
        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200 ${isSearching ? 'animate-pulse opacity-70' : ''}`} />
        
        <form onSubmit={handleSearch} className="relative bg-white p-2 rounded-3xl border border-slate-200 shadow-2xl flex items-center space-x-4">
          <div className={`p-4 rounded-2xl transition-colors ${isSearching ? 'bg-indigo-600 text-white animate-spin' : 'bg-indigo-50 text-indigo-600'}`}>
            {isSearching ? <Loader2 size={28} /> : <Search size={28} />}
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-2xl font-bold text-slate-800 border-none outline-none placeholder-slate-300 bg-transparent"
            placeholder="Search ID or ask: 'Stats for Swift Logistics'..."
          />
          <button 
            type="submit"
            className="bg-slate-900 text-white p-4 rounded-2xl flex items-center space-x-2 px-8 hover:bg-slate-800 transition-all shadow-lg hover:shadow-indigo-200"
          >
             <Zap size={18} className="fill-white" />
             <span className="font-bold">Analyze</span>
          </button>
        </form>
      </div>

      {isSearching && activeTool && (
        <div className="flex justify-center animate-in zoom-in duration-300">
          <div className="bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl border border-slate-700 flex items-center space-x-4 ring-4 ring-indigo-500/20">
            <div className="p-3 bg-indigo-500/20 rounded-2xl">
              <Database size={24} className="text-indigo-400 animate-bounce" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Querying Logistics Cluster</p>
              <p className="text-lg font-bold">Executing Tool: <span className="text-indigo-300">{activeTool}(...)</span></p>
            </div>
          </div>
        </div>
      )}

      {aiResult && !isSearching && (
        <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          {/* AI Response Panel */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Sparkles size={160} />
            </div>
            
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Agent Intelligence</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Synthesized Insight</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full">
                <CheckCircle2 size={14} />
                <span>Verified Analytics Data</span>
              </div>
            </div>

            <div className="text-slate-700 leading-relaxed text-lg font-medium whitespace-pre-wrap mb-8">
              {aiResult.text || "I've analyzed the request. Here are the findings from our logistics network."}
            </div>

            {/* Targeted Vendor Analytics Card */}
            {targetedVendor && (
              <div className="mt-8 bg-slate-50 border border-slate-100 p-8 rounded-[2rem] animate-in zoom-in-95 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600 font-black text-2xl uppercase">
                      {targetedVendor.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-slate-800 tracking-tight">{targetedVendor.name}</h4>
                      <p className="text-sm font-bold text-slate-400 flex items-center">
                        <Award size={14} className="mr-1 text-indigo-500" />
                        Network Tier: Premium Carrier
                      </p>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
                    <div className="text-center">
                       <p className="text-2xl font-black text-indigo-600">{targetedVendor.score}</p>
                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">IQ Rating</p>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="text-center">
                       <p className="text-2xl font-black text-slate-800">{targetedVendor.onTimeRate}%</p>
                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Reliability</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                      <TrendingUp size={12} className="mr-1 text-emerald-500" />
                      Growth Trend
                    </h5>
                    <p className="text-xl font-bold text-slate-800">+{targetedVendor.lastQuarterTrend === 'up' ? '12.4%' : '-2.1%'}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Performance vs Prev Quarter</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                      <ShieldCheck size={12} className="mr-1 text-indigo-500" />
                      Compliance Score
                    </h5>
                    <p className="text-xl font-bold text-slate-800">{targetedVendor.compliance}%</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{ width: `${targetedVendor.compliance}%` }} />
                    </div>
                  </div>
                  <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg shadow-indigo-100 text-white">
                    <h5 className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-4 flex items-center">
                      <Star size={12} className="mr-1 fill-white" />
                      AI Recommendation
                    </h5>
                    <p className="text-sm font-bold leading-relaxed">Highly reliable for sensitive or high-value cargo handling.</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={() => navigate(`/vendors/${targetedVendor.id}`)}
                    className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center group hover:bg-indigo-50 px-6 py-3 rounded-xl transition-all"
                  >
                    View Detailed Carrier Profile & Metrics
                    <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Targeted Shipment Card (SHP-90021) */}
            {targetedShipment && (
              <div className="mt-8 bg-slate-50 border border-slate-100 p-8 rounded-[2rem] animate-in zoom-in-95 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600">
                      <Truck size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-800">{targetedShipment.id}</h4>
                      <p className="text-sm font-bold text-slate-400">{targetedShipment.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                        targetedShipment.status === 'Delayed' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                      }`}>
                        {targetedShipment.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Level</p>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          targetedShipment.risk === 'High' ? 'bg-rose-500' : targetedShipment.risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        <span className="font-bold text-slate-700">{targetedShipment.risk}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Route Progression</h5>
                    <div className="relative pl-6 space-y-6 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white" />
                        <p className="text-xs font-bold text-slate-800">{targetedShipment.origin}</p>
                        <p className="text-[10px] text-slate-400">Origin Port</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-indigo-200 rounded-full border-2 border-white" />
                        <p className="text-xs font-bold text-slate-800">{targetedShipment.destination}</p>
                        <p className="text-[10px] text-slate-400">Scheduled Arrival</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                       <Calendar size={12} className="mr-1" />
                       Estimated Delivery
                    </h5>
                    <p className="text-2xl font-black text-slate-800">{targetedShipment.eta}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">On-schedule for {new Date(targetedShipment.eta).toLocaleDateString(undefined, { weekday: 'long' })}</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                       <ShieldCheck size={12} className="mr-1" />
                       Carrier IQ
                    </h5>
                    <p className="text-lg font-bold text-slate-800">{targetedShipment.vendor}</p>
                    <p className="text-xs text-indigo-600 font-black mt-1">98% Reliability Score</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contextual Action Cards - For Vendor Search */}
            {aiResult.toolCall?.name === 'get_vendor_recommendations' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
                {vendors.slice(0, 3).map((v, idx) => (
                  <div key={v.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 font-black group-hover:text-indigo-600">
                        {idx + 1}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-slate-800">{v.score}</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">IQ Score</p>
                      </div>
                    </div>
                    <h5 className="font-bold text-slate-800 mb-1">{v.name}</h5>
                    <p className="text-xs text-slate-500 mb-4 font-medium">Reliability: {v.onTimeRate}%</p>
                    <button 
                      onClick={() => navigate(`/vendors/${v.id}`)}
                      className="w-full py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <button onClick={() => setAiResult(null)} className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Clear Results</button>
          </div>
        </div>
      )}

      {!query && !aiResult && !isSearching && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center space-x-2">
              <History size={16} />
              <span>Contextual Recents</span>
            </h3>
            <div className="space-y-3">
              {recentSearches.map((item) => (
                <div 
                  key={item} 
                  onClick={() => handleRecentClick(item)}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 cursor-pointer transition-all shadow-sm group"
                >
                   <div className="flex items-center space-x-3">
                     <Tag size={16} className="text-slate-300 group-hover:text-indigo-500" />
                     <span className="text-sm font-bold text-slate-600">{item}</span>
                   </div>
                   <ArrowRight size={14} className="text-slate-200 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center space-x-2">
              <Package size={16} />
              <span>One-Click Agency</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleRecentClick("Analyze risk for SHP-90022")}
                className="p-6 bg-white border border-slate-100 rounded-3xl hover:bg-indigo-50 hover:border-indigo-200 transition-all flex flex-col items-center space-y-3 group shadow-sm text-center"
              >
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-colors shadow-sm">
                  <AlertTriangle size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Check Risk SHP-90022</span>
              </button>
              <button 
                onClick={() => handleRecentClick("Who are the top 3 vendors for heavy cargo?")}
                className="p-6 bg-white border border-slate-100 rounded-3xl hover:bg-indigo-50 hover:border-indigo-200 transition-all flex flex-col items-center space-y-3 group shadow-sm text-center"
              >
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-colors shadow-sm">
                  <Trophy size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Find Best Carrier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
