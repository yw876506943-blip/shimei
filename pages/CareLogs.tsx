
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Activity, Zap, Droplets, ArrowUpCircle, Calendar, Clock } from 'lucide-react';

// Mock data generator for logs
const generateMockData = () => {
    const data: Record<string, { mode: string; label: string; count: number; time: number; icon: React.ReactNode; color: string }[]> = {};
    const today = new Date();
    
    for (let i = 0; i < 60; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        // Randomly generate some data for past days
        if (Math.random() > 0.3) {
            data[dateString] = [
                { mode: 'FACE', label: '面部护理', count: Math.floor(Math.random() * 2), time: Math.floor(Math.random() * 10) + 5, icon: <Activity size={16} />, color: 'bg-blue-50 text-blue-500 border-blue-100' },
                { mode: 'EYE', label: '眼部护理', count: Math.floor(Math.random() * 2), time: Math.floor(Math.random() * 6) + 4, icon: <Droplets size={16} />, color: 'bg-purple-50 text-purple-500 border-purple-100' },
                { mode: 'LIFTING', label: 'EMS提拉', count: Math.floor(Math.random() * 3), time: Math.floor(Math.random() * 15) + 5, icon: <Zap size={16} />, color: 'bg-amber-50 text-amber-500 border-amber-100' },
                { mode: 'INFUSION', label: '导入渗透', count: Math.floor(Math.random() * 2), time: Math.floor(Math.random() * 10) + 5, icon: <ArrowUpCircle size={16} />, color: 'bg-green-50 text-green-500 border-green-100' },
            ].filter(item => item.count > 0);
        }
    }
    return data;
};

const mockData = generateMockData();

