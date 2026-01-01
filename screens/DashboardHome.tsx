
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell
} from 'recharts';
import StatCard from '../components/StatCard';
import { kpis, shipments, exceptions } from '../mockData';
// Fix: Added ChevronRight to the imports list.
import { AlertCircle, ArrowRight, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const chartData = [
  { name: 'Mon', shipments: 400, onTime: 380 },
  { name: 'Tue', shipments: 300, onTime: 290 },
  { name: 'Wed', shipments: 520, onTime: 490 },
  { name: 'Thu', shipments: 450, onTime: 420 },
  { name: 'Fri', shipments: 600, onTime: 540 },
  { name: 'Sat', shipments: 200, onTime: 190 },
  { name: 'Sun', shipments: 150, onTime: 145 },
];

const DashboardHome = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Executive Summary</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time logistics intelligence for your global network.</p>
        </div>
        <div className="flex space-x-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Network Online</span>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <StatCard key={idx} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <TrendingUp size={20} className="text-indigo-600" />
              <span>Volume vs Performance</span>
            </h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold p-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorShip" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="shipments" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorShip)" />
                <Area type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-indigo-900 p-8 rounded-3xl shadow-xl shadow-indigo-200 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle size={120} />
          </div>
          <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
            <AlertCircle size={20} />
            <span>Active Alerts</span>
          </h3>
          <div className="space-y-4">
            {exceptions.map((ex, idx) => (
              <div key={idx} className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${ex.impact === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                    {ex.impact}
                  </span>
                  <span className="text-[10px] text-indigo-300 font-bold">{ex.type}</span>
                </div>
                <p className="text-sm font-bold mb-1">{ex.shipmentId}</p>
                <p className="text-xs text-indigo-100 line-clamp-1">{ex.suggestedAction}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-white/20 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
            View All Exceptions
          </button>
        </div>
      </div>

      {/* Recent Shipments Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Critical Shipments Monitoring</h3>
          <Link to="/operations" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Shipment ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Route</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Risk</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map((shp) => (
                <tr key={shp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-4 font-bold text-slate-800">{shp.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-600">{shp.origin}</span>
                      <ChevronRight size={12} className="text-slate-300" />
                      <span className="text-sm font-medium text-slate-600">{shp.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      shp.status === 'Delayed' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {shp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${shp.risk === 'High' ? 'bg-rose-500' : shp.risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <span className="text-xs font-semibold text-slate-600">{shp.risk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{shp.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
