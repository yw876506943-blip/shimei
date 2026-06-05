
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Sparkles, Droplets, Eye, Activity } from 'lucide-react';

type CareMode = {
  id: string;
  name: string;
  shortName: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  recommended: boolean;
  reason: string;
};

const CarePlan: React.FC = () => {
  const navigate = useNavigate();
  const [modes, setModes] = useState<CareMode[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);

  useEffect(() => {
    const archive = JSON.parse(localStorage.getItem('skinArchive') || '[]');
    const latestReport = archive[0] || null;

    const availableModes: CareMode[] = [
      {
        id: 'hifu_face',
        name: 'HIFU脸部模式',
        shortName: 'HIFU脸部',
        desc: '深层抗老提拉，改善面部松弛与静态纹。',
        icon: <Activity size={20} />,
        color: 'text-amber-500 bg-amber-50',
        recommended: false,
        reason: '可选，适合深层护理'
      },
      {
        id: 'hifu_eye',
        name: 'HIFU眼部模式',
        shortName: '眼部',
        desc: '精准作用于眼周，淡化细纹与黑眼圈。',
        icon: <Eye size={20} />,
        color: 'text-blue-500 bg-blue-50',
        recommended: false,
        reason: '适合眼周护理'
      },
      {
        id: 'ep',
        name: 'EP促渗模式',
        shortName: 'EP',
        desc: '打开肌肤通道，促进护肤品深层吸收。',
        icon: <Droplets size={20} />,
        color: 'text-teal-500 bg-teal-50',
        recommended: false,
        reason: '搭配精华使用更佳'
      },
      {
        id: 'rf',
        name: 'RF射频模式',
        shortName: 'RF',
        desc: '温和加热真皮层，促进胶原蛋白新生。',
        icon: <Sparkles size={20} />,
        color: 'text-rose-500 bg-rose-50',
        recommended: false,
        reason: '日常温和紧致'
      }
    ];

    if (latestReport && latestReport.rawScores) {
      const { rawScores, labels } = latestReport;
      
      // Logic for HIFU Face
      if ((rawScores.age || 0) < 80 || (rawScores.wrinkle || 0) < 80) {
        availableModes[0].recommended = true;
        availableModes[0].reason = '针对肌龄与皱纹，推荐深层提拉';
      }

      // Logic for HIFU Eye
      if ((rawScores.darkCircle || 0) < 80 || (labels && labels.wrinkle && labels.wrinkle.includes('眼角'))) {
        availableModes[1].recommended = true;
        availableModes[1].reason = '针对黑眼圈/眼纹，推荐眼周特护';
      }

      // Logic for EP
      if ((rawScores.moisture || 0) < 80 || (rawScores.pore || 0) < 80) {
        availableModes[2].recommended = true;
        availableModes[2].reason = '针对缺水/毛孔，推荐搭配精华促渗';
      }

      // Logic for RF
      if ((rawScores.sensitivity || 0) > 60) {
        availableModes[3].recommended = true;
        availableModes[3].reason = '肤质稳定，推荐RF射频日常紧致';
      } else {
        availableModes[3].reason = '可选，建议低档位温和使用';
      }
      
      // Ensure at least one is recommended if scores are all high
      if (!availableModes.some(m => m.recommended)) {
          availableModes[2].recommended = true;
          availableModes[2].reason = '日常基础保养，搭配精华使用更佳';
      }

    } else {
      // Default recommendations if no report or legacy report
      availableModes[0].recommended = true;
      availableModes[1].recommended = true;
      availableModes[2].recommended = true;
    }

    setModes(availableModes);
    setSelectedModes(availableModes.filter(m => m.recommended).map(m => m.id));
  }, []);

  const toggleMode = (id: string) => {
    setSelectedModes(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-bottom-8 duration-500 pb-24">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#4A3E3E]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">定制护理方案</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="text-center space-y-2">
            <h3 className="text-xl font-serif text-[#4A3E3E]">根据您的测肤状态</h3>
            <p className="text-sm text-[#8B7E74]">为您推荐今日专属护理组合</p>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F5EBE0] relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-[0.2em] mb-2">Recommended Combination</p>
                <div className="text-2xl font-bold text-[#D7C4B2] mb-3 leading-tight">
                    {selectedModes.length > 0 
                    ? selectedModes.map(id => modes.find(m => m.id === id)?.shortName).join(' + ')
                    : '未选择模式'}
                </div>
                <p className="text-xs text-[#8B7E74]">您可以根据自己的需求，手动调整下方的推荐组合</p>
            </div>
            <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-[#D7C4B2]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="space-y-3">
            {modes.map(mode => {
                const isSelected = selectedModes.includes(mode.id);
                return (
                <div 
                    key={mode.id}
                    onClick={() => toggleMode(mode.id)}
                    className={`p-4 rounded-[24px] border transition-all cursor-pointer flex items-center gap-4 shadow-sm ${isSelected ? 'border-[#D7C4B2] bg-white ring-1 ring-[#D7C4B2]/30' : 'border-[#F5EBE0] bg-white/60 opacity-70'}`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${mode.color}`}>
                        {mode.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-bold text-sm ${isSelected ? 'text-[#4A3E3E]' : 'text-[#8B7E74]'}`}>{mode.name}</h4>
                            {mode.recommended && <span className="text-[9px] bg-[#D7C4B2] text-white px-2 py-0.5 rounded-full font-bold tracking-wider">推荐</span>}
                        </div>
                        <p className="text-xs text-[#C0B3A5]">{mode.reason}</p>
                    </div>
                    <div>
                        {isSelected ? <CheckCircle2 className="text-[#D7C4B2]" size={24} /> : <Circle className="text-[#E5D5C5]" size={24} />}
                    </div>
                </div>
                );
            })}
        </div>

        <button 
            onClick={() => navigate('/device')}
            disabled={selectedModes.length === 0}
            className="w-full bg-[#4A3E3E] text-white py-5 rounded-3xl font-bold tracking-[0.2em] shadow-xl shadow-[#4A3E3E]/20 active:scale-95 transition-all text-sm mt-6 uppercase disabled:opacity-50 disabled:active:scale-100"
        >
            {selectedModes.length > 0 ? '确认组合并开始护理' : '请至少选择一个模式'}
        </button>
      </div>
    </div>
  );
};

export default CarePlan;
