
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeInfoTab, setActiveInfoTab] = useState<'intro' | 'specs'>('intro');

  // Product Data Dictionary
  const productsDict: Record<string, any> = {
    '1': {
      name: 'SHEENME M1 Pro',
      price: 2980,
      img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=800',
      description: '旗舰级RF射频技术，深层激活胶原蛋白，紧致下颌线。专为亚洲肤质定制的抗老方案。',
      highlights: ['RF 射频 3.0', 'EMS 微电流', '红光嫩肤', '智能温控保护'],
      specs: ['IPX7防水', '超长待机30天', '3级强度', '航空铝材质'],
      tutorialId: '1',
      isNew: false
    },
    '2': {
      name: 'SHEEN Eye Glow',
      price: 1280,
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
      description: '专为眼周娇嫩肌肤设计，淡化细纹，改善黑眼圈。',
      highlights: ['微电流眼部护理', '恒温热敷', '缓解眼部疲劳', '便携设计'],
      specs: ['感应开关', 'USB充电', '轻量化机身', '抗菌材质'],
      tutorialId: '2',
      isNew: false
    },
    '3': {
      name: 'SHEEN Ice Mini',
      price: 899,
      img: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=600',
      description: '物理冰敷，收缩毛孔，镇静肌肤，晒后修复好帮手。',
      highlights: ['一键制冷', '物理降温', '无需充电', '全身可用'],
      specs: ['航空级铝材', '人体工学设计', '防滑手柄', '易于清洁'],
      tutorialId: '3',
      isNew: false
    },
    '4': {
      name: 'SHEEN Max Pro',
      price: 4500,
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=600',
      description: '全能旗舰，集射频、微电流、光疗于一体，给您院线级的护理体验。',
      highlights: ['多极射频', '智能变频', '光疗嫩肤', 'APP智能互联'],
      specs: ['无线充电底座', '蓝宝石导头', '高清显示屏', 'IPX6防水'],
      tutorialId: '3',
      isNew: false
    },
    'new-1': {
      name: 'SHEEN Pro Max',
      price: 4500,
      img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=800',
      description: '全光谱抗衰巅峰之作，多维轮廓重塑。集成了最新的超声波与双频射频技术。',
      highlights: ['双频射频能量', '脉冲电极技术', '琥珀光深度修复', 'AI 自适应算法'],
      specs: ['黄金涂层导头', '无线磁吸充电', '5级精细调节', '蓝宝石冷却'],
      tutorialId: '3',
      isNew: true
    },
    'new-2': {
      name: 'IceGlow Mini',
      price: 899,
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
      description: '便携随身，-5℃急速冰感，瞬时舒缓收敛。告别早起面部浮肿的秘密武器。',
      highlights: ['半导体制冷技术', '蓝光消炎祛痘', '口袋便携尺寸', '极简单键操作'],
      specs: ['阳极氧化铝', 'Type-C快充', '超轻量化设计', '静音运行'],
      tutorialId: '2',
      isNew: true
    }
  };

  const product = productsDict[id!] || productsDict['1'];

  return (
    <div className="min-h-screen bg-white animate-in slide-in-from-bottom-10 duration-500 pb-32 relative">
      {/* Immersive Product Hero */}
      <div className="relative h-[500px] bg-[#FAF7F2]">
        <button 
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-8 left-6 z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#4A3E3E] shadow-lg active:scale-90 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <img src={product.img} className="w-full h-full object-cover" alt={product.name} />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="px-8 relative -mt-20 bg-white rounded-t-[56px] pt-14 space-y-12">
        {/* Title & Price Header */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              {product.isNew && (
                <span className="inline-block px-3 py-1 bg-[#D7C4B2] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full mb-2">
                  Coming Soon / 限定新品
                </span>
              )}
              <h1 className="text-3xl font-serif text-[#4A3E3E] tracking-tight">{product.name}</h1>
              <p className="text-xs text-[#C0B3A5] font-bold uppercase tracking-[0.2em]">High-End Beauty Tech</p>
            </div>
            <div className="text-2xl font-bold text-[#D7C4B2] font-serif">
              ¥{product.price.toLocaleString()}
            </div>
          </div>
          <p className="text-[#8B7E74] leading-relaxed text-sm italic border-l-2 border-[#F5EBE0] pl-4 py-1">
            "{product.description}"
          </p>
        </div>

        {/* Tab Selection */}
        <div className="space-y-6">
          <div className="flex gap-8 border-b border-[#F5EBE0]">
            <button 
              onClick={() => setActiveInfoTab('intro')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeInfoTab === 'intro' ? 'text-[#4A3E3E]' : 'text-[#C0B3A5]'}`}
            >
              科技解析
              {activeInfoTab === 'intro' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A3E3E] rounded-full animate-in fade-in zoom-in"></div>}
            </button>
            <button 
              onClick={() => setActiveInfoTab('specs')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeInfoTab === 'specs' ? 'text-[#4A3E3E]' : 'text-[#C0B3A5]'}`}
            >
              详细规格
              {activeInfoTab === 'specs' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A3E3E] rounded-full animate-in fade-in zoom-in"></div>}
            </button>
          </div>

          <div className="min-h-[160px]">
            {activeInfoTab === 'intro' ? (
              <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
                {product.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 bg-[#FAF7F2] p-6 rounded-[32px] border border-[#F5EBE0]/50 group hover:border-[#D7C4B2]/30 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#D7C4B2] shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <span className="text-sm font-bold text-[#4A3E3E]">{h}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-2 duration-300">
                {product.specs.map((s: string, i: number) => (
                  <div key={i} className="bg-[#FAF7F2] p-5 rounded-3xl border border-[#F5EBE0]/50 text-xs font-medium text-[#4A3E3E] flex flex-col gap-2">
                    <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-[#C0B3A5]">
                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                    </div>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Tutorial Entry */}
        <div 
          onClick={() => navigate(`/tutorial/${product.tutorialId}`)}
          className="bg-[#4A3E3E] rounded-[40px] p-8 text-white flex justify-between items-center group cursor-pointer active:scale-[0.98] transition-all shadow-2xl shadow-[#4A3E3E]/20"
        >
          <div className="space-y-1">
            <h4 className="text-lg font-serif">探索护理艺术</h4>
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Technique & Ritual</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/></svg>
          </div>
        </div>

        {/* Brand Footer Info */}
        <div className="text-center space-y-4 pt-10 pb-10">
          <p className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-[0.5em]">Defining Elegance</p>
          <div className="w-8 h-[1px] bg-[#F5EBE0] mx-auto"></div>
          <p className="text-[10px] text-[#C0B3A5] leading-relaxed max-w-[200px] mx-auto">
            SHEEN Me 致力于将最前沿的实验室技术转化为您的居家美容礼赞。
          </p>
        </div>
      </div>

      {/* Purchase Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#F5EBE0] px-6 py-4 z-50 flex items-center gap-4">
        <div className="flex flex-col">
            <span className="text-[10px] text-[#C0B3A5] font-bold uppercase">Total Price</span>
            <span className="text-xl font-bold text-[#D7C4B2] font-serif">¥{product.price.toLocaleString()}</span>
        </div>
        <button 
          onClick={() => navigate(`/checkout/${id}`)}
          className="flex-1 bg-[#4A3E3E] text-white py-4 rounded-[24px] font-bold text-sm tracking-widest uppercase shadow-xl active:scale-95 transition-all"
        >
          立即购买
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
