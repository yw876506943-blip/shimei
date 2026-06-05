
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC<{ paired?: boolean }> = ({ paired }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 px-4 animate-in fade-in duration-500 pb-4">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden h-44 bg-[#E6D9CC] shadow-sm group">
        <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-cover mix-blend-multiply opacity-80" 
            alt="Skin Beauty" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-[28px] font-sans tracking-[0.05em] text-white">SHEEN Me</h2>
        </div>
      </div>

      {/* Greeting / Device Status Card */}
      {!paired ? (
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-[#F5EBE0]/50 space-y-6 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-serif text-[#4A3E3E]">Hello</h3>
            <p className="text-[#8B7E74] font-medium tracking-wide">欢迎使用SHEEN Me!</p>
          </div>
          <p className="text-sm text-[#C0B3A5]">还未添加任何设备，请添加设备</p>
          <button 
            onClick={() => navigate('/pairing')}
            className="w-full bg-[#D7C4B2] hover:bg-[#C0B3A5] text-white py-5 rounded-[24px] font-bold transition-all active:scale-95 shadow-[0_12px_24px_-10px_rgba(215,196,178,0.6)] text-lg"
          >
            添加设备
          </button>
        </div>
      ) : (
        <div className="px-2 space-y-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <h3 className="text-[22px] font-medium text-[#1A1A1A]">M1</h3>
              <p className="text-[13px] text-[#A39A92] uppercase tracking-wider">SN: C8478045E359</p>
              <p className="text-[13px] text-[#A39A92] uppercase tracking-wider">BATTERY: 80%</p>
            </div>
            <div className="text-right space-y-1.5">
              <div className="flex items-center justify-end gap-1.5 text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[13px]">蓝牙已连接</span>
              </div>
              <p className="text-[13px] text-[#A39A92]">固件号: V0.1</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/device')}
            className="w-full bg-[#DECCC0] text-[#332A26] py-3.5 rounded-xl font-bold active:scale-[0.98] transition-all text-base"
          >
            进入护理模式
          </button>
        </div>
      )}

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-4 mx-2">
        <div className="flex flex-col items-center gap-4 group transition-all pt-2 pb-4">
          <div className="relative text-[#1A1A1A] mb-1">
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="5" y="3" width="14" height="18" rx="3" />
              <path d="M12 14.5c-1.8-1.5-3-2.5-3-4a2.2 2.2 0 012-2c1 0 1.5 1 1 1s.5-1 1.5-1c1.2 0 2 1 2 2 0 1.5-1.2 2.5-3 4z" />
            </svg>
            <svg className="absolute -top-1 -left-2 w-2 h-2 text-[#A39A92]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M2 12h20"/></svg>
            <svg className="absolute top-7 -right-2 w-2.5 h-2.5 text-[#A39A92]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M2 12h20"/></svg>
          </div>
          <p className="font-bold text-[#1A1A1A] text-[15px] tracking-wide">产品教程</p>
          <button 
            onClick={() => navigate('/tutorials')}
            className="w-[120px] bg-[#DECCC0] text-[#332A26] py-2.5 rounded-[12px] text-sm font-medium hover:bg-[#D7C4B2] transition-all"
          >
            查看教程
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 group transition-all pt-2 pb-4">
          <div className="relative text-[#1A1A1A] mb-1">
             <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="5" y="3" width="14" height="18" rx="3" />
                <path d="M9.5 11.5l2 2 3-3" />
             </svg>
             <svg className="absolute -top-1 -left-2 w-2 h-2 text-[#A39A92]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M2 12h20"/></svg>
             <svg className="absolute top-7 -right-2 w-2.5 h-2.5 text-[#A39A92]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M2 12h20"/></svg>
          </div>
          <p className="font-bold text-[#1A1A1A] text-[15px] tracking-wide">打卡日志</p>
          <button 
            onClick={() => navigate('/care-logs')}
            className="w-[120px] bg-[#DECCC0] text-[#332A26] py-2.5 rounded-[12px] text-sm font-medium hover:bg-[#D7C4B2] transition-all"
          >
            打卡
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
