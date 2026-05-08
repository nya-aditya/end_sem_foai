import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import ISSMap from './ISSMap';
import ISSStats from './ISSStats';
import SpeedChart from './SpeedChart';
import CrewList from './CrewList';
import { RefreshCw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ISSDashboard = () => {
  const { refreshIss, isIssOnline } = useDashboard();

  return (
    <div className="space-y-12">
      {/* ISS Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[var(--border-color)] pb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full animate-ping ${isIssOnline ? 'bg-red-600' : 'bg-amber-500'}`} />
            <div className={`absolute inset-0 w-3 h-3 rounded-full ${isIssOnline ? 'bg-red-600' : 'bg-amber-500'}`} />
          </div>
          <div>
            <p className="section-subtitle">Real-Time Telemetry</p>
            <h2 className="section-header">ISS Live Tracking</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={refreshIss}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full text-[10px] font-black uppercase tracking-widest hover:border-blue-500/50 transition-all active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh Now
          </button>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${isIssOnline ? 'bg-blue-500/10 border-blue-500/20 text-blue-600' : 'bg-amber-500/10 border-amber-500/20 text-amber-600'}`}>
            <Zap className="w-3 h-3" />
            {isIssOnline ? 'Uplink: Active' : 'Offline: Simulating'}
          </div>
        </div>
      </div>

      <ISSStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card h-[500px] overflow-hidden">
          <ISSMap />
        </div>
        
        <div className="glass-card p-8 flex flex-col">
          <div className="mb-8">
            <p className="text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.2em] mb-1">Telemetry</p>
            <h3 className="text-xl font-black tracking-tight">ISS Speed Trend</h3>
          </div>
          <div className="flex-1 min-h-[300px]">
            <SpeedChart />
          </div>
          <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest">Orbital Status</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Optimal Trajectory</span>
            </div>
          </div>
        </div>
      </div>

      <CrewList />
    </div>
  );
};

export default React.memo(ISSDashboard);
