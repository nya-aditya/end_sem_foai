import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Sun, Moon, Satellite, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useDashboard();

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg-app)]/80 backdrop-blur-xl border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Satellite className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">MISSION CONTROL</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">v4.0.1-ALPHA</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Secure Uplink</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 mr-8">
            <a href="#iss-tracking" className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-blue-600 transition-colors">Tracking</a>
            <a href="#news-intelligence" className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-blue-600 transition-colors">Intelligence</a>
          </div>

          <button 
            onClick={toggleTheme}
            className="group relative p-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl hover:border-blue-500/50 transition-all shadow-sm"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
            >
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-blue-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
            </motion.div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