const CareLogs: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
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

  // Week Stats
  const { weekStats, weekModeData } = useMemo(() => {
      const today = new Date();
      const currentDay = today.getDay();
      const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
      const monday = new Date(today.setDate(diff));
      monday.setHours(0, 0, 0, 0);

      const modesMap: Record<string, any> = {};

      const stats = Array.from({length: 7}).map((_, i) => {
          const d = new Date(monday);
          d.setDate(d.getDate() + i);
          const dateStr = d.toISOString().split('T')[0];
          const data = mockData[dateStr] || [];
          
          data.forEach(item => {
              if (!modesMap[item.mode]) {
                  modesMap[item.mode] = { ...item, time: 0, count: 0 };
              }
              modesMap[item.mode].time += item.time;
              modesMap[item.mode].count += item.count;
          });

          const totalTime = data.reduce((acc, item) => acc + item.time, 0);
          return { 
              name: ['一', '二', '三', '四', '五', '六', '日'][i], 
              time: totalTime,
              isToday: new Date().toISOString().split('T')[0] === dateStr
          };
      });
      return { weekStats: stats, weekModeData: Object.values(modesMap) };
  }, []);

  const weekTotalTime = weekStats.reduce((acc, item) => acc + item.time, 0);

  // Month Stats
  const { monthStats, monthModeData } = useMemo(() => {
      const targetMonthStr = currentDate.toISOString().split('T')[0].substring(0, 7);
      let totalTime = 0;
      let checkInDays = 0;
      const modesMap: Record<string, any> = {};
      
      Object.entries(mockData).forEach(([dateStr, items]) => {
          if (dateStr.startsWith(targetMonthStr)) {
              if (items.length > 0) checkInDays++;
              totalTime += items.reduce((sum, item) => sum + item.time, 0);
              
              items.forEach(item => {
                  if (!modesMap[item.mode]) {
                      modesMap[item.mode] = { ...item, time: 0, count: 0 };
                  }
                  modesMap[item.mode].time += item.time;
                  modesMap[item.mode].count += item.count;
              });
          }
      });
      
      return { monthStats: { totalTime, checkInDays }, monthModeData: Object.values(modesMap) };
  }, [currentDate]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="bg-white px-5 pt-3 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#1A1A1A] p-2 -ml-2 active:scale-90 transition-transform">
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>
          <h2 className="text-[18px] font-medium text-[#1A1A1A] tracking-wider">打卡日志</h2>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
          {/* Tabs */}
          <div className="flex bg-[#EFEAE2] p-1 rounded-xl">
              <button 
                  onClick={() => setViewMode('day')}
                  className={`flex-1 py-1.5 text-[15px] font-medium rounded-[10px] transition-all ${viewMode === 'day' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#8B7E74]'}`}
              >
                  日
              </button>
              <button 
                  onClick={() => setViewMode('week')}
                  className={`flex-1 py-1.5 text-[15px] font-medium rounded-[10px] transition-all ${viewMode === 'week' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#8B7E74]'}`}
              >
                  周
              </button>
              <button 
                  onClick={() => setViewMode('month')}
                  className={`flex-1 py-1.5 text-[15px] font-medium rounded-[10px] transition-all ${viewMode === 'month' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#8B7E74]'}`}
              >
                  月
              </button>
          </div>

          {viewMode === 'day' && (
              <div className="animate-in fade-in duration-300">
                  <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
                      <div className="flex justify-between items-center mb-6">
                          <button onClick={handlePrevMonth} className="p-2 text-[#A39A92] active:scale-90 transition-transform -ml-2">
                              <ChevronLeft size={20} />
                          </button>
                          <span className="font-medium text-[#1A1A1A] text-[15px] tracking-widest">
                              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
                          </span>
                          <button onClick={handleNextMonth} className="p-2 text-[#A39A92] active:scale-90 transition-transform -mr-2">
                              <ChevronRight size={20} />
                          </button>
                      </div>

                      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center mb-2">
                          {['一', '二', '三', '四', '五', '六', '日'].map(day => (
                              <div key={day} className="text-[11px] font-medium text-[#A39A92] py-2">{day}</div>
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
                                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-[15px] transition-all duration-300 relative
                                          ${isSelected ? 'bg-[#DECCC0] text-[#332A26] font-medium shadow-sm' : 'text-[#1A1A1A] hover:bg-[#FAF7F2]'}
                                          ${isToday && !isSelected ? 'text-[#DECCC0] font-bold' : ''}
                                      `}>
                                          {date.getDate()}
                                          {hasData && !isSelected && (
                                              <span className="absolute -bottom-1 w-1 h-1 bg-[#DECCC0] rounded-full"></span>
                                          )}
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  </div>

                  <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[16px] font-medium text-[#1A1A1A]">
                                {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 记录
                            </h3>
                            <span className="text-[10px] text-[#A39A92] uppercase tracking-widest font-medium">Daily log</span>
                      </div>
                      
                      {selectedDayData.length === 0 ? (
                          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                              <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-3">
                                  <Activity size={24} className="text-[#DECCC0]" strokeWidth={1.5} />
                              </div>
                              <p className="text-[14px] text-[#A39A92]">这一天没有护理记录</p>
                          </div>
                      ) : (
                          <div className="grid grid-cols-2 gap-3">
                              {selectedDayData.map((data, idx) => (
                                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${data.color.replace('border-', '')}`}>
                                              {data.icon}
                                          </div>
                                      </div>
                                      <div className="mt-auto">
                                          <p className="text-[#8B7E74] text-[12px] font-medium mb-0.5">{data.label}</p>
                                          <div className="flex items-baseline gap-1">
                                              <span className="text-[22px] font-sans font-medium text-[#1A1A1A] leading-none">{data.time}</span>
                                              <span className="text-[10px] text-[#A39A92] font-medium uppercase tracking-widest">MIN</span>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </div>
          )}

          {viewMode === 'week' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                  <div className="bg-[#DECCC0] rounded-2xl p-6 shadow-sm text-[#332A26] relative overflow-hidden">
                      <div className="absolute -right-4 -top-8 opacity-20">
                          <Activity size={120} strokeWidth={1} />
                      </div>
                      <p className="text-[12px] uppercase tracking-widest font-medium opacity-80 mb-1">本周护理总时长</p>
                      <div className="flex items-baseline gap-1.5">
                          <span className="text-[36px] font-medium leading-none">{weekTotalTime}</span>
                          <span className="text-[12px] font-medium uppercase tracking-widest opacity-80">MIN</span>
                      </div>
                  </div>



                  {weekModeData.length > 0 && (
                      <div className="mt-6">
                          <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-3">按模式统计</h3>
                          <div className="grid grid-cols-2 gap-3">
                              {weekModeData.map((data: any, idx: number) => (
                                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${data.color.replace('border-', '')}`}>
                                              {data.icon}
                                          </div>
                                      </div>
                                      <div className="mt-auto">
                                          <p className="text-[#8B7E74] text-[12px] font-medium mb-0.5">{data.label}</p>
                                          <div className="flex items-baseline gap-1">
                                              <span className="text-[22px] font-sans font-medium text-[#1A1A1A] leading-none">{data.time}</span>
                                              <span className="text-[10px] text-[#A39A92] font-medium uppercase tracking-widest">MIN</span>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          )}

          {viewMode === 'month' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                  {/* Month Navigator */}
                  <div className="bg-white rounded-2xl pt-4 pb-2 shadow-sm">
                      <div className="flex justify-between items-center mb-4 px-5">
                          <button onClick={handlePrevMonth} className="p-2 text-[#A39A92] active:scale-90 transition-transform -ml-2">
                              <ChevronLeft size={20} />
                          </button>
                          <span className="font-medium text-[#1A1A1A] text-[15px] tracking-widest">
                              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
                          </span>
                          <button onClick={handleNextMonth} className="p-2 text-[#A39A92] active:scale-90 transition-transform -mr-2">
                              <ChevronRight size={20} />
                          </button>
                      </div>

                      <div className="px-5 pb-4 grid grid-cols-2 gap-4">
                          <div className="bg-[#FAF7F2] rounded-xl p-4">
                              <div className="flex items-center gap-1.5 text-[#A39A92] mb-2">
                                  <Clock size={14} />
                                  <span className="text-[11px] uppercase tracking-widest font-medium">总时长</span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                  <span className="text-[24px] font-medium text-[#1A1A1A] leading-none">{monthStats.totalTime}</span>
                                  <span className="text-[10px] text-[#A39A92] font-medium uppercase tracking-widest">MIN</span>
                              </div>
                          </div>
                          
                          <div className="bg-[#FAF7F2] rounded-xl p-4">
                              <div className="flex items-center gap-1.5 text-[#A39A92] mb-2">
                                  <Calendar size={14} />
                                  <span className="text-[11px] uppercase tracking-widest font-medium">打卡天数</span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                  <span className="text-[24px] font-medium text-[#1A1A1A] leading-none">{monthStats.checkInDays}</span>
                                  <span className="text-[10px] text-[#A39A92] font-medium uppercase tracking-widest">DAYS</span>
                              </div>
                          </div>
                      </div>
                  </div>



                  {monthModeData.length > 0 && (
                      <div className="mt-6">
                          <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-3">按模式统计</h3>
                          <div className="grid grid-cols-2 gap-3">
                              {monthModeData.map((data: any, idx: number) => (
                                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${data.color.replace('border-', '')}`}>
                                              {data.icon}
                                          </div>
                                      </div>
                                      <div className="mt-auto">
                                          <p className="text-[#8B7E74] text-[12px] font-medium mb-0.5">{data.label}</p>
                                          <div className="flex items-baseline gap-1">
                                              <span className="text-[22px] font-sans font-medium text-[#1A1A1A] leading-none">{data.time}</span>
                                              <span className="text-[10px] text-[#A39A92] font-medium uppercase tracking-widest">MIN</span>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          )}
      </div>
    </div>
  );
};

export default CareLogs;

