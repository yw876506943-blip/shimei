
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewProducts: React.FC = () => {
  const navigate = useNavigate();
  const products = [
    { id: 'new-1', name: 'SHEEN Pro Max', desc: '全光谱抗衰美容仪', price: 4500, img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=600', tag: 'NEW' },
    { id: 'new-2', name: 'IceGlow Mini', desc: '随时随地的冰感护理', price: 899, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600', tag: 'TRENDING' }
  ];

  return (
    <div className="px-6 space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="space-y-1 mt-4">
        <h2 className="text-2xl font-serif text-[#4A3E3E]">新品推荐</h2>
        <p className="text-xs text-[#C0B3A5] uppercase tracking-widest">Seasonal Highlights</p>
      </div>

      <div className="space-y-6 pb-4">
        {products.map((p) => (
          <div 
            key={p.id} 
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-[#F5EBE0]/50 active:scale-[0.98] transition-all cursor-pointer group"
          >
            <div className="h-64 bg-[#F5EBE0] relative overflow-hidden">
              <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
              <div className="absolute top-4 left-4 bg-[#D7C4B2] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                {p.tag}
              </div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-bold text-[#4A3E3E] text-lg">{p.name}</h3>
                <p className="text-sm text-[#8B7E74]">{p.desc}</p>
                <p className="text-[#D7C4B2] font-bold text-sm mt-1">¥{p.price.toLocaleString()}</p>
              </div>
              <button className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#F5EBE0] flex items-center justify-center text-[#D7C4B2] shadow-inner group-hover:bg-[#D7C4B2] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
