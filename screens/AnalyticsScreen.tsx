
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { kpis } from '../mockData';
import { Calendar, Globe, Zap, Database, Download } from 'lucide-react';

const costData = [
  { name: 'Jan', air: 4000, sea: 2400, road: 2400 },
  { name: 'Feb', air: 3000, sea: 1398, road: 2210 },
  { name: 'Mar', air: 2000, sea: 9800, road: 2290 },
  { name: 'Apr', air: 2780, sea: 3908, road: 2000 },
  { name: 'May', air: 1890, sea: 4800, road: 2181 },
  { name: 'Jun', air: 2390, sea: 3800, road: 2500 },
];

const distributionData = [
  { name: 'On-Time', value: 742 },
  { name: 'Delayed', value: 84 },
  { name: 'In Dispute', value: 12 },
  { name: 'Cancelled', value: 8 },
];

const COLORS = ['#6366f1', '#f43f5e', '#f59e0b', '#94a3b8'];

const AnalyticsScreen = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Intelligence & Analytics</h1>
          <p className="text-slate-500 mt-1 font-medium">Deep data exploration and network observability.</p>
        </div>
        <div className="flex space-x-3">
          <div className="bg-white border border-slate-200 p-2 rounded-xl flex items-center space-x-2 text-xs font-bold px-4">
             <Calendar size={14} className="text-slate-400" />
             <span className="text-slate-600 uppercase tracking-widest">Oct 2023 - Nov 2023</span>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 flex items-center space-x-2">
            <Download size={18} />
            <span>Export BI Pack</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cost Analysis Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <Database className="text-indigo-500" size={20} />
              <span>Modal Cost Distribution</span>
            </h3>
            <div className="flex space-x-2">
               {['Air', 'Sea', 'Road'].map((mode, i) => (
                 <div key={mode} className="flex items-center space-x-1">
                   <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-indigo-600' : i === 1 ? 'bg-indigo-400' : 'bg-indigo-200'}`} />
                   <span className="text-[10px] font-bold text-slate-400 uppercase">{mode}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="air" stackId="a" fill="#4f46e5" radius={[0, 0, 0, 0]} barSize={40} />
                <Bar dataKey="sea" stackId="a" fill="#818cf8" radius={[0, 0, 0, 0]} />
                <Bar dataKey="road" stackId="a" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reliability Gauge */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-slate-800 mb-8 self-start flex items-center space-x-2">
            <Globe className="text-emerald-500" size={20} />
            <span>Service Reliability</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            {distributionData.map((d, i) => (
              <div key={d.name} className="flex flex-col items-center">
                <span className="text-xl font-black text-slate-800">{d.value}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Efficiency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'CO2 Emission Index', value: '4.2t', status: 'Healthy', trend: 'down' },
          { label: 'Average Warehouse Idle', value: '18h', status: 'Medium', trend: 'up' },
          { label: 'Route Efficiency', value: '98.2%', status: 'Healthy', trend: 'up' },
          { label: 'Carrier Response Time', value: '1.2m', status: 'Healthy', trend: 'down' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-2xl font-black text-slate-800 mb-1">{stat.value}</p>
            <div className={`flex items-center space-x-1 text-xs font-bold ${stat.status === 'Healthy' ? 'text-emerald-600' : 'text-amber-600'}`}>
               <Zap size={12} />
               <span className="uppercase tracking-widest">{stat.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsScreen;
