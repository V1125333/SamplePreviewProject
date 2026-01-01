
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vendors, shipments } from '../mockData';
import { 
  ArrowLeft, ShieldCheck, Award, Star, TrendingUp, 
  MapPin, Clock, Calendar, CheckCircle2, AlertTriangle,
  ExternalLink, BarChart3, Mail, Phone, Globe,
  Truck, ChevronRight, Zap
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const performanceData = [
  { month: 'Jan', onTime: 95, cost: 400 },
  { month: 'Feb', onTime: 92, cost: 420 },
  { month: 'Mar', onTime: 98, cost: 380 },
  { month: 'Apr', onTime: 94, cost: 410 },
  { month: 'May', onTime: 96, cost: 390 },
  { month: 'Jun', onTime: 97, cost: 405 },
];

const VendorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = vendors.find(v => v.id === id) || vendors[0];
  const vendorShipments = shipments.filter(s => s.vendor === vendor.name);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <button 
        onClick={() => navigate('/vendors')}
        className="flex items-center space-x-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors py-2 px-1"
      >
        <ArrowLeft size={18} />
        <span className="text-sm uppercase tracking-widest">Back to Directory</span>
      </button>

      {/* Profile Header */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <Globe size={240} />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-indigo-100">
              {vendor.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{vendor.name}</h1>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full flex items-center space-x-1.5 border border-emerald-100">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Verified Premium</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-400">
                <span className="flex items-center">
                  <MapPin size={14} className="mr-1.5 text-indigo-500" />
                  Global Carrier Network
                </span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center">
                  <Award size={14} className="mr-1.5 text-indigo-500" />
                  {vendor.id}
                </span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center">
                  <Star size={14} className="mr-1.5 text-amber-500 fill-amber-500" />
                  Top Tier Carrier
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors">
               <Mail size={20} />
             </button>
             <button className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors">
               <Phone size={20} />
             </button>
             <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
               New Booking
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* IQ Scorecard */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <BarChart3 size={20} className="text-indigo-600" />
            <span>Carrier IQ Scorecard</span>
          </h3>

          <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-200" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * vendor.score / 100)} className="text-indigo-600" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-800">{vendor.score}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Aggregated</span>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold text-slate-500 uppercase tracking-widest">Network Performance Tier</p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reliability (OTIF)</span>
                <span className="text-sm font-black text-slate-800">{vendor.onTimeRate}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${vendor.onTimeRate}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Regulatory Compliance</span>
                <span className="text-sm font-black text-slate-800">{vendor.compliance}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${vendor.compliance}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                 <TrendingUp size={20} className="text-indigo-600" />
                 <span>Historical Reliability Trend</span>
               </h3>
               <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold p-2 outline-none">
                 <option>Last 6 Months</option>
                 <option>Last Year</option>
               </select>
             </div>
             <div className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={performanceData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                   <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                   />
                   <Line type="monotone" dataKey="onTime" stroke="#6366f1" strokeWidth={4} dot={{r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                 <Clock size={20} className="text-indigo-600" />
                 <span>Active Network Load</span>
               </h3>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{vendorShipments.length} Current Shipments</span>
             </div>
             <div className="divide-y divide-slate-100">
               {vendorShipments.length > 0 ? vendorShipments.map((shp) => (
                 <div key={shp.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                        <Truck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{shp.id}</p>
                        <p className="text-xs text-slate-400 font-medium">{shp.origin} → {shp.destination}</p>
                      </div>
                   </div>
                   <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${
                          shp.status === 'Delayed' ? 'text-rose-600' : 'text-emerald-600'
                        }`}>{shp.status}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1">ETA: {shp.eta}</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-200" />
                   </div>
                 </div>
               )) : (
                 <div className="p-10 text-center text-slate-400 font-medium">No active shipments in the current corridor.</div>
               )}
             </div>
          </div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
           <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
             <Zap size={20} className="text-amber-400" />
             <span>AI Strategy Note</span>
           </h4>
           <p className="text-indigo-100 leading-relaxed font-medium mb-6">
             Excellent choice for short-haul freight in the European corridor. Currently maintaining a 98.4% success rate on winter routes.
           </p>
           <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Cost Efficiency</p>
              <p className="text-lg font-bold">Top 5% in Route Optimization</p>
           </div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <MapPin size={20} className="text-indigo-600" />
              <span>Primary Hubs</span>
            </h4>
            <div className="space-y-4">
              {['Shanghai Hub (Terminal 4)', 'Hamburg Logistics Center', 'Los Angeles Port Base'].map((hub) => (
                <div key={hub} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 border border-slate-200 shadow-sm">
                    <MapPin size={14} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{hub}</span>
                </div>
              ))}
            </div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <span>Compliance Tags</span>
            </h4>
            <div className="flex flex-wrap gap-2">
               {['ISO-9001', 'GDP Certified', 'Safety First v2', 'Green Fleet 2023', 'Customs Verified'].map((tag) => (
                 <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200">
                   {tag}
                 </span>
               ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold flex items-center justify-center space-x-2">
               <span>Download Audit Report</span>
               <ExternalLink size={14} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default VendorDetail;
