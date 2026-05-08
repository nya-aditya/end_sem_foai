import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useDashboard } from '../context/DashboardContext';

const SpeedChart = () => {
  const { speedHistory } = useDashboard();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#0b0d17] border border-gray-200 dark:border-white/10 p-3 rounded-lg shadow-xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {new Date(payload[0].payload.time).toLocaleTimeString()}
          </p>
          <p className="text-sm font-black text-red-600 dark:text-red-400">
            {payload[0].value.toLocaleString()} km/h
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={speedHistory}>
          <defs>
            <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E03C31" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#E03C31" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(0,0,0,0.05)" 
            className="dark:stroke-white/5"
          />
          <XAxis 
            dataKey="time" 
            hide={true}
          />
          <YAxis 
            domain={['dataMin - 100', 'dataMax + 100']}
            orientation="right"
            tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }}
            tickFormatter={(val) => `${val.toLocaleString()}`}
            className="text-gray-400 dark:text-white/20"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="speed" 
            stroke="#E03C31" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSpeed)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(SpeedChart);
