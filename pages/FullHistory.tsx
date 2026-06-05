
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogEntry {
  id: string;
  date: string;
  time: string;
  mode: string;
  duration: string;
  icon: string;
  intensity: number;
}

const FullHistory: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for a fuller history list
  const historyData: { month: string; logs: LogEntry[] }[] = [
    {
      month: '2024年10月',
      logs: [
        { id: '1', date: '10月25日', time: '22:15', mode: 'EMS 提拉', duration: '10:00', icon: '⚡', intensity: 3 },
        { id: '2', date: '10月24日', time: '21:30', mode: 'RF 嫩肤', duration: '15:20', icon: '🔥', intensity: 2 },
        { id: '3', date: '10月22日', time: '22:05', mode: '冰敷收敛', duration: '05:00', icon: '❄️', intensity: 1 },
        { id: '4', date: '10月20日', time: '21:45', mode: '深度清洁', duration: '08:30', icon: '✨', intensity: 3 },
        { id: '5', date: '10月18日', time: '22:10', mode: 'EMS 提拉', duration: '10:00', icon: '⚡', intensity: 2 },
      ]
    },
    {
      month: '2024年09月',
      logs: [
        { id: '6', date: '09月28日', time: '21:30', mode: 'RF 嫩肤', duration: '15:00', icon: '🔥', intensity: 4 },
        { id: '7', date: '09月25日', time: '22:00', mode: '深度清洁', duration: '08:00', icon: '✨', intensity: 2 },
        { id: '8', date: '09月20日', time: '21:15', mode: 'EMS 提拉', duration: '10:00', icon: '⚡', intensity: 3 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-10 animate-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#4A3E3E]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">全部护理历史</h2>
        </div>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Quick Stats Banner */}
        <div className="flex gap-4">
            <div className="flex-1 bg-white rounded-3xl p-5 border border-[#F5EBE0]/50 shadow-sm">
                <p className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest mb-1">累计护理</p>
                <p className="text-2xl font-serif text-[#4A3E3E]">42 <span className="text-[10px] font-sans font-bold text-[#D7C4B2]">次</span></p>
            </div>
            <div className="flex-1 bg-white rounded-3xl p-5 border border-[#F5EBE0]/50 shadow-sm">
                <p className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest mb-1">本月时长</p>
                <p className="text-2xl font-serif text-[#4A3E3E]">185 <span className="text-[10px] font-sans font-bold text-[#D7C4B2]">min</span></p>
            </div>
        </div>

        {/* History List */}
        <div className="space-y-12">
            {historyData.map((group) => (
                <div key={group.month} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-[#C0B3A5] uppercase tracking-[0.2em]">{group.month}</span>
                        <div className="flex-1 h-[1px] bg-[#F5EBE0]"></div>
                    </div>

                    <div className="space-y-4">
                        {group.logs.map((log) => (
                            <div key={log.id} className="bg-white rounded-[32px] p-6 border border-[#F5EBE0]/30 shadow-sm transition-all active:scale-[0.98]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-[#FAF7F2] rounded-[20px] flex items-center justify-center text-2xl shadow-inner border border-[#F5EBE0]">
                                            {log.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-[#4A3E3E] flex items-center gap-2">
                                                {log.mode}
                                                <span className="text-[10px] px-2 py-0.5 bg-[#FAF7F2] text-[#D7C4B2] rounded-full border border-[#F5EBE0] font-bold">
                                                    Lvl {log.intensity}
                                                </span>
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] text-[#C0B3A5] font-medium">
                                                <span>{log.date}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                                                <span>{log.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-serif font-bold text-[#D7C4B2] tracking-widest">{log.duration}</p>
                                        <p className="text-[8px] text-[#C0B3A5] uppercase font-bold tracking-widest">duration</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Footer Tag */}
        <div className="text-center pt-8 opacity-30">
            <p className="text-[10px] text-[#C0B3A5] uppercase tracking-[0.5em] font-bold">End of History</p>
        </div>
      </div>
    </div>
  );
};

export default FullHistory;
