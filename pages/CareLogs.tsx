
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Activity, Zap, Droplets, ArrowUpCircle } from 'lucide-react';

// Mock data generator for logs
const generateMockData = () => {
    const data: Record<string, { mode: string; label: string; count: number; time: number; icon: React.ReactNode; color: string }[]> = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        // Randomly generate some data for past days
        if (Math.random() > 0.3) {
            data[dateString] = [
                { mode: 'FACE', label: '面部护理', count: Math.floor(Math.random() * 2), time: Math.floor(Math.random() * 15), icon: <Activity size={16} />, color: 'bg-blue-50 text-blue-500 border-blue-100' },
                { mode: 'EYE', label: '眼部护理', count: Math.floor(Math.random() * 2), time: Math.floor(Math.random() * 10), icon: <Droplets size={16} />, color: 'bg-purple-50 text-purple-500 border-purple-100' },
                { mode: 'LIFTING', label: 'EMS提拉', count: Math.floor(Math.random() * 3), time: Math.floor(Math.random() * 20), icon: <Zap size={16} />, color: 'bg-amber-50 text-amber-500 border-amber-100' },
                { mode: 'INFUSION', label: '导入渗透', count: Math.floor(Math.random() * 2), time: Math.floor(Math.random() * 15), icon: <ArrowUpCircle size={16} />, color: 'bg-green-50 text-green-500 border-green-100' },
            ].filter(item => item.count > 0);
        }
    }
    return data;
};

const mockData = generateMockData();

const CareLogs: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  // Adjust so Monday is first day of week (0-6)
  const startingDay = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];
  for (let i = 0; i < startingDay; i++) {
      days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const selectedDayData = mockData[selectedDateStr] || [];

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#4A3E3E] p-1 active:scale-90 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">打卡日志</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F5EBE0]/50">
              <div className="flex justify-between items-center mb-6">
                  <button onClick={handlePrevMonth} className="p-2 text-[#C0B3A5] active:scale-90 transition-transform">
                      <ChevronLeft size={20} />
                  </button>
                  <span className="font-serif text-[#4A3E3E] font-bold">
                      {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
                  </span>
                  <button onClick={handleNextMonth} className="p-2 text-[#C0B3A5] active:scale-90 transition-transform">
                      <ChevronRight size={20} />
                  </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                  {['一', '二', '三', '四', '五', '六', '日'].map(day => (
                      <div key={day} className="text-[10px] font-bold text-[#C0B3A5] py-2">{day}</div>
                  ))}
                  {days.map((date, index) => {
                      if (!date) return <div key={`empty-${index}`} />;
                      
                      const dateStr = date.toISOString().split('T')[0];
                      const hasData = mockData[dateStr] && mockData[dateStr].length > 0;
                      const isSelected = selectedDateStr === dateStr;
                      const isToday = new Date().toISOString().split('T')[0] === dateStr;

                      return (
                          <div 
                              key={dateStr}
                              onClick={() => setSelectedDate(date)}
                              className="aspect-square flex items-center justify-center p-1 cursor-pointer"
                          >
                              <div className={`w-full h-full flex items-center justify-center rounded-full text-sm transition-all duration-300 relative
                                  ${isSelected ? 'bg-[#4A3E3E] text-white shadow-md' : 'text-[#8B7E74] hover:bg-[#FAF7F2]'}
                                  ${isToday && !isSelected ? 'border border-[#D7C4B2] text-[#D7C4B2] font-bold' : ''}
                              `}>
                                  {date.getDate()}
                                  {hasData && !isSelected && (
                                      <span className="absolute bottom-1 w-1 h-1 bg-[#D7C4B2] rounded-full"></span>
                                  )}
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>

          <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-serif text-[#4A3E3E]">
                        {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 记录
                    </h3>
                    <span className="text-[10px] bg-[#E8DCC8]/30 text-[#8B7E74] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Daily log</span>
              </div>
              
              {selectedDayData.length === 0 ? (
                  <div className="bg-white rounded-[32px] p-8 text-center border border-[#F5EBE0]/50 shadow-sm">
                      <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity size={24} className="text-[#D7C4B2]/50" />
                      </div>
                      <p className="text-sm text-[#8B7E74]">这一天没有护理记录</p>
                  </div>
              ) : (
                  <div className="grid grid-cols-2 gap-4">
                      {selectedDayData.map((data, idx) => (
                          <div key={idx} className="bg-white rounded-3xl p-5 border border-[#F5EBE0]/50 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                              <div className="flex justify-between items-start z-10">
                                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-sm ${data.color}`}>
                                      {data.icon}
                                  </div>
                              </div>
                              <div className="z-10 mt-auto">
                                  <p className="text-[#8B7E74] text-xs font-bold mb-1">{data.label}</p>
                                  <div className="flex items-baseline gap-1">
                                      <span className="text-2xl font-serif text-[#4A3E3E] leading-none">{data.time}</span>
                                      <span className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest">MIN</span>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default CareLogs;
