
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductAuthentication: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'idle' | 'scanning' | 'result'>('idle');

  const startScan = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('result');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-10 animate-in fade-in duration-500">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="text-[#4A3E3E]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">产品验真</h2>
        </div>
      </div>

      <div className="px-6 flex flex-col items-center justify-center py-20 gap-12">
        {step === 'idle' && (
          <>
            <div className="w-64 h-64 bg-white rounded-[48px] border-2 border-dashed border-[#D7C4B2] flex items-center justify-center p-8 group transition-all hover:bg-white shadow-sm">
                <div className="w-full h-full bg-[#FAF7F2] rounded-[32px] flex items-center justify-center">
                    <svg className="w-24 h-24 text-[#D7C4B2] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
                </div>
            </div>
            <div className="text-center space-y-4 max-w-xs">
                <h3 className="text-2xl font-serif text-[#4A3E3E]">扫描防伪码</h3>
                <p className="text-xs text-[#C0B3A5] leading-relaxed font-medium">请扫描包装盒底部的防伪二维码，验证您的 SHEEN 产品真伪及获取联保服务。</p>
            </div>
            <button 
                onClick={startScan}
                className="w-full bg-[#4A3E3E] text-white py-5 rounded-3xl font-bold tracking-[0.2em] shadow-xl active:scale-95 transition-all uppercase text-sm"
            >
                开始扫描
            </button>
          </>
        )}

        {step === 'scanning' && (
          <div className="flex flex-col items-center gap-8 py-20">
             <div className="relative w-64 h-64 bg-white rounded-[48px] overflow-hidden shadow-2xl border-4 border-white">
                <div className="absolute inset-0 bg-[#D7C4B2]/5 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#D7C4B2] shadow-[0_0_20px_#D7C4B2] animate-[scan_2s_ease-in-out_infinite]"></div>
             </div>
             <p className="text-[#D7C4B2] font-bold tracking-[0.3em] animate-pulse">正在验证全球数据库...</p>
          </div>
        )}

        {step === 'result' && (
          <div className="w-full space-y-10 animate-in zoom-in-95 duration-500">
             <div className="bg-white rounded-[48px] p-10 shadow-2xl border border-[#F5EBE0]/50 text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto shadow-inner border border-green-100">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-[#4A3E3E]">验证通过</h3>
                    <p className="text-xs text-[#C0B3A5] uppercase tracking-widest font-bold">Official Certified Product</p>
                </div>
                <div className="bg-[#FAF7F2] p-6 rounded-3xl text-left space-y-3">
                    <div className="flex justify-between text-[10px]">
                        <span className="text-[#C0B3A5]">产品型号:</span>
                        <span className="font-bold text-[#4A3E3E]">SHEENME M1 Pro</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                        <span className="text-[#C0B3A5]">SN 序列号:</span>
                        <span className="font-bold text-[#4A3E3E]">SN-8829-00192</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                        <span className="text-[#C0B3A5]">首次验真:</span>
                        <span className="font-bold text-[#4A3E3E]">2024.11.01 10:24</span>
                    </div>
                </div>
             </div>
             <button 
                onClick={() => navigate('/profile')}
                className="w-full bg-[#4A3E3E] text-white py-5 rounded-3xl font-bold tracking-widest shadow-xl active:scale-95 transition-all text-sm"
             >
                确认并返回
             </button>
          </div>
        )}
      </div>
      <style>{` @keyframes scan { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(256px); } } `}</style>
    </div>
  );
};

export default ProductAuthentication;
