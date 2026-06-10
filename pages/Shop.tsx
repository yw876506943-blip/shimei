
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [mainCategory, setMainCategory] = useState<'device' | 'skincare'>('device');
  const [subCategory, setSubCategory] = useState<string>('all');
  
  const products = [
    { id: '1', name: 'SHEENME M1 Pro', price: 2980, img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=600', tag: '旗舰爆款', category: 'device', subCategory: 'SHEENME M1 Pro' },
    { id: '2', name: 'SHEEN Eye Glow', price: 1280, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600', tag: '眼部专研', category: 'device', subCategory: 'SHEEN Eye Glow' },
    { id: '3', name: 'SHEEN Ice Mini', price: 899, img: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=600', tag: '便携随身', category: 'device', subCategory: 'SHEEN Ice Mini' },
    { id: '4', name: 'SHEEN Max Pro', price: 4500, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=600', tag: '顶奢护肤', category: 'device', subCategory: 'SHEEN Max Pro' },
    { id: '5', name: '护肤传导凝胶 100g', price: 199, img: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600', tag: '仪器伴侣', category: 'skincare', subCategory: '凝胶' },
    { id: '6', name: '抗皱赋活精华液 30ml', price: 399, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600', tag: '深层抗老', category: 'skincare', subCategory: '精华液' },
    { id: '7', name: '深海巨藻保湿面膜 5片装', price: 159, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600', tag: '急救补水', category: 'skincare', subCategory: '面膜' },
    { id: '8', name: '焕颜紧致修护面霜 50g', price: 580, img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600', tag: '彻夜修护', category: 'skincare', subCategory: '面霜' },
  ];

  const filteredProducts = products.filter(p => {
      const matchMain = p.category === mainCategory;
      const matchSub = subCategory === 'all' || p.subCategory === subCategory;
      return matchMain && matchSub;
  });
  
  return (
    <div className="px-6 space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="mt-4 flex justify-between items-end">
        <div className="space-y-1">
            <h2 className="text-2xl font-serif text-[#4A3E3E]">SHEEN 甄选商城</h2>
            <p className="text-xs text-[#C0B3A5] uppercase tracking-widest font-bold">Technological Beauty Collection</p>
        </div>
      </div>

      <div className="flex gap-3">
          <div className="relative flex-1">
            <select
              value={mainCategory}
              onChange={(e) => {
                  setMainCategory(e.target.value as 'device' | 'skincare');
                  setSubCategory('all');
              }}
              className="w-full appearance-none bg-white border border-[#F5EBE0]/50 text-[#4A3E3E] text-sm font-bold rounded-2xl py-3.5 pl-4 pr-10 outline-none focus:border-[#D7C4B2] transition-colors shadow-sm"
            >
              <option value="device">美容仪器</option>
              <option value="skincare">护肤耗材</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A39A92]">
              <ChevronDown size={18} />
            </div>
          </div>

          <div className="relative flex-1">
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-[#F5EBE0]/50 text-[#4A3E3E] text-sm font-bold rounded-2xl py-3.5 pl-4 pr-10 outline-none focus:border-[#D7C4B2] transition-colors shadow-sm"
            >
              {mainCategory === 'device' ? (
                  <>
                      <option value="all">全部型号</option>
                      <option value="SHEENME M1 Pro">SHEENME M1 Pro</option>
                      <option value="SHEEN Eye Glow">SHEEN Eye Glow</option>
                      <option value="SHEEN Ice Mini">SHEEN Ice Mini</option>
                      <option value="SHEEN Max Pro">SHEEN Max Pro</option>
                  </>
              ) : (
                  <>
                      <option value="all">全部耗材</option>
                      <option value="精华液">精华液</option>
                      <option value="面膜">面膜</option>
                      <option value="面霜">面霜</option>
                      <option value="凝胶">凝胶</option>
                  </>
              )}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A39A92]">
              <ChevronDown size={18} />
            </div>
          </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredProducts.map(p => (
          <div 
            key={p.id} 
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-[#F5EBE0]/50 group active:scale-[0.98] transition-all"
          >
            <div className="h-64 relative overflow-hidden bg-[#FDFBF9]">
              <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold text-[#D7C4B2] tracking-widest shadow-sm">
                {p.tag}
              </div>
            </div>
            <div className="p-8 flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#4A3E3E] font-serif">{p.name}</h3>
                <p className="text-[#D7C4B2] font-bold text-lg">¥{p.price.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#F5EBE0] flex items-center justify-center text-[#D7C4B2] shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
