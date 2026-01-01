
import React, { useState } from 'react';
import { shipments } from '../mockData';
import { MapPin, Filter, Download, MoreHorizontal, Search, Truck, Clock, CheckCircle2 } from 'lucide-react';

const OperationsControl = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Operations Control Center</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitoring active global logistics flow.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:bg-slate-50">
            <Filter size={20} />
          </button>
          <button className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:bg-slate-50">
            <Download size={20} />
          </button>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100">
            Export Data
          </button>
        </div>
      </div>

      {/* Operation Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center space-x-4 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Truck size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">482</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">In Transit</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center space-x-4 shadow-sm">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">12</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Clear</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center space-x-4 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">3,492</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Month-to-Date</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text" 
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              placeholder="Search by Shipment ID, Customer, or Destination..."
            />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {shipments.map((shp) => (
                <div key={shp.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                        shp.risk === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {shp.id.slice(-2)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-slate-800">{shp.id}</h4>
                          <span className="text-xs text-slate-400 font-medium">•</span>
                          <span className="text-sm font-semibold text-slate-500">{shp.customer}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin size={12} className="text-indigo-500" />
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{shp.origin} → {shp.destination}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${
                        shp.status === 'Delayed' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                      }`}>
                        {shp.status}
                      </span>
                      <p className="text-xs font-bold text-slate-400 mt-2">ETA: {shp.eta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini Map/Stats Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Traffic Analysis</h3>
            <div className="space-y-6">
              {[
                { name: 'China - USA', load: 85, color: 'bg-indigo-600' },
                { name: 'EU - Intra', load: 42, color: 'bg-emerald-500' },
                { name: 'USA - Domestic', load: 92, color: 'bg-rose-500' },
                { name: 'India - MEA', load: 12, color: 'bg-amber-500' },
              ].map((lane) => (
                <div key={lane.name}>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                    <span>{lane.name}</span>
                    <span>{lane.load}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${lane.color}`} style={{ width: `${lane.load}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100">
              <div className="bg-indigo-50 p-4 rounded-2xl">
                <p className="text-xs font-bold text-indigo-600 mb-2 uppercase tracking-widest">Pro Recommendation</p>
                <p className="text-sm text-indigo-900 leading-relaxed font-medium">
                  Port of Long Beach congestion is increasing. Consider rerouting 15% of inbound Shanghai shipments to Oakland.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsControl;
