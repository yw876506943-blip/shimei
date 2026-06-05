
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Droplets, Sparkles, ShieldAlert, Activity, Eye, Sun, User } from 'lucide-react';

type UserInfo = {
  age: number | '';
  gender: string;
};

type AnalysisResult = {
  labels: {
    skinAge: string;
    sensitivity: string;
    moisture: string;
    pore: string;
    wrinkle: string;
    darkCircle: string;
    spot: string;
  };
  rawScores: {
    age: number;
    sensitivity: number;
    moisture: number;
    pore: number;
    wrinkle: number;
    darkCircle: number;
    spot: number;
  };
  scores: {
    subject: string;
    A: number;
    fullMark: number;
  }[];
  overallScore: number;
};

const SkinAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'info' | 'ready' | 'analyzing' | 'result'>('info');
  const [userInfo, setUserInfo] = useState<UserInfo>({ age: '', gender: 'female' });
  const [result, setResult] = useState<AnalysisResult | null>(null);

  React.useEffect(() => {
    const savedAge = localStorage.getItem('userAge');
    const savedGender = localStorage.getItem('userGender');
    if (savedAge || savedGender) {
      setUserInfo({
        age: savedAge ? Number(savedAge) : '',
        gender: savedGender || 'female'
      });
    }
  }, []);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.age && Number(userInfo.age) > 0) {
      localStorage.setItem('userAge', userInfo.age.toString());
      localStorage.setItem('userGender', userInfo.gender);
      setStep('ready');
    }
  };

  const generateAnalysisResult = (actualAge: number): AnalysisResult => {
    // Simulate third-party API response
    const apiResponse = {
      age: { result: actualAge + Math.floor(Math.random() * 15) - 7 },
      sensitive: { type: ['sensitive', 'normal', 'tolerance'][Math.floor(Math.random() * 3)] },
      moisture: { level: ['severe', 'moderately', 'lightly', 'none'][Math.floor(Math.random() * 4)] },
      pore: { level: ['severe', 'moderately', 'lightly', 'none'][Math.floor(Math.random() * 4)] },
      wrinkle: { 
        level: ['severe', 'moderately', 'lightly', 'none'][Math.floor(Math.random() * 4)], 
        part: ['眼角', '额头', '法令纹', '眉间'][Math.floor(Math.random() * 4)] 
      },
      dark_circle: { 
        type: ['血管型', '色素型', '结构型'][Math.floor(Math.random() * 3)], 
        level: ['轻度', '中度', '重度'][Math.floor(Math.random() * 3)] 
      },
      spot: { level: 'any' }
    };

    let skinAgeLabel = '';
    if (apiResponse.age.result < actualAge - 5) skinAgeLabel = '肌龄偏年轻';
    else if (apiResponse.age.result <= actualAge + 5) skinAgeLabel = '肌龄与实际相符';
    else skinAgeLabel = '肌龄偏成熟';

    let sensitivityLabel = '';
    if (apiResponse.sensitive.type === 'sensitive') sensitivityLabel = '易敏肤质';
    else if (apiResponse.sensitive.type === 'normal') sensitivityLabel = '稳定肤质';
    else sensitivityLabel = '耐受肤质';

    let moistureLabel = '';
    if (['severe', 'moderately'].includes(apiResponse.moisture.level)) moistureLabel = '需补水';
    else if (apiResponse.moisture.level === 'lightly') moistureLabel = '水分良好';
    else moistureLabel = '水润饱满';

    let poreLabel = '';
    if (['severe', 'moderately'].includes(apiResponse.pore.level)) poreLabel = '毛孔较明显';
    else poreLabel = '毛孔细腻';

    let wrinkleLabel = '';
    if (['severe', 'moderately', 'lightly'].includes(apiResponse.wrinkle.level)) {
      wrinkleLabel = `${apiResponse.wrinkle.part}部位有动态纹/静态纹迹象`;
    } else {
      wrinkleLabel = '未见明显皱纹迹象';
    }

    let darkCircleLabel = `${apiResponse.dark_circle.level}${apiResponse.dark_circle.type}黑眼圈`;

    let spotLabel = '建议做好防晒';

    const rawScores = {
      age: apiResponse.age.result < actualAge - 5 ? 90 : apiResponse.age.result <= actualAge + 5 ? 75 : 50,
      sensitivity: apiResponse.sensitive.type === 'tolerance' ? 95 : apiResponse.sensitive.type === 'normal' ? 75 : 45,
      moisture: apiResponse.moisture.level === 'none' ? 95 : apiResponse.moisture.level === 'lightly' ? 75 : 40,
      pore: ['severe', 'moderately'].includes(apiResponse.pore.level) ? 50 : 85,
      wrinkle: ['severe', 'moderately', 'lightly'].includes(apiResponse.wrinkle.level) ? 60 : 90,
      darkCircle: apiResponse.dark_circle.level === '轻度' ? 75 : apiResponse.dark_circle.level === '中度' ? 55 : 35,
      spot: 70
    };

    const scores = [
      { subject: '水分', A: rawScores.moisture, fullMark: 100 },
      { subject: '毛孔', A: rawScores.pore, fullMark: 100 },
      { subject: '抗皱', A: rawScores.wrinkle, fullMark: 100 },
      { subject: '耐受', A: rawScores.sensitivity, fullMark: 100 },
      { subject: '年轻度', A: rawScores.age, fullMark: 100 },
      { subject: '匀净度', A: Math.round((rawScores.darkCircle + rawScores.spot) / 2), fullMark: 100 },
    ];

    const overallScore = Math.round(Object.values(rawScores).reduce((a, b) => a + b, 0) / Object.values(rawScores).length);

    return {
      labels: {
        skinAge: skinAgeLabel,
        sensitivity: sensitivityLabel,
        moisture: moistureLabel,
        pore: poreLabel,
        wrinkle: wrinkleLabel,
        darkCircle: darkCircleLabel,
        spot: spotLabel
      },
      rawScores,
      scores,
      overallScore
    };
  };

  const handleStartAnalysis = () => {
    setStep('analyzing');
    setTimeout(() => {
      const analysisResult = generateAnalysisResult(Number(userInfo.age));
      setResult(analysisResult);
      
      // Save to archive (simplified for this example)
      const archive = JSON.parse(localStorage.getItem('skinArchive') || '[]');
      localStorage.setItem('skinArchive', JSON.stringify([{ ...analysisResult, date: new Date().toLocaleString() }, ...archive]));
      
      setStep('result');
    }, 2500);
  };

  return (
    <div className="px-6 py-4 space-y-6 animate-in fade-in duration-700 pb-24">
      {step === 'info' && (
        <div className="space-y-8 pt-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif text-[#4A3E3E]">完善个人信息</h2>
            <p className="text-[#C0B3A5] text-sm">为了提供更准确的测肤分析，请先完善以下信息</p>
          </div>

          <form onSubmit={handleInfoSubmit} className="space-y-6 bg-white p-6 rounded-[32px] shadow-sm border border-[#F5EBE0]">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#4A3E3E] ml-2">您的实际年龄</label>
              <input 
                type="number" 
                value={userInfo.age}
                onChange={(e) => setUserInfo({...userInfo, age: e.target.value ? Number(e.target.value) : ''})}
                placeholder="请输入年龄"
                className="w-full bg-[#FAF7F2] border-none rounded-2xl py-4 px-5 text-[#4A3E3E] focus:ring-2 focus:ring-[#D7C4B2] outline-none transition-all"
                required
                min="1"
                max="120"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#4A3E3E] ml-2">您的性别</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserInfo({...userInfo, gender: 'female'})}
                  className={`py-4 rounded-2xl font-bold transition-all ${userInfo.gender === 'female' ? 'bg-[#D7C4B2] text-white shadow-md' : 'bg-[#FAF7F2] text-[#C0B3A5]'}`}
                >
                  女士
                </button>
                <button
                  type="button"
                  onClick={() => setUserInfo({...userInfo, gender: 'male'})}
                  className={`py-4 rounded-2xl font-bold transition-all ${userInfo.gender === 'male' ? 'bg-[#D7C4B2] text-white shadow-md' : 'bg-[#FAF7F2] text-[#C0B3A5]'}`}
                >
                  先生
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={!userInfo.age}
              className="w-full bg-[#4A3E3E] text-white py-4 rounded-2xl font-bold shadow-lg shadow-black/10 active:scale-95 transition-all mt-4 disabled:opacity-50 disabled:active:scale-100"
            >
              下一步
            </button>
          </form>
        </div>
      )}

      {step === 'ready' && (
        <div className="flex flex-col items-center justify-center py-12 gap-10">
          <div className="relative">
            <div className="w-64 h-64 rounded-full border-2 border-dashed border-[#D7C4B2] flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-white shadow-xl flex items-center justify-center border border-[#F5EBE0]">
                     <svg className="w-20 h-20 text-[#D7C4B2] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                     </svg>
                </div>
            </div>
            <div className="absolute inset-0 border-4 border-[#D7C4B2] rounded-full animate-[spin_20s_linear_infinite] border-t-transparent border-l-transparent opacity-30"></div>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif text-[#4A3E3E]">AI 智能测肤</h2>
            <p className="text-[#C0B3A5] text-sm max-w-[280px]">洞察每一个细微变化，为您的美定制科学方案</p>
          </div>

          <button 
            onClick={handleStartAnalysis}
            className="w-full bg-[#D7C4B2] text-white py-5 rounded-2xl font-bold shadow-xl shadow-[#D7C4B2]/30 active:scale-95 transition-all text-lg tracking-widest"
          >
            开始诊断
          </button>
          
          <button 
            onClick={() => setStep('info')}
            className="text-[#C0B3A5] text-sm font-medium underline underline-offset-4"
          >
            返回修改信息
          </button>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="flex flex-col items-center justify-center py-20 gap-8">
          <div className="relative w-56 h-72 bg-white rounded-[48px] overflow-hidden shadow-2xl border-4 border-white">
             <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-80" alt="Scanning" />
             <div className="absolute top-0 left-0 w-full h-1.5 bg-[#D7C4B2] shadow-[0_0_20px_#D7C4B2] animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-[#D7C4B2] font-medium tracking-widest animate-pulse">SHEEN AI 分析中...</p>
        </div>
      )}

      {step === 'result' && result && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
           
           <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F5EBE0] flex items-center justify-between">
             <div>
               <h3 className="text-xl font-serif text-[#4A3E3E]">综合肤质评分</h3>
               <p className="text-xs text-[#C0B3A5] mt-1">基于多维数据综合评估</p>
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
               { icon: <User size={18}/>, title: "肌肤年龄", label: result.labels.skinAge, score: result.rawScores.age },
               { icon: <ShieldAlert size={18}/>, title: "敏感度", label: result.labels.sensitivity, score: result.rawScores.sensitivity },
               { icon: <Droplets size={18}/>, title: "水分", label: result.labels.moisture, score: result.rawScores.moisture },
               { icon: <Sparkles size={18}/>, title: "毛孔", label: result.labels.pore, score: result.rawScores.pore },
               { icon: <Activity size={18}/>, title: "皱纹", label: result.labels.wrinkle, score: result.rawScores.wrinkle },
               { icon: <Eye size={18}/>, title: "黑眼圈", label: result.labels.darkCircle, score: result.rawScores.darkCircle },
               { icon: <Sun size={18}/>, title: "斑点/棕色斑", label: result.labels.spot, score: result.rawScores.spot }
             ].map((item, idx) => (
               <div key={idx} className="bg-white p-4 rounded-2xl border border-[#F5EBE0] flex items-center gap-4 shadow-sm">
                 <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#D7C4B2] flex items-center justify-center shrink-0">
                   {item.icon}
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-end mb-2">
                     <span className="text-xs text-[#C0B3A5] font-bold">{item.title}</span>
                     <span className="text-[#4A3E3E] font-medium text-sm">{item.label}</span>
                   </div>
                   <div className="h-1.5 w-full bg-[#FAF7F2] rounded-full overflow-hidden">
                     <div className="h-full bg-[#D7C4B2] rounded-full transition-all duration-1000" style={{ width: `${item.score}%` }}></div>
                   </div>
                 </div>
               </div>
             ))}
           </div>

           <div className="text-center px-4 mt-2">
             <p className="text-[10px] text-[#C0B3A5] tracking-wide">温馨提示：测肤时因拍照光线与距离的差异，结果可能会有所不同，分析仅供参考。</p>
           </div>

           <div className="flex flex-col gap-3 pt-4">
                <button 
                    onClick={() => navigate('/care-plan')}
                    className="w-full py-4 bg-[#4A3E3E] text-white rounded-2xl font-bold text-sm shadow-lg shadow-black/10 active:scale-95 transition-all"
                >
                    查看详细护理方案
                </button>
                <button onClick={() => setStep('ready')} className="w-full py-4 bg-transparent text-[#C0B3A5] rounded-2xl font-bold text-sm border border-[#C0B3A5]/30">
                    重新测试
                </button>
           </div>
        </div>
      )}
      <style>{` @keyframes scan { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(280px); } } `}</style>
    </div>
  );
};

export default SkinAnalysis;

