
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';

const SkinArchive: React.FC = () => {
  const navigate = useNavigate();
  const [archive, setArchive] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('skinArchive') || '[]');
    setArchive(saved);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-right-4 duration-500 pb-10">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="text-[#4A3E3E]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">肌肤档案</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {archive.length === 0 ? (
          <div className="py-20 text-center opacity-40 space-y-4">
              <svg className="w-16 h-16 mx-auto text-[#C0B3A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              <p className="text-sm font-medium text-[#C0B3A5]">暂无肌肤检测记录</p>
              <button 
                onClick={() => navigate('/analysis')}
                className="mt-4 px-6 py-2 bg-[#4A3E3E] text-white rounded-full text-xs tracking-widest"
              >
                去测肤
              </button>
          </div>
        ) : (
          archive.map((report, idx) => {
            // Handle legacy format gracefully if any exists
            if (report.hydration !== undefined || !report.rawScores) {
              return null; // Skip legacy format or incomplete data
            }

            const { labels, overallScore, date } = report;
            const topLabels = Object.values(labels || {}).filter(Boolean).slice(0, 2);

            return (
              <div 
                key={idx} 
                onClick={() => navigate(`/skin-report/${idx}`)}
                className="bg-white rounded-3xl p-5 border border-[#F5EBE0]/50 shadow-sm flex items-center justify-between active:scale-95 transition-all cursor-pointer"
              >
                  <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 text-[#C0B3A5]">
                        <Calendar size={14} />
                        <span className="text-xs font-bold uppercase tracking-widest">{date}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                          <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-serif text-[#4A3E3E] leading-none">{overallScore}</span>
                              <span className="text-[10px] text-[#D7C4B2] font-bold uppercase">分</span>
                          </div>
                          
                          <div className="w-[1px] h-6 bg-[#F5EBE0]"></div>
                          
                          <div className="flex flex-wrap gap-1.5">
                            {topLabels.map((label: any, i) => (
                              <span key={i} className="px-2 py-0.5 bg-[#FAF7F2] text-[#8B7E74] text-[10px] rounded-full border border-[#F5EBE0]">
                                {label}
                              </span>
                            ))}
                          </div>
                      </div>
                  </div>
                  <ChevronRight size={20} className="text-[#C0B3A5] shrink-0 ml-4" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SkinArchive;
