
import React, { useState } from 'react';
import { podDocuments } from '../mockData';
import { FileText, Eye, Download, Search, CheckCircle, XCircle, Clock, FileCheck } from 'lucide-react';

const PODViewer = () => {
  const [selectedDoc, setSelectedDoc] = useState(podDocuments[0]);

  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">POD Document Center</h1>
          <p className="text-slate-500 mt-1 font-medium">Digital verification of shipment deliveries and compliance.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 flex items-center space-x-2">
            <FileCheck size={18} />
            <span>Bulk Verify</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Document List */}
        <div className="lg:col-span-4 space-y-6 flex flex-col min-h-0">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              placeholder="Search Shipment ID..."
            />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1 overflow-y-auto">
            <div className="divide-y divide-slate-100">
              {podDocuments.map((doc) => (
                <div 
                  key={doc.id} 
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-6 transition-all cursor-pointer border-l-4 ${
                    selectedDoc.id === doc.id ? 'bg-indigo-50 border-indigo-600' : 'hover:bg-slate-50 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                        <FileText size={18} />
                      </div>
                      <h4 className="font-bold text-slate-800">{doc.shipmentId}</h4>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      doc.status === 'Verified' ? 'text-emerald-600' : doc.status === 'Rejected' ? 'text-rose-600' : 'text-amber-600'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs font-bold text-slate-400">{doc.date}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-black text-slate-400 uppercase tracking-widest">{doc.fileType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Viewer Area */}
        <div className="lg:col-span-8 flex flex-col space-y-6 min-h-0">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-indigo-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Document #{selectedDoc.id}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Shipment: {selectedDoc.shipmentId}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-500">
                  <Eye size={20} />
                </button>
                <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-500">
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-800 flex items-center justify-center p-8 overflow-y-auto">
              <div className="bg-white w-full max-w-2xl h-[800px] shadow-2xl relative p-12 flex flex-col">
                 <div className="flex justify-between items-start mb-12">
                   <div className="space-y-1">
                      <div className="w-12 h-12 bg-indigo-600 rounded flex items-center justify-center text-white text-xs font-black">LOGI</div>
                      <p className="text-[10px] font-black uppercase tracking-tighter">PROOF OF DELIVERY</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xl font-black text-slate-800">INV-99021-X</p>
                     <p className="text-xs font-bold text-slate-400">Date: {selectedDoc.date}</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-12 mb-12">
                   <div>
                     <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Shipped From</h5>
                     <p className="text-sm font-bold text-slate-800">Swift Logistics Shanghai</p>
                     <p className="text-xs text-slate-500">Terminal 4, Port Area</p>
                     <p className="text-xs text-slate-500">Shanghai, CN 20000</p>
                   </div>
                   <div>
                     <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Shipped To</h5>
                     <p className="text-sm font-bold text-slate-800">Global Tech Corp HQ</p>
                     <p className="text-xs text-slate-500">100 Innovation Way</p>
                     <p className="text-xs text-slate-500">Los Angeles, US 90001</p>
                   </div>
                 </div>

                 <div className="flex-1 border-y-2 border-slate-50 py-8 mb-12">
                    <table className="w-full">
                       <thead>
                         <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                           <th className="pb-4">Quantity</th>
                           <th className="pb-4">Description</th>
                           <th className="pb-4 text-right">Total</th>
                         </tr>
                       </thead>
                       <tbody className="text-sm">
                         <tr>
                           <td className="py-2 font-bold">12 units</td>
                           <td className="py-2 text-slate-600 font-medium">Server Rack Clusters - Model X</td>
                           <td className="py-2 text-right font-bold">$124,000.00</td>
                         </tr>
                         <tr>
                           <td className="py-2 font-bold">4 crates</td>
                           <td className="py-2 text-slate-600 font-medium">High Precision Optics</td>
                           <td className="py-2 text-right font-bold">$42,500.00</td>
                         </tr>
                       </tbody>
                    </table>
                 </div>

                 <div className="flex justify-between items-end">
                   <div className="space-y-4">
                     <div className="h-16 w-48 bg-slate-50 rounded border border-dashed border-slate-200 flex items-center justify-center">
                        <span className="font-serif italic text-slate-300 text-3xl opacity-50">Authorized Sig.</span>
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Received by: J. Anderson</p>
                   </div>
                   <div className="text-right">
                     <div className="w-24 h-24 bg-slate-100 rounded flex items-center justify-center ml-auto">
                        <div className="w-16 h-16 border-4 border-slate-300 rounded opacity-20" />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">QR VERIFIED</p>
                   </div>
                 </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-center space-x-4">
               <button className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center space-x-2">
                 <CheckCircle size={18} />
                 <span>Approve POD</span>
               </button>
               <button className="bg-rose-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all flex items-center space-x-2">
                 <XCircle size={18} />
                 <span>Flag Discrepancy</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PODViewer;
