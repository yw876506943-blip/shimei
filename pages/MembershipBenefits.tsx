
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MembershipBenefits: React.FC = () => {
  const navigate = useNavigate();
  
  const benefits = [
    { title: '专属顾问', desc: '1对1美容仪器使用指导', icon: '👤' },
    { title: '新品优先', desc: '新款美容仪提前试用资格', icon: '🚀' },
    { title: '生日礼包', desc: '生日当月专享超值礼盒', icon: '🎂' },
    { title: '延保服务', desc: '尊享额外12个月官方联保', icon: '🛡️' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-10 animate-in fade-in duration-500">
      <div className="bg-[#4A3E3E] px-8 pt-12 pb-20 relative overflow-hidden">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 z-10 text-white/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="relative z-10 space-y-4">
            <h2 className="text-3xl font-serif text-white">SHEEN Membership</h2>
            <p className="text-xs text-white/50 tracking-widest uppercase">尊享 SHEEN Me 智慧美学服务</p>
            <div className="flex items-center gap-2 mt-8">
                <span className="text-5xl font-serif text-[#D7C4B2]">V3</span>
                <div className="h-6 w-[1px] bg-white/20 mx-2"></div>
                <div className="text-left">
                    <p className="text-[10px] text-white/80 font-bold tracking-widest">DIAMOND MEMBER</p>
                    <p className="text-[8px] text-white/40 font-medium">EXP: 2025.10.30</p>
                </div>
            </div>
        </div>
        <div className="absolute top-[-10%] right-[-20%] w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="px-8 -mt-10 relative z-20 space-y-6">
        <div className="bg-white rounded-[48px] p-8 shadow-2xl border border-[#F5EBE0]/50 space-y-8">
            <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#4A3E3E] tracking-widest">会员权益</h4>
                <p className="text-[10px] text-[#C0B3A5] font-bold uppercase">Membership Privileges</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                        <div className="w-14 h-14 bg-[#FAF7F2] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {b.icon}
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-bold text-[#4A3E3E]">{b.title}</p>
                            <p className="text-[10px] text-[#C0B3A5] font-medium tracking-tight uppercase">{b.desc}</p>
                        </div>
                        <div className="text-[#D7C4B2]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipBenefits;
