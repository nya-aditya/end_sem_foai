import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Users, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const CrewList = () => {
  const { astronauts } = useDashboard();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 bg-white dark:bg-[#0b0d17]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-gray-100 dark:border-white/5 pb-8">
        <div>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">Personnel Tracking</h3>
          <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Crew Manifest</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-2.5 bg-gray-50 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {astronauts.length} People in Space
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {astronauts.length > 0 ? (
          astronauts.map((person, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl flex flex-col items-center text-center group hover:border-blue-600/30 transition-all cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">{person.name.charAt(0)}</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{person.name}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{person.craft}</p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">
            Scanning orbital sectors for personnel...
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center gap-4 p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <p className="text-xs font-bold text-blue-600/60 dark:text-blue-400/60 leading-relaxed uppercase tracking-widest">
          Verified manifest data synchronized via Open-Notify Intelligence Network.
        </p>
      </div>
    </motion.div>
  );
};

export default React.memo(CrewList);
