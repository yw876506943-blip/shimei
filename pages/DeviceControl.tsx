
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeviceMode } from '../types';
import { Settings } from 'lucide-react';

const FaceIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M24 6C18 6 15 10 15 14C15 22 15 26 15 26C15 34 20 40 24 40C28 40 33 34 33 26C33 26 33 22 33 14C33 10 30 6 24 6Z" />
    <path d="M12 24C10 24 9 26 9 28C9 30 11 31 12 31M36 24C38 24 39 26 39 28C39 30 37 31 36 31" />
    <path d="M18 25Q20 23 22 25M26 25Q28 23 30 25" />
    <path d="M22 33Q24 35 26 33" />
    <path d="M11 38L18 31M18 31L14 31M18 31L18 35" strokeWidth="2.5" />
    <path d="M37 38L30 31M30 31L34 31M30 31L30 35" strokeWidth="2.5" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M4 26C4 26 14 14 24 14C34 14 44 26 44 26C44 26 34 38 24 38C14 38 4 26 4 26Z" />
    <circle cx="24" cy="26" r="6" />
    <path d="M24 14V6M12 18L7 10M36 18L43 10" />
  </svg>
);

const InfusionIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M24 18C24 18 20 12 24 6C28 12 24 18 24 18Z" />
    <path d="M14 15C14 15 11 10 14 6C17 10 14 15 14 15Z" />
    <path d="M34 15C34 15 31 10 34 6C37 10 34 15 34 15Z" />
    <path d="M14 24L14 18M14 24L11 21M14 24L17 21" />
    <path d="M34 24L34 18M34 24L31 21M34 24L37 21" />
    <path d="M4 28Q10 24 16 28T28 28T40 28T44 26" />
    <path d="M4 34Q10 30 16 34T28 34T40 34T44 32" strokeWidth="3" />
    <circle cx="12" cy="42" r="2" />
    <circle cx="20" cy="40" r="3" />
    <circle cx="28" cy="44" r="1.5" />
    <circle cx="36" cy="41" r="2.5" />
  </svg>
);

const LiftingIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 12C12 12 7 20 7 22C7 24 12 24 12 24C12 24 16 26 12 28C8 30 14 36 14 36C14 36 12 40 18 42C24 44 32 40 32 40C32 40 40 36 40 28C40 20 38 18 38 18" />
    <path d="M12 28C14 28 16 25 15 24" />
    <path d="M38 28C41 28 42 24 40 22" />
    <path d="M22 36C28 36 34 31 38 27" strokeWidth="2.5" />
    <path d="M38 27L33 27M38 27L37 32" strokeWidth="2.5" />
  </svg>
);

