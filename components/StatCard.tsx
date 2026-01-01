
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  status: 'Healthy' | 'Medium' | 'Critical';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, trend, status }) => {
  const statusColors = {
    Healthy: 'text-emerald-600 bg-emerald-50',
    Medium: 'text-amber-600 bg-amber-50',
    Critical: 'text-rose-600 bg-rose-50',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-slate-500 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className={`h-2 w-2 rounded-full ${status === 'Healthy' ? 'bg-emerald-500' : status === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'}`} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{status} status</span>
      </div>
    </div>
  );
};

export default StatCard;
