
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Activity, Zap, Droplets, ArrowUpCircle, Calendar, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
                { mode: 'FACE', label: '面部护理', count: Math.floor(Math.random() * 3) + 1, time: Math.floor(Math.random() * 10) + 5, icon: <Activity size={16} />, color: 'bg-blue-50 text-blue-500 border-blue-100' },
                { mode: 'EYE', label: '眼部护理', count: Math.floor(Math.random() * 2) + 1, time: Math.floor(Math.random() * 6) + 4, icon: <Droplets size={16} />, color: 'bg-purple-50 text-purple-500 border-purple-100' },
                { mode: 'LIFTING', label: 'EMS提拉', count: Math.floor(Math.random() * 3), time: Math.floor(Math.random() * 15) + 5, icon: <Zap size={16} />, color: 'bg-amber-50 text-amber-500 border-amber-100' },
                { mode: 'INFUSION', label: '导入渗透', count: Math.floor(Math.random() * 2), time: Math.floor(Math.random() * 10) + 5, icon: <ArrowUpCircle size={16} />, color: 'bg-green-50 text-green-500 border-green-100' },
            ].filter(item => item.count > 0 || item.time > 0);
        }
    }
    return data;
};

const mockData = generateMockData();

const ALL_MODES = [
    { id: 'FACE', label: '面部护理', color: '#3B82F6', unit: '发', isCount: true, icon: <Activity size={16} /> },
    { id: 'EYE', label: '眼部护理', color: '#A855F7', unit: '发', isCount: true, icon: <Droplets size={16} /> },
    { id: 'LIFTING', label: 'EMS提拉', color: '#F59E0B', unit: 'MIN', isCount: false, icon: <Zap size={16} /> },
    { id: 'INFUSION', label: '导入渗透', color: '#22C55E', unit: 'MIN', isCount: false, icon: <ArrowUpCircle size={16} /> }
];

