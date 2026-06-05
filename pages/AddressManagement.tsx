
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Address } from '../types';

const AddressManagement: React.FC = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [smartText, setSmartText] = useState('');

  // New Address Form State
  const [form, setForm] = useState<Partial<Address>>({
    name: '', phone: '', region: '上海市 浦东新区', detail: '', isDefault: false
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('addresses') || '[]');
    setAddresses(saved);
  }, []);

  const parseSmartText = () => {
    let text = smartText.trim();
    if (!text) return;

    let parsedPhone = '';
    const phoneMatch = text.match(/(1[3-9]\d{9})/);
    if (phoneMatch) {
      parsedPhone = phoneMatch[1];
      text = text.replace(parsedPhone, ' ');
    }

    // Split remaining text into tokens
    let tokens = text.split(/[\s,，。]+/);
    
    let parsedName = '';
    let parsedRegion = '';
    let parsedDetail = '';

    // Filter empty tokens
    tokens = tokens.filter(t => t.length > 0);
    
    // Attempt to extract name
    const nameIndex = tokens.findIndex(t => t.length >= 2 && t.length <= 4 && !/[\d省市区县镇村弄号室]/.test(t));
    if (nameIndex !== -1) {
        parsedName = tokens[nameIndex];
        tokens.splice(nameIndex, 1);
    } else if (tokens.length > 0 && tokens[0].length <= 4) {
        parsedName = tokens[0];
        tokens.splice(0, 1);
    }
    
    const remainingText = tokens.join(' ');
    // Attempt to split region and detail
    const regionMatch = remainingText.match(/.*?(省|自治区|市).*?(市|州|区|县)/);
    
    if (regionMatch) {
        parsedRegion = remainingText.substring(0, regionMatch.index! + regionMatch[0].length);
        parsedDetail = remainingText.substring(regionMatch.index! + regionMatch[0].length).trim();
    } else {
        parsedDetail = remainingText;
    }

    setForm(prev => ({
      ...prev,
      name: parsedName || prev.name,
      phone: parsedPhone || prev.phone,
      region: parsedRegion || prev.region,
      detail: parsedDetail || prev.detail
    }));
    setSmartText('');
  };

  const saveAddress = () => {
    if (!form.name || !form.phone || !form.detail) {
      alert('请完善地址信息');
      return;
    }
    const newAddr: Address = {
      id: Math.random().toString(36).substr(2, 9),
      name: form.name!,
      phone: form.phone!,
      region: form.region!,
      detail: form.detail!,
      isDefault: form.isDefault || addresses.length === 0
    };

    let updated = [...addresses];
    if (newAddr.isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }
    updated.push(newAddr);
    
    setAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated));
    setIsAdding(false);
    setForm({ name: '', phone: '', region: '上海市 浦东新区', detail: '', isDefault: false });
  };

  const deleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-10">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#4A3E3E]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">地址管理</h2>
        </div>
      </div>

      <div className="px-6 py-8 space-y-4">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white rounded-[32px] p-6 border border-[#F5EBE0]/50 shadow-sm relative group">
             <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-[#4A3E3E]">{addr.name}</span>
                    <span className="text-[#8B7E74] text-sm">{addr.phone}</span>
                </div>
                {addr.isDefault && (
                    <span className="text-[10px] bg-[#D7C4B2] text-white px-2 py-0.5 rounded-full font-bold">默认</span>
                )}
             </div>
             <p className="text-xs text-[#8B7E74] leading-relaxed mb-4">{addr.region} {addr.detail}</p>
             <div className="flex justify-end gap-4 border-t border-[#F5EBE0]/30 pt-4">
                <button onClick={() => deleteAddress(addr.id)} className="text-[10px] text-red-300 font-bold uppercase tracking-widest">删除</button>
                <button className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest">编辑</button>
             </div>
          </div>
        ))}

        {isAdding ? (
          <div className="bg-white rounded-[32px] p-8 border border-[#D7C4B2]/30 shadow-xl space-y-4 animate-in slide-in-from-bottom-4">
             {/* Smart Fill Section */}
             <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#F5EBE0] space-y-3">
                 <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-[#8B7E74] flex items-center gap-1">
                         <svg className="w-4 h-4 text-[#D7C4B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                         智能识别填写
                     </span>
                     <button
                        onClick={parseSmartText}
                        disabled={!smartText.trim()}
                        className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${smartText.trim() ? 'bg-[#D7C4B2] text-white shadow-sm' : 'bg-white text-[#C0B3A5]'}`}
                     >
                         自动填写
                     </button>
                 </div>
                 <textarea 
                    placeholder="粘贴如：张三，18800000000，上海市浦东新区世纪大道1号" 
                    className="w-full bg-transparent text-sm border-none focus:ring-0 p-0 h-16 resize-none text-[#4A3E3E] placeholder:text-[#C0B3A5]"
                    value={smartText} 
                    onChange={e => setSmartText(e.target.value)}
                 ></textarea>
             </div>

             <input 
                type="text" placeholder="收货人姓名" 
                className="w-full bg-[#FAF7F2] p-4 rounded-2xl text-sm border-none focus:ring-2 ring-[#D7C4B2]" 
                value={form.name} onChange={e => setForm({...form, name: e.target.value})}
             />
             <input 
                type="text" placeholder="手机号码" 
                className="w-full bg-[#FAF7F2] p-4 rounded-2xl text-sm border-none focus:ring-2 ring-[#D7C4B2]"
                value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
             />
             <input 
                type="text" placeholder="省市区" 
                className="w-full bg-[#FAF7F2] p-4 rounded-2xl text-sm border-none focus:ring-2 ring-[#D7C4B2]"
                value={form.region} onChange={e => setForm({...form, region: e.target.value})}
             />
             <textarea 
                placeholder="详细地址 (街道、楼牌号)" 
                className="w-full bg-[#FAF7F2] p-4 rounded-2xl text-sm border-none focus:ring-2 ring-[#D7C4B2] h-24"
                value={form.detail} onChange={e => setForm({...form, detail: e.target.value})}
             ></textarea>
             <div className="flex items-center gap-3 px-1">
                <input 
                    type="checkbox" 
                    checked={form.isDefault} 
                    onChange={e => setForm({...form, isDefault: e.target.checked})}
                    className="w-5 h-5 rounded border-[#F5EBE0] text-[#D7C4B2]"
                />
                <span className="text-xs text-[#8B7E74]">设为默认地址</span>
             </div>
             <div className="flex gap-4 pt-4">
                <button onClick={() => setIsAdding(false)} className="flex-1 py-4 text-[#C0B3A5] font-bold">取消</button>
                <button onClick={saveAddress} className="flex-2 bg-[#D7C4B2] text-white py-4 px-10 rounded-2xl font-bold shadow-lg shadow-[#D7C4B2]/30">保存并使用</button>
             </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full py-6 border-2 border-dashed border-[#D7C4B2]/30 rounded-[32px] text-[#D7C4B2] font-bold flex items-center justify-center gap-2 hover:bg-[#D7C4B2]/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            新增收货地址
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressManagement;
