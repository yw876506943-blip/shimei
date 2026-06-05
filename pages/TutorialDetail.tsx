
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TutorialDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSafety, setShowSafety] = useState(false);

  // Mock tutorial data
  const tutorialData = {
    '1': {
      title: 'SHEENME M1 Pro 入门',
      type: 'video',
      img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=800',
      desc: '本教程将带您快速了解设备按键功能及首次开机设置，让您轻松开启科技护肤之旅。',
      steps: [
        { title: '开机与连接', desc: '长按电源键3秒，观察指示灯闪烁。打开APP，自动寻找设备并完成配对。' },
        { title: '介质准备', desc: '在护理区域均匀涂抹专用导入凝胶，确保肌肤导电性良好。' },
        { title: '模式选择', desc: '根据当日肤质报告，选择对应的护理模式（建议首次使用从1档开始）。' }
      ]
    },
    '2': {
      title: 'EMS 提拉正确手法',
      type: 'graphic',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
      desc: '精准的提拉动作是紧致下颌线的关键。本指南由SHEEN资深美容专家演示。',
      steps: [
        { title: '下颌线提拉', desc: '从下巴中心开始，沿着下颌骨缓慢向上滑行至耳根处。重复6次。', icon: '✨' },
        { title: '法令纹淡化', desc: '从鼻翼两侧开始，向太阳穴方向做斜向上提拉。重复6次。', icon: '💆' },
        { title: '苹果肌塑形', desc: '从嘴角向颧骨最高处画圈滑动，激活面部轮廓感。重复6次。', icon: '💖' }
      ]
    },
    '3': {
      title: '晚间 15 分钟全效护理',
      type: 'video',
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800',
      desc: '睡前的黄金15分钟，带您完成从清洁到紧致的闭环护理，伴您安稳入睡。',
      steps: [
        { title: '深层清洁 (3min)', desc: '配合温和洁面，使用CLEAN模式打圈按摩。' },
        { title: 'RF射频嫩肤 (7min)', desc: '均匀发散能量，感受温热感。' },
        { title: '冰敷收敛 (5min)', desc: '收缩毛孔，锁住养分。' }
      ]
    }
  };

  const tutorial = tutorialData[id as keyof typeof tutorialData] || tutorialData['1'];

  if (showSafety) {
     return (
        <div className="min-h-screen bg-white animate-in slide-in-from-bottom duration-500 p-8 flex flex-col justify-between">
            <div className="space-y-8">
                <div className="space-y-2 mt-10">
                    <h2 className="text-3xl font-serif text-[#4A3E3E] text-red-600 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        安全须知
                    </h2>
                    <p className="text-sm text-[#8B7E74] font-bold">使用前请务必阅读以下安全警告，不当使用可能导致伤害。</p>
                </div>

                <div className="space-y-6">
                    <div className="flex gap-4 items-start bg-[#FEF2F2] p-5 rounded-3xl border border-red-100">
                         <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-xl">✋</div>
                         <div className="space-y-1">
                             <h4 className="font-bold text-[#4A3E3E]">严禁停留</h4>
                             <p className="text-xs text-[#8B7E74] leading-relaxed">仪器探头必须在皮肤上保持移动，<span className="font-bold text-red-500">严禁在同一部位停留超过 3 秒</span>，以防低温烫伤。</p>
                         </div>
                    </div>

                    <div className="flex gap-4 items-start bg-[#FEF2F2] p-5 rounded-3xl border border-red-100">
                         <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-xl">👁️</div>
                         <div className="space-y-1">
                             <h4 className="font-bold text-[#4A3E3E]">避开敏感区</h4>
                             <p className="text-xs text-[#8B7E74] leading-relaxed">请避开<span className="font-bold text-red-500">眼球、喉结、甲状腺</span>及伤口部位。眼周模式请仅在眼眶骨外围操作。</p>
                         </div>
                    </div>

                    <div className="flex gap-4 items-start bg-[#FAF7F2] p-5 rounded-3xl border border-[#F5EBE0]">
                         <div className="w-10 h-10 rounded-full bg-[#E5DACE] text-[#4A3E3E] flex items-center justify-center flex-shrink-0 text-xl">💧</div>
                         <div className="space-y-1">
                             <h4 className="font-bold text-[#4A3E3E]">必须使用介质</h4>
                             <p className="text-xs text-[#8B7E74] leading-relaxed">请务必配合官方凝胶使用，干推会导致皮肤拉扯及能量传导不均。</p>
                         </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3 pb-8">
                <button 
                    onClick={() => navigate('/device')}
                    className="w-full bg-[#4A3E3E] text-white py-4 rounded-2xl font-bold tracking-widest shadow-xl active:scale-95 transition-all"
                >
                    我已了解，开始护理
                </button>
                <button 
                    onClick={() => setShowSafety(false)}
                    className="w-full text-[#C0B3A5] text-xs font-bold py-3 uppercase tracking-widest"
                >
                    返回教程
                </button>
            </div>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-white pb-24 animate-in slide-in-from-right-4 duration-500 relative z-0">
      {/* Immersive Header */}
      <div className="h-[300px] relative overflow-hidden bg-[#4A3E3E]">
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-6 z-50 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-90 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        
        <img src={tutorial.img} className="w-full h-full object-cover opacity-60" alt={tutorial.title} />
        
        {tutorial.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full border-2 border-white/30 flex items-center justify-center group active:scale-95 transition-all shadow-2xl">
              <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        )}
      </div>

      <div className="px-8 -mt-10 relative bg-white rounded-t-[48px] pt-10 space-y-10 z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#FAF7F2] text-[#D7C4B2] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#F5EBE0]">
                {tutorial.type === 'video' ? 'Video Class' : 'Guide Book'}
                </span>
            </div>
            <button onClick={() => setShowSafety(true)} className="text-[10px] text-red-400 font-bold flex items-center gap-1 bg-red-50 px-3 py-1 rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                安全须知
            </button>
          </div>
          <h1 className="text-3xl font-serif text-[#4A3E3E]">{tutorial.title}</h1>
          <p className="text-sm text-[#8B7E74] leading-relaxed">{tutorial.desc}</p>
        </div>

        {/* Skin Analysis Recommendation */}
        <div className="bg-[#FAF7F2] rounded-[32px] p-6 border border-[#F5EBE0] flex items-center justify-between shadow-sm relative overflow-hidden group cursor-pointer transition-all hover:border-[#D7C4B2]/30" onClick={() => navigate('/analysis')}>
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#D7C4B2]/10 rounded-full blur-2xl group-hover:bg-[#D7C4B2]/20 transition-all"></div>
            <div className="space-y-1 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#D7C4B2] shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    </div>
                    <h4 className="font-bold text-[#4A3E3E] text-sm">建议先进行测肤</h4>
                </div>
                <p className="text-[10px] text-[#8B7E74]">获取今日专属能量档位建议</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#D7C4B2] flex items-center justify-center text-white relative z-10 shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#C0B3A5] uppercase tracking-widest">教程分解</h4>
            <span className="text-[10px] text-[#C0B3A5] font-medium">{tutorial.steps.length} 步骤</span>
          </div>

          <div className="space-y-8">
            {tutorial.steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#F5EBE0] flex items-center justify-center text-[#D7C4B2] font-serif text-lg group-hover:bg-[#D7C4B2] group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  {idx !== tutorial.steps.length - 1 && (
                    <div className="w-[1px] h-12 bg-[#F5EBE0]"></div>
                  )}
                </div>
                <div className="flex-1 pt-1 space-y-1">
                  <h5 className="font-bold text-[#4A3E3E]">{step.title}</h5>
                  <p className="text-xs text-[#8B7E74] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Tip Card */}
        <div className="bg-[#FAF7F2] p-8 rounded-[40px] border border-[#F5EBE0]/50 relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 text-[#D7C4B2]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">Expert Tip</span>
            </div>
            <p className="text-xs text-[#8B7E74] italic leading-relaxed">
              "使用 EMS 模式时，手法务必缓慢。感觉肌肉微颤是正常的，如果感觉刺痛请及时降低档位。"
            </p>
          </div>
          <div className="absolute bottom-[-20px] right-[-20px] w-24 h-24 bg-white/40 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#F5EBE0] px-8 py-5 z-50 shadow-2xl">
        <button 
          onClick={() => setShowSafety(true)}
          className="w-full bg-[#4A3E3E] text-white py-4 rounded-2xl font-bold text-sm tracking-[0.3em] uppercase shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          立即开启护理
        </button>
      </div>
    </div>
  );
};

export default TutorialDetail;
