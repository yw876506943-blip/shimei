
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('王小美');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedAge = localStorage.getItem('userAge');
    const savedGender = localStorage.getItem('userGender');
    
    if (savedName) setName(savedName);
    if (savedAge) setAge(Number(savedAge));
    if (savedGender) setGender(savedGender as 'female' | 'male');
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('userName', name);
      if (age) localStorage.setItem('userAge', age.toString());
      localStorage.setItem('userGender', gender);
      setIsSaving(false);
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-right-4 duration-500 pb-12">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="text-[#4A3E3E]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">完善个人资料</h2>
        </div>
      </div>

      <div className="px-8 py-8 flex flex-col items-center gap-8">
        <div className="relative group">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 ring-2 ring-[#F5EBE0]">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-2">
              <label className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest px-1">昵称</label>
              <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded-2xl p-5 border-none shadow-sm text-sm focus:ring-2 ring-[#D7C4B2] outline-none transition-all"
                  placeholder="请输入您的昵称"
              />
          </div>

          <div className="space-y-2">
              <label className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest px-1">年龄</label>
              <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-white rounded-2xl p-5 border-none shadow-sm text-sm focus:ring-2 ring-[#D7C4B2] outline-none transition-all"
                  placeholder="请输入您的实际年龄"
                  min="1"
                  max="120"
              />
          </div>

          <div className="space-y-2">
              <label className="text-[10px] text-[#C0B3A5] font-bold uppercase tracking-widest px-1">性别</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-4 rounded-2xl font-bold transition-all text-sm ${gender === 'female' ? 'bg-[#D7C4B2] text-white shadow-md' : 'bg-white text-[#C0B3A5] shadow-sm'}`}
                >
                  女士
                </button>
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-4 rounded-2xl font-bold transition-all text-sm ${gender === 'male' ? 'bg-[#D7C4B2] text-white shadow-md' : 'bg-white text-[#C0B3A5] shadow-sm'}`}
                >
                  先生
                </button>
              </div>
          </div>
        </div>

        <button 
            onClick={handleSave}
            disabled={isSaving || !age || !name}
            className="w-full bg-[#4A3E3E] text-white py-5 rounded-2xl font-bold tracking-widest shadow-xl active:scale-95 transition-all text-sm mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
        >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : '保存资料'}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
