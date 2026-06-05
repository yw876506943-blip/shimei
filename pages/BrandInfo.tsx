
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrandInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white animate-in slide-in-from-right-4 duration-500">
      <div className="h-[40vh] relative overflow-hidden">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 z-10 text-white shadow-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Brand" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-5xl font-serif text-white tracking-[0.3em]">SHEEN</h1>
        </div>
      </div>

      <div className="px-10 py-12 space-y-12">
        <section className="space-y-4">
            <h2 className="text-2xl font-serif text-[#4A3E3E]">品牌故事</h2>
            <p className="text-sm text-[#8B7E74] leading-relaxed">
                SHEEN 诞生于对“凝时之美”的极致追求。我们相信，现代科技不应只是冷冰冰的数据，而是能够触碰肌肤、唤醒自我的温暖力量。
            </p>
            <p className="text-sm text-[#8B7E74] leading-relaxed">
                自成立以来，SHEEN 专注于高端居家美容仪器的研发，将院线级的射频与光电技术转化为更智能、更易用的个人护理艺术品。
            </p>
        </section>

        <section className="space-y-8">
            <div className="flex gap-6 items-center">
                <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center text-2xl text-[#D7C4B2]">🔬</div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-[#4A3E3E] tracking-widest">科技驱动</h3>
                    <p className="text-[10px] text-[#C0B3A5] font-medium uppercase">Cutting-edge R&D Team</p>
                </div>
            </div>
            <div className="flex gap-6 items-center">
                <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center text-2xl text-[#D7C4B2]">✨</div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-[#4A3E3E] tracking-widest">至简美学</h3>
                    <p className="text-[10px] text-[#C0B3A5] font-medium uppercase">Minimalist Artistic Design</p>
                </div>
            </div>
            <div className="flex gap-6 items-center">
                <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center text-2xl text-[#D7C4B2]">🤝</div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-[#4A3E3E] tracking-widest">匠心服务</h3>
                    <p className="text-[10px] text-[#C0B3A5] font-medium uppercase">Personalized Beauty Concierge</p>
                </div>
            </div>
        </section>

        <div className="text-center pt-10 border-t border-[#F5EBE0]">
            <p className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-[0.5em]">Defining Elegance Since 2020</p>
        </div>
      </div>
    </div>
  );
};

export default BrandInfo;
