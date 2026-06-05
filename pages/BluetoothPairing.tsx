
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bluetooth, ChevronLeft, Loader2, Check } from 'lucide-react';

const mockDevices = [
  {
    id: 'SH-M1-PRO',
    name: 'SHEEN M1 Pro',
    sn: 'SN: S1P98230001X',
    image: 'https://images.unsplash.com/photo-1596755389378-c11dde082531?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'SH-BASIC',
    name: 'SHEEN Basic',
    sn: 'SN: S1B88210342Z',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=200'
  }
];

const BluetoothPairing: React.FC = () => {
  const [step, setStep] = useState<'scanning' | 'connecting' | 'success'>('scanning');
  const [discoveredDevices, setDiscoveredDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 'scanning') {
      const timer = setTimeout(() => {
        setDiscoveredDevices(mockDevices);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleConnect = (device: any) => {
    setSelectedDevice(device);
    setStep('connecting');
    setTimeout(() => {
      setStep('success');
      localStorage.setItem('paired', 'true');
      window.dispatchEvent(new Event('storage'));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in fade-in duration-500 pb-10">
      <div className="px-5 pt-3 pb-4 sticky top-0 z-10 flex items-center">
        <button onClick={() => navigate(-1)} className="text-[#1A1A1A] p-2 -ml-2">
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center min-h-[60vh]">
        {step === 'scanning' && (
          <div className="flex flex-col items-center w-full mt-4 slide-in-from-bottom-4 animate-in duration-500">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-[22px] text-[#1A1A1A] font-medium tracking-wide">
                {discoveredDevices.length === 0 ? "正在寻找设备" : `已发现 ${discoveredDevices.length} 个设备`}
              </h2>
              <p className="text-[14px] text-[#A39A92] tracking-wide">请确保您的 SHEEN 美容仪已开启蓝牙并靠近手机</p>
            </div>

            <div className="relative w-32 h-32 flex items-center justify-center mb-16 mt-4">
              <div className="absolute inset-0 border border-[#DECCC0] opacity-40 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute inset-0 scale-[1.3] border border-[#DECCC0] opacity-20 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:0.8s]"></div>
              <div className="absolute inset-0 scale-[1.6] border border-[#DECCC0] opacity-10 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:1.6s]"></div>
              
              <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center shadow-sm relative z-10 text-[#CBBAB0]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 6.5l11 11M6.5 17.5l11-11M12 3v18M12 3l5 5-5 5M12 21l5-5-5-5"/>
                </svg>
              </div>
            </div>

            {discoveredDevices.length > 0 && (
              <div className="w-full space-y-4 px-1 mt-4">
                {discoveredDevices.map(device => (
                  <div 
                    key={device.id} 
                    className="bg-white px-4 py-4 rounded-2xl shadow-sm flex items-center gap-4 outline-none"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 p-0.5">
                      <img src={device.image} alt={device.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#1A1A1A] text-base">{device.name}</h3>
                      <p className="text-[13px] text-[#A39A92] mt-0.5 uppercase tracking-wide">{device.sn}</p>
                    </div>
                    <button 
                      onClick={() => handleConnect(device)}
                      className="px-5 py-2.5 rounded-full bg-[#DECCC0] text-[#332A26] font-medium text-[15px] active:scale-95 transition-transform"
                    >
                      连接
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 'connecting' && (
          <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in duration-300 w-full mt-10">
             <div className="relative">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden bg-white shrink-0 shadow-sm p-1.5 relative z-10">
                    <img src={selectedDevice?.image} alt={selectedDevice?.name} className="w-full h-full object-cover rounded-[2rem]" />
                </div>
                <div className="absolute inset-0 border-4 border-[#CBBAB0] rounded-[2.5rem] animate-[spin_3s_linear_infinite] border-t-transparent border-l-transparent opacity-60 z-0 scale-[1.12]"></div>
             </div>
             <div className="text-center space-y-2">
                 <h3 className="text-xl font-medium text-[#1A1A1A]">{selectedDevice?.name}</h3>
                 <div className="flex items-center justify-center gap-2 text-[#A39A92]">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-[13px] font-medium tracking-widest uppercase">Connecting...</span>
                 </div>
             </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center space-y-8 animate-in zoom-in-95 duration-500 w-full mt-12">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
               <Check className="w-12 h-12 text-emerald-500" strokeWidth={2} />
            </div>
            <div className="text-center space-y-3 mb-8">
              <h2 className="text-[22px] text-[#1A1A1A] font-medium">连接成功</h2>
              <p className="text-[14px] text-[#A39A92]">已成功为您绑定 {selectedDevice?.name}</p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-[#DECCC0] text-[#332A26] py-3.5 rounded-xl font-medium text-[16px] active:scale-[0.98] transition-all max-w-[280px]"
            >
              完成并返回
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BluetoothPairing;
