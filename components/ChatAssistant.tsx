
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Zap, Database, CheckCircle2 } from 'lucide-react';
import { getAIResponse } from '../geminiService';
import { Message } from '../types';

interface ChatAssistantProps {
  onClose: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "LogiIntel Agent Online. Connected to MCP Hub. How can I assist your operations?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTool]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    const result = await getAIResponse(userMessage);
    
    // Simulate MCP Tool execution visual
    if (result.toolCall) {
      setActiveTool(result.toolCall.name);
      await new Promise(r => setTimeout(r, 1500)); // Visual "thinking" time for the tool
      setActiveTool(null);
    }

    setMessages(prev => [...prev, { role: 'assistant', content: result.text || "Action completed." }]);
    setIsLoading(false);
  };

  return (
    <div className="absolute bottom-20 right-0 w-[420px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap size={20} className="fill-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Agentic Orchestrator</h3>
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">MCP Server Connected</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] p-4 rounded-3xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-100' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm font-medium'
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {/* Tool Execution Visualizer */}
        {activeTool && (
          <div className="flex justify-start">
            <div className="bg-slate-900 text-white p-4 rounded-3xl rounded-tl-none shadow-xl border border-slate-800 flex items-center space-x-3 animate-pulse">
              <div className="p-2 bg-indigo-500/20 rounded-xl">
                <Database size={16} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Executing Tool</p>
                <p className="text-xs font-bold">{activeTool}(...)</p>
              </div>
            </div>
          </div>
        )}

        {isLoading && !activeTool && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 rounded-tl-none shadow-sm flex space-x-1">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 bg-white border-t border-slate-100">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Try: 'Ship 100KG Hyderabad to Guntur'"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-14 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-30 transition-all shadow-lg shadow-indigo-200"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center space-x-4">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
             <CheckCircle2 size={10} className="mr-1 text-emerald-500" />
             End-to-End Encryption
           </span>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
