import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { ExternalLink, Search, RefreshCcw, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsDistributionChart from './NewsDistributionChart';

const NewsCard = React.forwardRef(({ article }, ref) => (
  <div 
    ref={ref}
    className="glass-card flex flex-col h-full group overflow-hidden"
  >
    <div className="relative h-56 overflow-hidden">
      <motion.img 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        src={article.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'} 
        alt={article.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
          {article.news_site}
        </span>
      </div>
    </div>
    
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest">
        <span>{new Date(article.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      <h3 className="text-xl font-black tracking-tight mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h3>
      
      <p className="text-sm font-medium text-gray-600 dark:text-white/40 line-clamp-3 mb-8 flex-1 leading-relaxed">
        {article.summary}
      </p>
      
      <button 
        onClick={() => window.open(article.url, '_blank')}
        className="btn-primary w-full justify-center"
      >
        Explore Intelligence
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  </div>
));

NewsCard.displayName = 'NewsCard';

const NewsDashboard = () => {
  const { news, loadingNews, newsSearch, setNewsSearch, refreshNews } = useDashboard();
  const [filterBySite, setFilterBySite] = React.useState(null);

  const filteredNews = React.useMemo(() => {
    let result = news;
    if (newsSearch) {
      result = result.filter(n => n.title.toLowerCase().includes(newsSearch.toLowerCase()) || n.summary.toLowerCase().includes(newsSearch.toLowerCase()));
    }
    if (filterBySite) {
      result = result.filter(n => n.news_site === filterBySite);
    }
    return result;
  }, [news, newsSearch, filterBySite]);

  return (
    <section id="news-intelligence" className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[var(--border-color)] pb-8">
        <div>
          <p className="section-subtitle">Global Matrix</p>
          <h2 className="section-header">Breaking News</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search intelligence..."
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 transition-all w-full md:w-64 shadow-sm"
            />
          </div>
          <button 
            onClick={refreshNews}
            className="p-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl hover:border-blue-500 transition-all shadow-sm"
            title="Refresh News"
          >
            <RefreshCcw className={`w-4 h-4 ${loadingNews ? 'animate-spin' : ''}`} />
          </button>
          
          {filterBySite && (
            <button 
              onClick={() => setFilterBySite(null)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
            >
              <Filter className="w-3 h-3" />
              {filterBySite}
              <X className="w-3 h-3 ml-1" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-5">
          <motion.div 
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="w-full h-[1px] bg-blue-600"
          />
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {loadingNews ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass-card h-[500px] animate-pulse opacity-50" />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </AnimatePresence>
          )}
          {filteredNews.length === 0 && !loadingNews && (
            <div className="col-span-full py-20 text-center glass-card">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No matching intelligence found in current sector.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card p-8 sticky top-24">
            <div className="mb-8">
              <p className="text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.2em] mb-1">Analytics</p>
              <h3 className="text-xl font-black tracking-tight">News Distribution</h3>
            </div>
            <div className="h-[300px]">
              <NewsDistributionChart onFilter={setFilterBySite} />
            </div>
            
            {filterBySite && (
              <button 
                onClick={() => setFilterBySite(null)}
                className="w-full mt-8 py-3 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all"
              >
                Clear Filter: {filterBySite}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(NewsDashboard);
