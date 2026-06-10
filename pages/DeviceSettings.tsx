import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, Cpu, FileUp, LogOut, CheckCircle2 } from 'lucide-react';

const DeviceSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  const handleDisconnect = () => {
    localStorage.removeItem('paired');
    window.dispatchEvent(new Event('storage'));
    navigate('/', { replace: true });
  };

  const handleUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setUpgradeSuccess(true);
      setTimeout(() => setUpgradeSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-right-4 duration-500 pb-10">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#4A3E3E] active:scale-90 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">设备设置</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F5EBE0]/50 flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FAF7F2] shadow-inner border border-[#F5EBE0] p-2">
             <img src="https://images.unsplash.com/photo-1596755389378-c11dde082531?auto=format&fit=crop&q=80&w=200" alt="SHEEN M1 Pro" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-[#4A3E3E] font-serif">SHEEN M1 Pro</h3>
            <span className="inline-block mt-1 px-3 py-0.5 bg-green-50 text-green-600 text-[10px] rounded-full uppercase font-bold tracking-widest border border-green-100">已连接</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[#F5EBE0]/50 overflow-hidden text-sm">
          <div className="p-4 border-b border-[#F5EBE0]/50 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#8B7E74]">
              <Info size={18} />
              <span className="font-bold">设备序列号 (ID)</span>
            </div>
            <span className="text-[#4A3E3E] font-mono">S1P98230001X</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#8B7E74]">
              <Cpu size={18} />
              <span className="font-bold">固件版本</span>
            </div>
            <span className="text-[#4A3E3E] font-mono">v1.2.4</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[#F5EBE0]/50 overflow-hidden text-sm mt-4">
            <button 
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="w-full p-4 flex items-center justify-between active:bg-[#FAF7F2] transition-colors disabled:opacity-50"
            >
                <div className="flex items-center gap-3 text-[#4A3E3E]">
                    <FileUp size={18} />
                    <span className="font-bold">固件升级</span>
                </div>
                <div className="flex items-center gap-2">
                    {isUpgrading ? (
                        <span className="text-xs text-[#C0B3A5] font-bold animate-pulse">升级中...</span>
                    ) : upgradeSuccess ? (
                        <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 size={14} />
                            <span className="text-xs font-bold">已是最新</span>
                        </div>
                    ) : (
                        <>
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            <span className="text-xs text-red-500 font-bold tracking-widest uppercase">New v1.3.0</span>
                        </>
                    )}
                </div>
            </button>
        </div>

        <div className="pt-8">
            <button 
                onClick={handleDisconnect}
                className="w-full p-4 bg-white border border-red-100 rounded-3xl flex items-center justify-center gap-2 text-red-500 font-bold active:scale-95 transition-all shadow-sm"
            >
                <LogOut size={18} />
                解绑并断开连接
            </button>
            <p className="text-center mt-4 text-[10px] text-[#C0B3A5]">解除绑定后，其他用户将可以搜索到并连接此设备</p>
        </div>

      </div>
    </div>
  );
};

export default DeviceSettings;
