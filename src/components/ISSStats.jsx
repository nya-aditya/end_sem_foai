import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ label, value, subValue, color = "text-gray-900 dark:text-white", isOnline = true }) => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 min-h-[140px] flex flex-col justify-between bg-white dark:bg-[#0b0d17] relative overflow-hidden"
    >
      <AnimatePresence>
        {isPulsing && (
          <motion.div 
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-500/5 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div>
        <p className="text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.2em] mb-3">{label}</p>
        <motion.div 
          key={value}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl font-black tracking-tight ${color}`}
        >
          {value || "---"}
        </motion.div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          {subValue}
        </p>
        {!isOnline && (
          <span className="text-[8px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded uppercase">Predictive</span>
        )}
      </div>
    </motion.div>
  );
};

const ISSStats = () => {
  const { issPosition, issHistory, speedHistory, isIssOnline } = useDashboard();
  
  const currentSpeed = speedHistory.length > 0 
    ? speedHistory[speedHistory.length - 1].speed 
    : 27600;

  const lat = issPosition?.lat !== undefined ? issPosition.lat.toFixed(3) : "0.000";
  const lng = issPosition?.lng !== undefined ? issPosition.lng.toFixed(3) : "0.000";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Latitude / Longitude" 
        value={`${lat}, ${lng}`}
        subValue={isIssOnline ? "Live Telemetry" : "Computed Tracking"}
        isOnline={isIssOnline}
      />
      <StatCard 
        label="Orbital Velocity" 
        value={`${currentSpeed.toLocaleString()} km/h`}
        color="text-red-600 dark:text-red-500"
        subValue="Nominal"
        isOnline={isIssOnline}
      />
      <StatCard 
        label="Current Location" 
        value={issPosition?.location || "Scanning Sector..."}
        color="text-blue-600 dark:text-blue-400"
        subValue="Global Sync"
        isOnline={isIssOnline}
      />
      <StatCard 
        label="Tracking Continuity" 
        value={isIssOnline ? "Stable" : "Simulated"}
        subValue="Matrix Status"
        isOnline={isIssOnline}
      />
    </div>
  );
};

export default React.memo(ISSStats);
