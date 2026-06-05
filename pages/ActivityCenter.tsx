
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActivityCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'offline' | 'online'>('all');

  const activities = [
    { id: '1', title: 'SHEEN 线下品鉴会', type: 'offline', date: '2024.11.12', location: '上海 陆家嘴旗舰店', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=600', desc: '深度体验全新RF射频技术，专业顾问一对一测肤。' },
    { id: '2', title: '双11 预售返现活动', type: 'online', date: '2024.11.01', location: '线上商城', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600', desc: '满3000立减500，前100名加赠奢宠礼包。' },
    { id: '3', title: '专家护肤研讨会', type: 'offline', date: '2024.11.20', location: '杭州 西湖体验中心', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600', desc: '特邀皮肤科教授分享秋冬抗老秘籍。' },
  ];

  const filtered = activeTab === 'all' ? activities : activities.filter(a => a.type === activeTab);

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-28">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-serif text-[#4A3E3E]">活动中心</h2>
        </div>
        <div className="flex justify-between bg-[#FAF7F2] p-1 rounded-2xl">
          {['all', 'offline', 'online'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === tab ? 'bg-white text-[#D7C4B2] shadow-sm' : 'text-[#C0B3A5]'}`}
            >
              {tab === 'all' ? '全部' : tab === 'offline' ? '线下体验' : '线上活动'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {filtered.map(act => (
          <div key={act.id} onClick={() => navigate(`/activity/${act.id}`)} className="bg-white rounded-[40px] overflow-hidden border border-[#F5EBE0]/50 shadow-sm group active:scale-[0.98] transition-all">
             <div className="h-48 relative overflow-hidden">
                <img src={act.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={act.title} />
                <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-widest ${act.type === 'offline' ? 'bg-[#4A3E3E]' : 'bg-[#D7C4B2]'}`}>
                        {act.type === 'offline' ? '线下' : '线上'}
                    </span>
                </div>
             </div>
             <div className="p-6 space-y-3">
                <h3 className="text-lg font-serif text-[#4A3E3E]">{act.title}</h3>
                <div className="flex items-center gap-4 text-[#C0B3A5] text-[10px] font-bold tracking-widest">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        {act.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        {act.location}
                    </div>
                </div>
                <p className="text-xs text-[#8B7E74] leading-relaxed line-clamp-2">{act.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCenter;
