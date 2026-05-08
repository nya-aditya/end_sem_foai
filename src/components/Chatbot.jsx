import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, X, Trash2, Loader2, Info } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const { issPosition, news, speedHistory, chats, setChats } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input, timestamp: Date.now() };
    setChats(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const token = import.meta.env.VITE_AI_TOKEN;
    
    // Safety check for Token
    if (!token || token.includes('your_')) {
      addAssistantMsg("[CONFIG ERROR]: Hugging Face Token missing. Check your .env file.");
      setIsTyping(false);
      return;
    }

    try {
      const currentSpeed = speedHistory.length > 0 ? speedHistory[speedHistory.length - 1].speed : 27600;
      const recentNews = news.slice(0, 3).map(n => `- ${n.title}`).join('\n');
      
      const context = `
        CONTEXT:
        - ISS Location: ${issPosition.lat.toFixed(4)}, ${issPosition.lng.toFixed(4)} (${issPosition.location})
        - Current Velocity: ${currentSpeed} km/h
        - Recent Headlines: ${recentNews}
        - Current Mode: Mission Control Dashboard Assistance
      `;

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        { 
          inputs: `<s>[INST] ${context}\nUser Question: ${input} [/INST]`,
          parameters: { max_new_tokens: 250, temperature: 0.7 }
        },
        { 
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000 
        }
      );

      if (response.data && response.data[0]?.generated_text) {
        const fullText = response.data[0].generated_text;
        const answer = fullText.split('[/INST]').pop().trim();
        addAssistantMsg(answer);
      } else if (response.data?.error?.includes('currently loading')) {
        addAssistantMsg("The Mission AI is currently initializing on orbital servers. Please wait 30 seconds and try again.");
      } else {
        throw new Error('Invalid Response');
      }
    } catch (error) {
      console.error('AI Error:', error);
      // LOCAL FALLBACK: If API fails, use dashboard data to answer
      handleLocalFallback(input);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLocalFallback = (query) => {
    const q = query.toLowerCase();
    let reply = "Mission AI is temporarily offline, but I can provide telemetry: ";
    
    if (q.includes('location') || q.includes('where')) {
      reply += `The ISS is currently over ${issPosition.location} at coordinates ${issPosition.lat.toFixed(2)}, ${issPosition.lng.toFixed(2)}.`;
    } else if (q.includes('speed') || q.includes('velocity')) {
      const speed = speedHistory.length > 0 ? speedHistory[speedHistory.length - 1].speed : 27600;
      reply += `Current orbital velocity is stabilized at ${speed.toLocaleString()} km/h.`;
    } else {
      reply = "[CONNECTION ERROR]: External AI nodes are unreachable. Telemetry remains stable.";
    }
    addAssistantMsg(reply);
  };

  const addAssistantMsg = (content) => {
    setChats(prev => [...prev, { role: 'assistant', content, timestamp: Date.now() }].slice(-30));
  };

  const clearChat = () => setChats([]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card mb-4 w-[400px] h-[550px] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight">MISSION AI</h3>
                  <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">MISTRAL-7B-V0.2</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Clear Intelligence Log">
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-[var(--bg-app)]">
              {chats.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                  <Bot className="w-12 h-12 mb-4 text-blue-600" />
                  <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                    Uplink Established.<br/>Ask about telemetry or space news.
                  </p>
                </div>
              )}
              {chats.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] rounded-tl-none'
                  }`}>
                    <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] font-bold uppercase tracking-widest">
                      {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      <span>{msg.role === 'user' ? 'Operator' : 'AI'}</span>
                    </div>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-4 rounded-2xl rounded-tl-none flex gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Processing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Input */}
            <form onSubmit={handleSend} className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-card)]">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter mission query..."
                  className="flex-1 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
                />
                <button type="submit" className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Info className="w-3 h-3" />
                Context-aware mission assistant active.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/40"
      >
        <Bot className="w-8 h-8" />
      </motion.button>
    </div>
  );
};

export default Chatbot;
