import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [version, setVersion] = useState('');

  const menuItems = [
    { label: '设置', icon: '⚙️', action: () => navigate('/settings'), extra: '' },
    { label: '隐私政策', icon: '🔒', action: () => {} },
    { label: '帐户安全', icon: '🛡️', action: () => {} },
    { label: '用户协议', icon: '📝', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="bg-white px-5 pt-3 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#1A1A1A] p-2 -ml-2 active:scale-90 transition-transform">
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>
          <h2 className="text-[18px] font-medium text-[#1A1A1A] tracking-wider">关于</h2>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {menuItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={item.action}
              className={`w-full flex items-center justify-between p-5 hover:bg-[#FAF7F2] transition-colors active:bg-[#FAF7F2] ${idx !== menuItems.length - 1 ? 'border-b border-[#F5EBE0]/30' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl">{item.icon}</span>
                <span className="text-[15px] font-medium text-[#1A1A1A]">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.extra ? (
                  <span className="text-[13px] text-[#A39A92]">{item.extra}</span>
                ) : (
                  <svg className="w-5 h-5 text-[#A39A92]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"/></svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
