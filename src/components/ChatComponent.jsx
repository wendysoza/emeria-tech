import React, { useState } from 'react';
import { BrainCircuit, Rocket } from 'lucide-react';
import { geminiService } from '../services/gemini';

export default function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    const q = input; 
    setInput(''); 
    setMessages(p => [...p, { r: 'user', t: q }]); 
    setLoading(true);
    
    const res = await geminiService.askQuestion(q); 
    setMessages(p => [...p, { r: 'ai', t: res }]); 
    setLoading(false);
  };

  return (
    <div className="h-full max-w-4xl mx-auto flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="bg-[#050B14] p-6 flex items-center gap-3 text-white">
        <BrainCircuit className="text-blue-500" /> <h3 className="font-bold">EMERIA AI - Tutor UNESUM</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.r === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed ${m.r === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-md' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm whitespace-pre-wrap'}`}>
              {m.t}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-blue-500 font-bold animate-pulse">Analizando la base de conocimientos...</div>}
      </div>
      <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && handleSend()} 
          placeholder="Escribe tu duda técnica..." 
          className="flex-1 bg-slate-100 rounded-xl px-5 py-3 outline-none focus:ring-2 ring-blue-500 transition-all" 
        />
        <button onClick={handleSend} className="bg-[#050B14] text-white p-3 rounded-xl hover:bg-blue-600 transition-colors">
          <Rocket className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}