const DeviceControl: React.FC = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<DeviceMode>(DeviceMode.FACE);
  const [gear, setGear] = useState(1);
  
  // Auto mode state (replaces isFiring for continuous operations)
  const [autoMode, setAutoMode] = useState(false);
  
  // Specific timing states
  const [shotsRemaining, setShotsRemaining] = useState(600);
  const [timerRemaining, setTimerRemaining] = useState(300); // 5 minutes in seconds

  const longPressTimer = useRef<any>(null);
  const isLongPress = useRef(false);

  // Video placeholder map (using a sample video for demo purposes)
  const modeVideos: Record<DeviceMode, { url: string, poster: string }> = {
    [DeviceMode.FACE]: {
        url: "https://videos.pexels.com/video-files/4238804/4238804-sd_640_360_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800"
    },
    [DeviceMode.EYE]: {
        url: "https://videos.pexels.com/video-files/4238804/4238804-sd_640_360_25fps.mp4", // Using same sample for reliability
        poster: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
    },
    [DeviceMode.INFUSION]: {
        url: "https://videos.pexels.com/video-files/4238804/4238804-sd_640_360_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800"
    },
    [DeviceMode.LIFTING]: {
        url: "https://videos.pexels.com/video-files/4238804/4238804-sd_640_360_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=800"
    }
  };
  
  // Reset state when mode changes
  useEffect(() => {
    setShotsRemaining(600);
    setTimerRemaining(300);
    setAutoMode(false);
  }, [activeMode]);

  // Handle Auto Mode Logic (Timer countdown or Shot decrement)
  useEffect(() => {
    let interval: any = null;
    const isShotMode = activeMode === DeviceMode.FACE || activeMode === DeviceMode.EYE;
    const isTimerMode = activeMode === DeviceMode.INFUSION || activeMode === DeviceMode.LIFTING;

    if (autoMode) {
      if (isShotMode && shotsRemaining > 0) {
        // Auto shots: 2 per second
        interval = setInterval(() => {
          setShotsRemaining(prev => {
            if (prev <= 1) {
              setAutoMode(false);
              return 0;
            }
            return prev - 1;
          });
        }, 500);
      } else if (isTimerMode && timerRemaining > 0) {
        // Timer countdown
        interval = setInterval(() => {
          setTimerRemaining((prev) => {
            if (prev <= 1) {
              setAutoMode(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else if ((isShotMode && shotsRemaining === 0) || (isTimerMode && timerRemaining === 0)) {
        setAutoMode(false);
      }
    }
    
    return () => clearInterval(interval);
  }, [autoMode, activeMode, shotsRemaining, timerRemaining]);

  const handlePressStart = () => {
    const isShotMode = activeMode === DeviceMode.FACE || activeMode === DeviceMode.EYE;

    if (isShotMode) {
      if (autoMode) return; // Already in auto, waiting for release/click to stop
      
      isLongPress.current = false;
      longPressTimer.current = setTimeout(() => {
        isLongPress.current = true;
        setAutoMode(true);
      }, 1000); // 1s long press to trigger auto
    }
  };

  const handlePressEnd = () => {
    const isShotMode = activeMode === DeviceMode.FACE || activeMode === DeviceMode.EYE;
    const isTimerMode = activeMode === DeviceMode.INFUSION || activeMode === DeviceMode.LIFTING;

    if (isShotMode) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      if (autoMode) {
        // If in auto mode
        if (!isLongPress.current) {
           // Short press (click) while in auto -> Stop
           setAutoMode(false);
        }
        // If isLongPress was true, we just entered auto, so stay in auto
      } else {
        // Not in auto, check if it was a short press
        if (!isLongPress.current) {
          setShotsRemaining(prev => Math.max(0, prev - 1));
        }
      }
      isLongPress.current = false;
    } else if (isTimerMode) {
      // Toggle start/stop for timer modes
      setAutoMode(!autoMode);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const modes = [
    { id: DeviceMode.FACE, name: 'FACE', icon: <FaceIcon />, type: 'shots' },
    { id: DeviceMode.EYE, name: 'EYE', icon: <EyeIcon />, type: 'shots' },
    { id: DeviceMode.INFUSION, name: 'MOIST', icon: <InfusionIcon />, type: 'timer' },
    { id: DeviceMode.LIFTING, name: 'LIFT', icon: <LiftingIcon />, type: 'timer' },
  ];

  const currentModeInfo = modes.find(m => m.id === activeMode);

  const getButtonText = () => {
    const isShotMode = activeMode === DeviceMode.FACE || activeMode === DeviceMode.EYE;
    
    if (isShotMode) {
        return '请用设备操作';
    } else {
        return autoMode ? '暂停护理' : '开始护理';
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 pb-20 min-h-screen bg-[#FAF7F2]">
      {/* Sticky Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 pt-2 pb-4 shadow-sm sticky top-0 z-20 border-b border-[#F5EBE0]/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-[#4A3E3E] p-1 active:scale-90 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <h2 className="text-xl font-serif text-[#4A3E3E]">设备控制</h2>
          </div>
          <button onClick={() => navigate('/device-settings')} className="text-[#4A3E3E] p-1 active:scale-90 transition-transform">
              <Settings size={22} className="text-[#C0B3A5]" />
          </button>
        </div>
      </div>

      <div className="px-6 py-4 space-y-5">
        {/* Guide Video Section - Aspect Ratio 16:9 */}
        <div className="w-full aspect-video rounded-[32px] overflow-hidden shadow-sm border border-[#F5EBE0] bg-black relative group z-0">
            <video
                key={activeMode} // force reload on mode change
                src={modeVideos[activeMode].url}
                poster={modeVideos[activeMode].poster}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                loop
                muted
                playsInline
                autoPlay
            />
            <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <p className="text-[10px] text-white font-bold tracking-widest uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    操作指引
                </p>
            </div>
        </div>

        {/* Unified Control Panel */}
        <div className={`bg-white rounded-[40px] p-5 shadow-sm border border-[#F5EBE0] transition-all duration-700 space-y-5`}>
            
            {/* 1. Mode Selector Row */}
            <div className="flex justify-between items-center px-1">
                {modes.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setActiveMode(m.id)}
                        className={`flex flex-col items-center gap-2 group transition-all`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 ${
                            activeMode === m.id
                            ? 'bg-[#D7C4B2] text-white shadow-md scale-110' 
                            : 'bg-[#FAF7F2] text-[#C0B3A5] group-active:scale-95'
                        }`}>
                            {m.icon}
                        </div>
                        <span className={`text-[10px] font-bold transition-colors ${activeMode === m.id ? 'text-[#4A3E3E]' : 'text-[#C0B3A5]'}`}>
                            {m.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* 2. Status Display */}
            <div className="flex flex-col items-center justify-center py-4 border-t border-b border-[#F5EBE0]/60 relative">
                <div className="text-center space-y-1">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <h3 className="text-4xl font-serif text-[#4A3E3E] tabular-nums leading-none tracking-tight">
                        {currentModeInfo?.type === 'shots' ? shotsRemaining : formatTime(timerRemaining)}
                    </h3>
                    {currentModeInfo?.type === 'shots' && (
                        <span className="text-xs text-[#D7C4B2] font-bold uppercase">发</span>
                    )}
                  </div>
                </div>
            </div>

            {/* 3. Gear Selector */}
            <div className="space-y-3">
                 <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-bold text-[#C0B3A5] tracking-widest">档位</span>
                    <span className="text-sm font-bold text-[#D7C4B2] font-serif">{gear}</span>
                </div>
                <div className="flex justify-between gap-2 h-10 relative">
                    {/* Background track/bars */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between gap-2 h-2 w-full">
                         {[1, 2, 3, 4].map((g) => (
                            <div key={g} className={`flex-1 rounded-full transition-colors duration-300 ${g <= gear ? 'bg-[#D7C4B2]' : 'bg-[#F5EBE0]'}`}></div>
                        ))}
                    </div>
                    
                    {/* Invisible Click targets */}
                    {[1, 2, 3, 4].map((g) => (
                        <button
                            key={g}
                            onClick={() => setGear(g)}
                            className="flex-1 h-full z-10"
                        ></button>
                    ))}
                </div>
            </div>
        </div>

        {/* Master Controls */}
        <div className="flex gap-4 items-stretch h-16 pt-2">
          
          <button 
            disabled={(currentModeInfo?.type === 'shots') || (timerRemaining <= 0)}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onMouseLeave={handlePressEnd}
            className={`flex-1 rounded-[24px] font-bold text-base transition-all shadow-xl active:scale-[0.98] disabled:opacity-40 relative overflow-hidden ${
              autoMode
              ? 'bg-gradient-to-r from-[#D7C4B2] to-[#C0B3A5] text-white shadow-[#D7C4B2]/40' 
              : 'bg-[#4A3E3E] text-white shadow-gray-300'
            }`}
          >
             {autoMode && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
             )}
             <span className="relative z-10">{getButtonText()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceControl;
