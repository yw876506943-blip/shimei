import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const settingItems = [
    { label: '小程序版本', icon: '🔰', action: () => {}, extra: 'v1.0.0' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-10 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#4A3E3E] p-1 active:scale-95 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">设置</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        <div className="bg-white rounded-[32px] p-2 shadow-sm border border-[#F5EBE0]/50">
          {settingItems.map((item, index) => (
            <div 
              key={index} 
              onClick={item.action}
              className={`flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors cursor-pointer ${index !== settingItems.length - 1 ? 'border-b border-[#F5EBE0]/50' : ''} ${index === 0 ? 'rounded-t-[24px]' : ''} ${index === settingItems.length - 1 ? 'rounded-b-[24px]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-bold text-[#4A3E3E]">{item.label}</span>
              </div>
              {item.extra ? (
                  <span className="text-sm text-[#A39A92] font-medium">{item.extra}</span>
              ) : (
                  <svg className="w-4 h-4 text-[#D7C4B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
