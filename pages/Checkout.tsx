
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Address, Order, OrderStatus } from '../types';

const Checkout: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wechat');

  // Unified product data (simplified for demo)
  const products: Record<string, any> = {
    '1': { name: 'SHEENME M1 Pro', price: 2980, img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=200' },
    '2': { name: 'SHEEN Eye Glow', price: 1280, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=200' },
    '3': { name: 'SHEEN Ice Mini', price: 899, img: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=200' },
    '4': { name: 'SHEEN Max Pro', price: 4500, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=200' },
    'new-1': { name: 'SHEEN Pro Max', price: 4500, img: 'https://images.unsplash.com/photo-1590156221122-c446210140aa?auto=format&fit=crop&q=80&w=200' },
    'new-2': { name: 'IceGlow Mini', price: 899, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=200' },
  };

  const product = products[id!] || products['1'];

  useEffect(() => {
    const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    const defaultAddr = addresses.find((a: Address) => a.isDefault) || addresses[0];
    setAddress(defaultAddr || null);
  }, []);

  const handlePay = () => {
    if (!address) {
        // navigate to address management to add one
        if(window.confirm('您还没有收货地址，是否前往添加？')) {
            navigate('/address');
        }
        return;
    }
    
    setIsPaying(true);
    setTimeout(() => {
        const newOrder: Order = {
            id: `ORD-${Date.now().toString().slice(-8)}`,
            productId: id || '1',
            productName: product.name,
            productImage: product.img,
            price: product.price,
            status: OrderStatus.PROCESSING,
            orderTime: new Date().toLocaleString(),
            address: address,
            trackingNumber: `SF${Date.now().toString().slice(-8)}`,
            logistics: [{ time: new Date().toLocaleString(), status: '订单已创建，等待发货' }]
        };
        
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([newOrder, ...orders]));
        
        setIsPaying(false);
        navigate('/orders');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-32 animate-in slide-in-from-right-4 duration-500">
        <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-[#4A3E3E]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="text-xl font-serif text-[#4A3E3E]">确认订单</h2>
            </div>
        </div>

        <div className="px-6 py-6 space-y-6">
            {/* Address Section */}
            <div 
                onClick={() => navigate('/address')}
                className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F5EBE0]/50 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer"
            >
                {address ? (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                             <span className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#D7C4B2]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                             </span>
                             <span className="font-bold text-[#4A3E3E] text-lg">{address.name}</span>
                             <span className="text-sm text-[#8B7E74]">{address.phone}</span>
                        </div>
                        <p className="text-sm text-[#8B7E74] pl-10">{address.region} {address.detail}</p>
                    </div>
                ) : (
                     <div className="flex items-center gap-4 text-[#C0B3A5]">
                        <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                        </div>
                        <span className="font-bold">请添加收货地址</span>
                     </div>
                )}
                <svg className="w-5 h-5 text-[#D7C4B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Product Card */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F5EBE0]/50 flex gap-4">
                <img src={product.img} className="w-24 h-24 rounded-2xl object-cover bg-[#F5EBE0]" alt={product.name} />
                <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                        <h3 className="font-bold text-[#4A3E3E] text-lg">{product.name}</h3>
                        <p className="text-xs text-[#C0B3A5] uppercase tracking-widest">Standard Edition</p>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-xs text-[#8B7E74]">x 1</span>
                        <span className="font-bold text-[#D7C4B2] text-xl font-serif">¥{product.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
             <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F5EBE0]/50 space-y-4">
                <h4 className="text-xs font-bold text-[#C0B3A5] uppercase tracking-widest">支付方式</h4>
                <div 
                    onClick={() => setPaymentMethod('wechat')}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${paymentMethod === 'wechat' ? 'border-[#07C160] bg-[#07C160]/5' : 'border-[#F5EBE0]'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#07C160] flex items-center justify-center text-white">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5,13.5A1.5,1.5 0 0,1 7,15A1.5,1.5 0 0,1 5.5,13.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 8.5,13.5M13.5,13.5A1.5,1.5 0 0,1 12,15A1.5,1.5 0 0,1 10.5,13.5A1.5,1.5 0 0,1 12,12A1.5,1.5 0 0,1 13.5,13.5M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2Z" /></svg>
                        </div>
                        <span className="font-bold text-[#4A3E3E]">微信支付</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'wechat' ? 'border-[#07C160] bg-[#07C160]' : 'border-[#C0B3A5]'}`}>
                        {paymentMethod === 'wechat' && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                    </div>
                </div>
             </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#F5EBE0] px-6 py-4 z-50 flex items-center justify-between">
            <div className="space-y-0.5">
                <p className="text-xs text-[#C0B3A5]">Total Payment</p>
                <p className="text-2xl font-bold text-[#D7C4B2] font-serif">¥{product.price.toLocaleString()}</p>
            </div>
            <button 
                onClick={handlePay}
                disabled={isPaying}
                className="w-40 bg-[#4A3E3E] text-white py-4 rounded-[24px] font-bold text-sm tracking-widest uppercase shadow-xl active:scale-95 transition-all flex items-center justify-center"
            >
                {isPaying ? (
                     <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : '立即支付'}
            </button>
        </div>
    </div>
  );
};

export default Checkout;
