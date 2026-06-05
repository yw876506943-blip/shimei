import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Droplets, Sparkles, ShieldAlert, Activity, Eye, Sun, User, ChevronLeft } from 'lucide-react';

const SkinReportDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const archive = JSON.parse(localStorage.getItem('skinArchive') || '[]');
    const index = parseInt(id || '0', 10);
    if (archive[index]) {
      setResult(archive[index]);
    } else {
      // Handle not found
      navigate('/skin-archive');
    }
  }, [id, navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-right-4 duration-500 pb-24">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#4A3E3E]">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">测肤报告详情</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
           <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F5EBE0] flex items-center justify-between">
             <div>
               <h3 className="text-xl font-serif text-[#4A3E3E]">综合肤质评分</h3>
               <p className="text-xs text-[#C0B3A5] mt-1">{result.date}</p>
             </div>
             <div className="relative w-20 h-20 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                 <path
                   className="text-[#FAF7F2]"
                   strokeWidth="3"
                   stroke="currentColor"
                   fill="none"
                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                 />
                 <path
                   className="text-[#D7C4B2]"
                   strokeWidth="3"
                   strokeDasharray={`${result.overallScore}, 100`}
                   strokeLinecap="round"
                   stroke="currentColor"
                   fill="none"
                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                 />
               </svg>
               <div className="absolute text-2xl font-serif text-[#4A3E3E]">{result.overallScore}</div>
             </div>
           </div>

           <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F5EBE0]">
             <h3 className="text-center text-lg font-serif text-[#4A3E3E] mb-2">多维肌肤图谱</h3>
             <div className="h-[220px] w-full -ml-2">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="65%" data={result.scores}>
                   <PolarGrid stroke="#F5EBE0" />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B7E74', fontSize: 11, fontWeight: 600 }} />
                   <Radar name="Skin" dataKey="A" stroke="#D7C4B2" strokeWidth={2} fill="#D7C4B2" fillOpacity={0.3} />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
           </div>

           <div className="grid grid-cols-1 gap-3">
             {[
               { icon: <User size={18}/>, title: "肌肤年龄", label: result.labels?.skinAge, score: result.rawScores?.age },
               { icon: <ShieldAlert size={18}/>, title: "敏感度", label: result.labels?.sensitivity, score: result.rawScores?.sensitivity },
               { icon: <Droplets size={18}/>, title: "水分", label: result.labels?.moisture, score: result.rawScores?.moisture },
               { icon: <Sparkles size={18}/>, title: "毛孔", label: result.labels?.pore, score: result.rawScores?.pore },
               { icon: <Activity size={18}/>, title: "皱纹", label: result.labels?.wrinkle, score: result.rawScores?.wrinkle },
               { icon: <Eye size={18}/>, title: "黑眼圈", label: result.labels?.darkCircle, score: result.rawScores?.darkCircle },
               { icon: <Sun size={18}/>, title: "斑点/棕色斑", label: result.labels?.spot, score: result.rawScores?.spot }
             ].map((item, idx) => (
               <div key={idx} className="bg-white p-4 rounded-2xl border border-[#F5EBE0] flex items-center gap-4 shadow-sm">
                 <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#D7C4B2] flex items-center justify-center shrink-0">
                   {item.icon}
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-end mb-2">
                     <span className="text-xs text-[#C0B3A5] font-bold">{item.title}</span>
                     <span className="text-[#4A3E3E] font-medium text-sm">{item.label || '-'}</span>
                   </div>
                   <div className="h-1.5 w-full bg-[#FAF7F2] rounded-full overflow-hidden">
                     <div className="h-full bg-[#D7C4B2] rounded-full transition-all duration-1000" style={{ width: `${item.score || 0}%` }}></div>
                   </div>
                 </div>
               </div>
             ))}
           </div>

           <div className="flex flex-col gap-3 pt-4">
                <button 
                    onClick={() => navigate('/care-plan')}
                    className="w-full py-4 bg-[#4A3E3E] text-white rounded-2xl font-bold text-sm shadow-lg shadow-black/10 active:scale-95 transition-all"
                >
                    查看详细护理方案
                </button>
           </div>
      </div>
    </div>
  );
};

export default SkinReportDetail;
