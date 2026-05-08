import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useDashboard } from '../context/DashboardContext';

const COLORS = ['#2563eb', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const NewsDistributionChart = ({ onFilter }) => {
  const { news, theme } = useDashboard();

  const data = useMemo(() => {
    const counts = {};
    news.forEach(article => {
      counts[article.news_site] = (counts[article.news_site] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [news]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#0b0d17] border border-gray-200 dark:border-white/10 p-3 rounded-lg shadow-xl">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            {payload[0].name}
          </p>
          <p className="text-sm font-black text-blue-600 dark:text-blue-400">
            {payload[0].value} Articles
          </p>
        </div>
      );
    }
    return null;
  };

  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            onClick={(entry) => onFilter(entry.name)}
            className="cursor-pointer"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            content={({ payload }) => (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {payload.map((entry, index) => (
                  <button
                    key={`item-${index}`}
                    onClick={() => onFilter(entry.value)}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-[10px] font-black text-gray-400 dark:text-white/40 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                      {entry.value}
                    </span>
                  </button>
                ))}
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(NewsDistributionChart);
