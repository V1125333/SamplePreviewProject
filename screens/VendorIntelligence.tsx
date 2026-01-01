
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendors } from '../mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { 
  Star, Shield, Award, TrendingUp, TrendingDown, 
  ExternalLink, MapPin, Scale, Search, CheckCircle, 
  Trophy, Medal
} from 'lucide-react';

const radarData = [
  { subject: 'Reliability', A: 120, B: 110, fullMark: 150 },
  { subject: 'Cost', A: 98, B: 130, fullMark: 150 },
  { subject: 'Speed', A: 86, B: 130, fullMark: 150 },
  { subject: 'Compliance', A: 99, B: 100, fullMark: 150 },
  { subject: 'Comm.', A: 85, B: 90, fullMark: 150 },
];

const VendorIntelligence = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Get top 3 vendors sorted by score
  const topThreeVendors = useMemo(() => {
    return [...vendors].sort((a, b) => b.score - a.score).slice(0, 3);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Vendor Intelligence</h1>
          <p className="text-slate-500 mt-1 font-medium">Strategic carrier matching and performance analytics.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-indigo-600 text-sm font-bold flex items-center space-x-2">
          <Award size={18} />
          <span>Verified Network: 128 Carriers</span>
        </div>
      </div>

      {/* Route Matcher Utility */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-50/50">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
          <Search size={20} className="text-indigo-600" />
          <span>Carrier Route Matcher</span>
        </h3>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Origin City</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="e.g. Hyderabad"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="e.g. Guntur"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Weight (KG)</label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="number" 
                placeholder="e.g. 100"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={isSearching}
            className="bg-indigo-600 text-white rounded-xl py-2.5 font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Find Top Carriers</span>
            )}
          </button>
        </form>

        {showResults && (
          <div className="mt-10 animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-slate-800 flex items-center space-x-2">
                <Trophy size={18} className="text-amber-500" />
                <span>Top 3 Matches for {origin} to {destination} ({weight} KG)</span>
              </h4>
              <button onClick={() => setShowResults(false)} className="text-xs font-bold text-indigo-600 hover:underline">Clear Search</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topThreeVendors.map((v, idx) => (
                <div key={v.id} className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden ${
                  idx === 0 ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100'
                }`}>
                  {idx === 0 && <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Best Match</div>}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      idx === 0 ? 'bg-amber-100 text-amber-600' : idx === 1 ? 'bg-slate-100 text-slate-500' : 'bg-orange-50 text-orange-600'
                    }`}>
                      <Medal size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">{v.name}</h5>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank #{idx + 1}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-50 mb-4">
                    <div>
                      <p className="text-lg font-black text-slate-800">{v.score}</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">IQ Score</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-indigo-600">{v.onTimeRate}%</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">On-Time</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/vendors/${v.id}`)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-colors ${
                      idx === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle size={14} />
                    <span>View Carrier Metrics</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vendor List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-slate-800">Carrier Directory</h3>
            <span className="text-xs font-bold text-slate-400">{vendors.length} Carriers Available</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vendors.map((v) => (
              <div key={v.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all">
                <div className="absolute top-0 right-0 p-4">
                  {v.lastQuarterTrend === 'up' ? (
                    <TrendingUp className="text-emerald-500" size={20} />
                  ) : (
                    <TrendingDown className="text-rose-500" size={20} />
                  )}
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-lg text-slate-400 uppercase">
                    {v.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{v.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{v.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-2 bg-slate-50 rounded-xl">
                    <p className="text-sm font-black text-indigo-600">{v.score}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Score</p>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded-xl">
                    <p className="text-sm font-black text-slate-800">{v.onTimeRate}%</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">OTIF</p>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded-xl">
                    <p className="text-sm font-black text-slate-800">{v.compliance}%</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">CMP</p>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/vendors/${v.id}`)}
                  className="w-full py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View Full Profile</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Analysis */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center space-x-2">
              <Award className="text-amber-500" size={20} />
              <span>Comparative Radar</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                  <Radar name="Carrier A" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                  <Radar name="Carrier B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                <span className="text-xs font-bold text-slate-600">Primary</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-xs font-bold text-slate-600">Market Avg</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Shield size={20} />
              <span>Network Trust</span>
            </h4>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6 font-medium">
              Carriers with scores above 85 are eligible for "Auto-Dispatch" status. 72% of our current network exceeds this benchmark.
            </p>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-100 overflow-hidden">
                   <img src={`https://picsum.photos/seed/${i+10}/40/40`} alt="user" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center text-xs font-bold text-indigo-600">
                +84
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorIntelligence;
