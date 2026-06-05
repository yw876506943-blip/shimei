
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ActivityDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);

  // Mock data fetching based on ID
  const activity = {
    title: 'SHEEN 线下品鉴会',
    type: 'offline',
    date: '2024.11.12 14:00 - 17:00',
    location: '上海市 浦东新区 陆家嘴旗舰店 2F',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800',
    content: `
        尊敬的 SHEEN 会员：
        
        诚邀您参加本次“科技与美”线下品鉴会。我们将现场展示 SHEEN Pro 系列的最新固件升级，并由资深护肤专家为您讲解居家射频美容的科学闭环。
        
        活动亮点：
        1. 深度体验旗舰新品 SHEENME M1 Pro
        2. 专业 3D 皮肤镜现场深度分析
        3. 定制化居家美容方案建议
        4. 精美茶歇与会员伴手礼一份
    `
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-in fade-in duration-500">
      <div className="h-64 relative overflow-hidden">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#4A3E3E]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <img src={activity.img} className="w-full h-full object-cover" alt={activity.title} />
      </div>

      <div className="px-8 -mt-10 relative bg-white rounded-t-[48px] pt-10 space-y-8">
        <div className="space-y-4">
            <h1 className="text-2xl font-serif text-[#4A3E3E] leading-tight">{activity.title}</h1>
            <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#D7C4B2]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <div className="flex-1 pt-0.5">
                        <p className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest mb-1">活动时间</p>
                        <p className="text-xs text-[#4A3E3E] font-medium">{activity.date}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#D7C4B2]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                    <div className="flex-1 pt-0.5">
                        <p className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest mb-1">活动地点</p>
                        <p className="text-xs text-[#4A3E3E] font-medium">{activity.location}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C0B3A5] uppercase tracking-widest">活动详情</h4>
            <div className="text-sm text-[#8B7E74] leading-relaxed whitespace-pre-wrap">
                {activity.content}
            </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#F5EBE0] px-8 py-5 z-50">
        <button 
          onClick={() => setIsJoined(true)}
          disabled={isJoined}
          className={`w-full py-5 rounded-[24px] font-bold text-sm tracking-[0.3em] transition-all shadow-xl active:scale-95 ${
            isJoined ? 'bg-green-50 text-green-500' : 'bg-[#4A3E3E] text-white'
          }`}
        >
          {isJoined ? '报名成功 (已入场)' : '立即预约报名'}
        </button>
      </div>
    </div>
  );
};

export default ActivityDetail;
