
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setIsDone(true);
    }, 1500);
  };

  if (isDone) {
    return (
        <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-10 gap-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#D7C4B2] shadow-xl border border-[#F5EBE0]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-serif text-[#4A3E3E]">感谢您的反馈</h3>
                <p className="text-xs text-[#C0B3A5] font-medium">您的建议对我们非常重要，我们将尽快改进。</p>
            </div>
            <button onClick={() => navigate('/profile')} className="w-full bg-[#4A3E3E] text-white py-4 rounded-2xl font-bold tracking-widest uppercase text-xs">返回</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="text-[#4A3E3E]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">意见反馈</h2>
        </div>
      </div>

      <div className="px-6 py-10 space-y-8">
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C0B3A5] uppercase tracking-widest px-1">您想对我们说什么？</h4>
            <textarea 
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="请输入您的反馈意见，SHEEN 致力于为您提供更好的体验..."
                className="w-full h-48 bg-white rounded-[32px] p-8 text-sm border-none shadow-sm focus:ring-2 ring-[#D7C4B2] transition-all resize-none"
            ></textarea>
        </div>

        <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C0B3A5] uppercase tracking-widest px-1">上传图片 (可选)</h4>
            <button className="w-24 h-24 bg-white rounded-3xl border-2 border-dashed border-[#F5EBE0] flex items-center justify-center text-[#F5EBE0] shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </button>
        </div>

        <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
            className="w-full bg-[#4A3E3E] text-white py-5 rounded-3xl font-bold tracking-widest shadow-xl active:scale-95 disabled:opacity-50 transition-all uppercase text-sm mt-10"
        >
            {isSubmitting ? '提交中...' : '提交反馈'}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
