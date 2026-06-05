
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tutorials: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const tutorials = [
    { id: '1', title: 'SHEENME M1 Pro 入门', category: 'beginner', type: '视频教程', duration: '3:45', img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=400' },
    { id: '2', title: 'EMS 提拉正确手法', category: 'advanced', type: '图文指南', duration: '5min 阅读', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400' },
    { id: '3', title: '晚间 15 分钟全效护理', category: 'beginner', type: '视频教程', duration: '15:20', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=400' },
    { id: '4', title: '射频模式使用技巧', category: 'advanced', type: '图文指南', duration: '3min 阅读', img: 'https://images.unsplash.com/photo-1615397323145-21d3e8e1694f?auto=format&fit=crop&q=80&w=400' },
  ];

  const filteredTutorials = activeTab === 'all' 
    ? tutorials 
    : tutorials.filter(t => t.category === activeTab);

  return (
    <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 bg-[#FAF7F2] min-h-screen">
      <div className="bg-white px-6 pt-2 pb-2 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4 mb-4">
          <button 
            type="button"
            onClick={() => navigate('/')} 
            className="text-[#4A3E3E] p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"
            aria-label="返回首页"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">产品教程</h2>
        </div>
        
        <div className="flex justify-between bg-[#FAF7F2] p-1 rounded-2xl mb-2">
            {[
              { id: 'all', label: '全部' },
              { id: 'beginner', label: '新手入门' },
              { id: 'advanced', label: '进阶教程' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === tab.id ? 'bg-[#D7C4B2] text-white shadow-sm' : 'text-[#8B7E74]'}`}
              >
                {tab.label}
              </button>
            ))}
        </div>
      </div>

      <div className="px-6 py-4 space-y-6 pb-20">
        <p className="text-[10px] text-[#C0B3A5] uppercase tracking-[0.3em] font-bold">Master Your Glow</p>
        
        <div className="space-y-6">
          {filteredTutorials.map((t) => (
            <div 
              key={t.id} 
              onClick={() => navigate(`/tutorial/${t.id}`)}
              className="group bg-white rounded-[40px] overflow-hidden border border-[#F5EBE0]/50 shadow-sm hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="h-48 relative overflow-hidden">
                  <img src={t.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t.title} />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                          {t.type.includes('视频') ? (
                              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          ) : (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                          )}
                      </div>
                  </div>
                  <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#4A3E3E]">
                      {t.type}
                  </div>
              </div>
              <div className="p-6 flex justify-between items-center">
                  <div className="space-y-1">
                      <h3 className="font-bold text-[#4A3E3E]">{t.title}</h3>
                      <p className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest">{t.duration}</p>
                  </div>
                  <button className="text-[#D7C4B2]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
