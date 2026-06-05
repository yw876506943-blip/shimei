
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('王小美');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200');
  const [age, setAge] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedAvatar = localStorage.getItem('userAvatar');
    const savedAge = localStorage.getItem('userAge');
    const savedGender = localStorage.getItem('userGender');
    
    if (savedName) setUserName(savedName);
    if (savedAvatar) setAvatar(savedAvatar);
    if (savedAge) setAge(savedAge);
    if (savedGender) setGender(savedGender);
  }, []);
  
  const menuItems = [
    { label: '我的订单', icon: '📦', desc: '订单跟踪与管理', action: () => navigate('/orders') },
    { label: '收货地址', icon: '📍', desc: '管理配送地址', action: () => navigate('/address') },
    { label: '肌肤档案', icon: '👤', desc: '历史测肤报告存档', action: () => navigate('/skin-archive') },
    { label: '产品验真', icon: '🔍', desc: '防伪查询与联保', action: () => navigate('/auth') },
    { label: '意见反馈', icon: '✍️', desc: '告诉我们您的建议', action: () => navigate('/feedback') },
    { label: '联系客服', icon: '💬', desc: '专业顾问在线咨询', action: () => alert('正在连接人工客服...') },
    { label: '设置', icon: '⚙️', desc: '系统设置与安全', action: () => navigate('/settings') },
  ];

  return (
    <div className="px-6 space-y-6 animate-in fade-in duration-500 pb-10">
      <section 
        onClick={() => navigate('/edit-profile')}
        className="flex flex-col items-center gap-4 py-8 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 ring-2 ring-[#F5EBE0]">
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif text-[#4A3E3E]">{userName}</h2>
            <div className="flex items-center gap-2 justify-center">
                <span className="text-xs text-[#C0B3A5] font-medium tracking-widest uppercase">Diamond Member</span>
                <span className="w-1 h-1 rounded-full bg-[#D7C4B2]"></span>
                <span className="text-[10px] text-[#D7C4B2] font-bold">V3</span>
            </div>
            {(age || gender) && (
              <div className="flex items-center gap-2 justify-center mt-1">
                {gender && (
                  <span className="px-3 py-1 bg-[#FAF7F2] text-[#8B7E74] text-[10px] rounded-full font-bold border border-[#F5EBE0]">
                    {gender === 'female' ? '女士' : '先生'}
                  </span>
                )}
                {age && (
                  <span className="px-3 py-1 bg-[#FAF7F2] text-[#8B7E74] text-[10px] rounded-full font-bold border border-[#F5EBE0]">
                    {age}岁
                  </span>
                )}
              </div>
            )}
        </div>
      </section>

      <div className="bg-white rounded-[40px] overflow-hidden border border-[#F5EBE0] shadow-sm">
        {menuItems.map((item, idx) => (
          <button 
            key={idx} 
            onClick={item.action}
            className={`w-full flex items-center justify-between p-6 hover:bg-[#FAF7F2] transition-colors active:bg-[#FAF7F2] ${idx !== menuItems.length - 1 ? 'border-b border-[#F5EBE0]/30' : ''}`}
          >
            <div className="flex items-center gap-5">
              <span className="text-xl">{item.icon}</span>
              <div className="text-left space-y-0.5">
                <p className="text-sm font-bold text-[#4A3E3E]">{item.label}</p>
                <p className="text-[10px] text-[#C0B3A5] font-medium uppercase tracking-tighter">{item.desc}</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-[#F5EBE0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        ))}
      </div>

      <div className="bg-[#D7C4B2] rounded-[40px] p-8 text-white relative overflow-hidden shadow-lg shadow-[#D7C4B2]/20">
        <div className="relative z-10 space-y-2">
            <h4 className="font-serif text-lg">会员权益概览</h4>
            <p className="text-xs text-white/80 leading-relaxed">您已加入 SHEEN 尊享计划，多项特权已生效。</p>
            <button 
                onClick={() => navigate('/membership')}
                className="mt-4 px-8 py-3 bg-white text-[#D7C4B2] text-xs font-bold rounded-2xl shadow-sm active:scale-95 transition-all uppercase tracking-widest"
            >
                查看特权
            </button>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="text-center py-8">
        <p className="text-[10px] text-[#C0B3A5] uppercase tracking-[0.3em] font-bold">SHEEN Me Intelligence</p>
      </div>
    </div>
  );
};

export default Profile;
