
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  const products = [
    { id: '1', name: 'SHEENME M1 Pro', price: 2980, img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=600', tag: '旗舰爆款', category: 'device' },
    { id: '2', name: 'SHEEN Eye Glow', price: 1280, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600', tag: '眼部专研', category: 'device' },
    { id: '3', name: 'SHEEN Ice Mini', price: 899, img: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=600', tag: '便携随身', category: 'device' },
    { id: '4', name: 'SHEEN Max Pro', price: 4500, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=600', tag: '顶奢护肤', category: 'device' },
    { id: '5', name: '护肤传导凝胶 100g', price: 199, img: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600', tag: '仪器伴侣', category: 'skincare' },
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);
  
  return (
    <div className="px-6 space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="mt-4 flex justify-between items-end">
        <div className="space-y-1">
            <h2 className="text-2xl font-serif text-[#4A3E3E]">SHEEN 甄选商城</h2>
            <p className="text-xs text-[#C0B3A5] uppercase tracking-widest font-bold">Technological Beauty Collection</p>
        </div>
      </div>

      <div className="flex justify-between bg-white p-1 rounded-2xl shadow-sm border border-[#F5EBE0]/50">
          {[
            { id: 'all', label: '全部商品' },
            { id: 'device', label: '美容仪器' },
            { id: 'skincare', label: '护肤耗材' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === tab.id ? 'bg-[#D7C4B2] text-white shadow-sm' : 'text-[#8B7E74]'}`}
            >
              {tab.label}
            </button>
          ))}
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
