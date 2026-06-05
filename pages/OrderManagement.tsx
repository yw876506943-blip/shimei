
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../types';

const OrderManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderStatus>(OrderStatus.PROCESSING);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Add some mock orders if empty for demo
    if (savedOrders.length === 0) {
      const mockOrders: Order[] = [
        {
          id: 'ORD-A1B2C3D4',
          productId: '2',
          productName: 'SHEEN Eye Glow',
          productImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=200',
          price: 1280,
          status: OrderStatus.COMPLETED,
          orderTime: '2024-10-20 14:30',
          trackingNumber: 'SF100200300'
        },
        {
            id: 'ORD-X9Y8Z7W6',
            productId: '3',
            productName: 'SHEEN Ice Mini',
            productImage: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=200',
            price: 899,
            status: OrderStatus.REFUNDED,
            orderTime: '2024-09-15 09:12',
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem('orders', JSON.stringify(mockOrders));
    } else {
      // patch existing orders to have tracking number if missing for demo purposes
      const patchedOrders = savedOrders.map((o: Order) => ({
        ...o,
        trackingNumber: o.trackingNumber || `SF${Math.floor(Math.random() * 100000000)}`
      }));
      setOrders(patchedOrders);
      localStorage.setItem('orders', JSON.stringify(patchedOrders));
    }
  }, []);

  const filteredOrders = orders.filter(o => o.status === activeTab);

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PROCESSING: return '进行中';
      case OrderStatus.COMPLETED: return '已完成';
      case OrderStatus.REFUNDED: return '已退款';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-10">
      <div className="bg-white px-6 pt-2 pb-4 shadow-sm sticky top-0 z-10 border-b border-[#F5EBE0]/50">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/profile')} className="text-[#4A3E3E]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-xl font-serif text-[#4A3E3E]">我的订单</h2>
        </div>
        
        <div className="flex justify-between bg-[#FAF7F2] p-1 rounded-2xl">
          {[OrderStatus.PROCESSING, OrderStatus.COMPLETED, OrderStatus.REFUNDED].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === tab ? 'bg-white text-[#D7C4B2] shadow-sm' : 'text-[#C0B3A5]'}`}
            >
              {getStatusLabel(tab)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
            <svg className="w-16 h-16 text-[#C0B3A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <p className="text-sm font-medium text-[#C0B3A5]">暂无订单数据</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-[32px] p-6 border border-[#F5EBE0]/50 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-[#F5EBE0]/30 pb-4">
                <span className="text-[10px] text-[#C0B3A5] font-bold tracking-widest">{order.id}</span>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${order.status === OrderStatus.PROCESSING ? 'bg-blue-50 text-blue-400' : order.status === OrderStatus.COMPLETED ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                   {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="flex gap-4">
                <img src={order.productImage} className="w-20 h-20 rounded-2xl object-cover bg-[#FAF7F2]" alt={order.productName} />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <h4 className="font-bold text-[#4A3E3E]">{order.productName}</h4>
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] text-[#C0B3A5]">{order.orderTime}</p>
                    <p className="font-bold text-[#D7C4B2]">¥{order.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="bg-[#FAF7F2] rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-[#D7C4B2]">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            <span className="text-[10px] font-bold uppercase tracking-widest">物流信息</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="text-[10px] font-bold text-[#8B7E74]">{order.trackingNumber}</span>
                             <button
                                 onClick={() => {
                                     navigator.clipboard.writeText(order.trackingNumber || '').then(() => {
                                          if(window.confirm('快递单号已复制，是否打开快递100网页版（模拟小程序跳转）？')) {
                                              window.open(`https://m.kuaidi100.com/result.jsp?nu=${order.trackingNumber}`, '_blank');
                                          }
                                     }).catch(() => {
                                          if(window.confirm('复制失败，是否直接打开快递100查询？')) {
                                              window.open(`https://m.kuaidi100.com/result.jsp?nu=${order.trackingNumber}`, '_blank');
                                          }
                                     });
                                 }}
                                 className="px-2 py-1 bg-white shadow-sm border border-[#F5EBE0] text-[#D7C4B2] rounded text-[10px] font-bold active:scale-95 transition-transform"
                             >
                                 查询快递
                             </button>
                        </div>
                    </div>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                {order.status === OrderStatus.PROCESSING && (
                    <button className="px-6 py-2 rounded-xl text-[10px] font-bold border border-[#F5EBE0] text-[#8B7E74]">
                        修改地址
                    </button>
                )}
                <button className="px-6 py-2 rounded-xl text-[10px] font-bold bg-[#FAF7F2] text-[#D7C4B2] border border-[#F5EBE0]">
                    查看详情
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