const CareLogs: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedChartMode, setSelectedChartMode] = useState<string>('FACE');
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
  const { weekStats, weekTrendData, weekModeData } = useMemo(() => {
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

      const trendData = Array.from({length: 7}).map((_, i) => {
          const thisDay = new Date(monday);
          thisDay.setDate(thisDay.getDate() + i);
          const thisDateStr = thisDay.toISOString().split('T')[0];
          const thisData = mockData[thisDateStr] || [];
          
          const lastDay = new Date(monday);
          lastDay.setDate(lastDay.getDate() - 7 + i);
          const lastDateStr = lastDay.toISOString().split('T')[0];
          const lastData = mockData[lastDateStr] || [];

          const dayData: any = { name: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][i] };
          
          ALL_MODES.forEach(mode => {
              const matchedThis = thisData.find(item => item.mode === mode.id);
              dayData[mode.id] = matchedThis ? (mode.isCount ? matchedThis.count : matchedThis.time) : 0;
              
              const matchedLast = lastData.find(item => item.mode === mode.id);
              dayData[`${mode.id}_last`] = matchedLast ? (mode.isCount ? matchedLast.count : matchedLast.time) : 0;
          });
          
          return dayData;
      });

      return { weekStats: stats, weekTrendData: trendData, weekModeData: Object.values(modesMap) };
  }, [currentDate]);

  // Month Stats
  const { monthStats, monthTrendData, monthModeData } = useMemo(() => {
      const year = currentDate.getFullYear();
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
      
      const trendData = Array.from({length: 12}).map((_, i) => {
          const mStr = `${year}-${(i + 1).toString().padStart(2, '0')}`;
          const mData: any = { name: `${i+1}月` };
          ALL_MODES.forEach(m => mData[m.id] = 0);
          
          Object.entries(mockData).forEach(([dateStr, items]) => {
              if (dateStr.startsWith(mStr)) {
                  ALL_MODES.forEach(mode => {
                      const matched = items.find(item => item.mode === mode.id);
                      if (matched) {
                          mData[mode.id] += (mode.isCount ? matched.count : matched.time);
                      }
                  });
              }
          });
          return mData;
      });

      return { monthStats: { totalTime, checkInDays }, monthTrendData: trendData, monthModeData: Object.values(modesMap) };
  }, [currentDate]);

  const renderTrendChart = (trendData: any[]) => {
      const modeConfig = ALL_MODES.find(m => m.id === selectedChartMode) || ALL_MODES[0];
      const isWeekly = viewMode === 'week';
      return (
          <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex gap-2 bg-[#FAF7F2] p-1 rounded-xl mb-6 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {ALL_MODES.map(mode => (
                      <button 
                          key={mode.id}
                          onClick={() => setSelectedChartMode(mode.id)}
                          className={`flex-shrink-0 px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all ${selectedChartMode === mode.id ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#8B7E74]'}`}
                      >
                          {mode.label}
                      </button>
                  ))}
              </div>

              <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A39A92' }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A39A92' }} allowDecimals={false} />
                          <Tooltip 
                              cursor={{ fill: '#FAF7F2' }}
                              formatter={(value: any, name: any) => [`${value} ${modeConfig.unit}`, name]}
                              labelFormatter={(label) => `${label}`}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          />
                          {isWeekly && (
                              <Bar dataKey={`${selectedChartMode}_last`} name="上周" fill="#E5E7EB" radius={[4, 4, 0, 0]} maxBarSize={12} />
                          )}
                          <Bar dataKey={selectedChartMode} name={isWeekly ? "本周" : modeConfig.label} fill={modeConfig.color} radius={[4, 4, 0, 0]} maxBarSize={12} />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
      );
  };

  const renderModeStats = (modeData: any[], noMargin = false) => {
      if (!modeData || modeData.length === 0) return null;
      return (
          <div className={`grid grid-cols-4 gap-2 ${noMargin ? 'pb-4 px-5' : 'mb-6'}`}>
              {ALL_MODES.map((modeConfig, idx: number) => {
                  const data = modeData.find(d => d.mode === modeConfig.id);
                  const isCountMode = modeConfig.isCount;
                  const unit = modeConfig.unit;
                  const value = data ? (isCountMode ? data.count : data.time) : 0;
                  return (
                  <div key={idx} className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center justify-center text-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${modeConfig.color}15`, color: modeConfig.color }}>
                          {React.cloneElement(modeConfig.icon as React.ReactElement, { size: 16 })}
                      </div>
                      <div className="flex items-baseline gap-0.5">
                          <span className="text-[16px] font-sans font-medium text-[#1A1A1A] leading-none">{value}</span>
                          <span className="text-[9px] text-[#A39A92] font-medium uppercase tracking-widest">{unit}</span>
                      </div>
                      <span className="text-[10px] text-[#8B7E74] mt-1">{modeConfig.label}</span>
                  </div>
                  );
              })}
          </div>
      );
  };

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
                              {selectedDayData.map((data, idx) => {
                                  const isCountMode = data.mode === 'FACE' || data.mode === 'EYE';
                                  return (
                                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${data.color.replace('border-', '')}`}>
                                              {data.icon}
                                          </div>
                                      </div>
                                      <div className="mt-auto">
                                          <p className="text-[#8B7E74] text-[12px] font-medium mb-0.5">{data.label}</p>
                                          <div className="flex items-baseline gap-1">
                                              <span className="text-[22px] font-sans font-medium text-[#1A1A1A] leading-none">{isCountMode ? data.count : data.time}</span>
                                              <span className="text-[10px] text-[#A39A92] font-medium uppercase tracking-widest">{isCountMode ? '发' : 'MIN'}</span>
                                          </div>
                                      </div>
                                  </div>
                                  );
                              })}
                          </div>
                      )}
                  </div>
              </div>
          )}

          {viewMode === 'week' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                  {weekModeData.length > 0 && renderModeStats(weekModeData)}
                  {weekTrendData.length > 0 && renderTrendChart(weekTrendData)}
              </div>
          )}

          {viewMode === 'month' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                  {/* Month Navigator */}
                  <div className="bg-white rounded-2xl pt-4 shadow-sm">
                      <div className="flex justify-between items-center mb-4 px-5">
                          <button onClick={handlePrevMonth} className="p-2 text-[#A39A92] active:scale-90 transition-transform -ml-2">
                              <ChevronLeft size={20} />
                          </button>
                          <div className="flex flex-col items-center">
                              <span className="font-medium text-[#1A1A1A] text-[15px] tracking-widest">
                                  {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
                              </span>
                              <span className="text-[10px] text-[#A39A92] font-medium mt-0.5">打卡记录 {monthStats.checkInDays} 天</span>
                          </div>
                          <button onClick={handleNextMonth} className="p-2 text-[#A39A92] active:scale-90 transition-transform -mr-2">
                              <ChevronRight size={20} />
                          </button>
                      </div>

                      {monthModeData.length > 0 && renderModeStats(monthModeData, true)}
                  </div>

                  {monthTrendData.length > 0 && renderTrendChart(monthTrendData)}
              </div>
          )}
      </div>
    </div>
  );
};

export default CareLogs;

