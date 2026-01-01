
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exceptions, shipments } from '../mockData';
import { 
  ArrowLeft, MapPin, Calendar, User, 
  AlertTriangle, CheckCircle, RefreshCcw, Truck, 
  MessageSquare, ExternalLink, ShieldCheck
} from 'lucide-react';

const ExceptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ex = exceptions.find(e => e.id === id) || exceptions[0];
  const shp = shipments.find(s => s.id === ex.shipmentId) || shipments[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm uppercase tracking-widest">Back to Dashboard</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Detail Info */}
        <div className="flex-1 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-block mb-4 ${
                  ex.impact === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  Critical Exception #{ex.id}
                </span>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{ex.type}</h1>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Confidence Score</p>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600" style={{ width: `${ex.probability}%` }} />
                  </div>
                  <span className="text-xl font-black text-slate-800">{ex.probability}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Shipment Intelligence</h4>
                  <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">ID</span>
                      <span className="font-bold text-slate-800">{shp.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">Customer</span>
                      <span className="font-bold text-slate-800">{shp.customer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">Carrier</span>
                      <span className="font-bold text-indigo-600">{shp.vendor}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
                  <div className="flex items-center space-x-2 text-rose-600 mb-4">
                    <AlertTriangle size={20} />
                    <h3 className="font-bold">Root Cause Analysis</h3>
                  </div>
                  <p className="text-rose-900 leading-relaxed font-medium">
                    Unexpected cold front moving through high-altitude corridors in Germany. 
                    Heavy Haul Co assets lack winterization certificates for these specific conditions.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">AI Recommendation</h4>
                  <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
                    <div className="flex items-center space-x-2 mb-4">
                      <RefreshCcw size={20} className="animate-spin-slow" />
                      <h3 className="font-bold text-lg">Action Required</h3>
                    </div>
                    <p className="text-indigo-100 leading-relaxed font-medium mb-8">
                      {ex.suggestedAction}. Switching to a lower altitude route will add 4 hours to ETA but bypasses 90% of risk zone.
                    </p>
                    <button className="w-full bg-white text-indigo-600 py-3 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">
                      Approve Route Change
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                   <button className="flex-1 border-2 border-slate-100 py-3 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                     Hold Shipment
                   </button>
                   <button className="flex-1 border-2 border-slate-100 py-3 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                     Contact Carrier
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Timeline/Activity */}
        <div className="w-full lg:w-80 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <Calendar size={18} className="text-indigo-500" />
              <span>Event Timeline</span>
            </h3>
            <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {[
                { time: '10:45 AM', event: 'Risk Identified', desc: 'AI Model v4.2 flagged weather risk', icon: AlertTriangle, color: 'text-amber-500 bg-amber-50' },
                { time: '11:02 AM', event: 'Carrier Notified', desc: 'System sent automated inquiry', icon: MessageSquare, color: 'text-indigo-500 bg-indigo-50' },
                { time: '11:15 AM', event: 'Pending Review', desc: 'Awaiting Ops Approval', icon: CheckCircle, color: 'text-slate-400 bg-slate-100' },
              ].map((item, idx) => (
                <div key={idx} className="relative pl-10">
                  <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 ${item.color}`}>
                    <item.icon size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.time}</p>
                    <p className="text-sm font-bold text-slate-800">{item.event}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck size={20} className="text-emerald-400" />
              <h3 className="font-bold">Compliance Status</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Carrier Rating</span>
                <span className="font-bold text-amber-400">7.8/10</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Insurance Active</span>
                <span className="font-bold text-emerald-400">YES</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Route Certs</span>
                <span className="font-bold text-rose-400">EXPIRED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExceptionDetail;
