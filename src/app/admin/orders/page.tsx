'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Loader2,
  ShoppingCart,
  Eye
} from 'lucide-react';

export default function AcquisitionLogs() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
        console.error('Expected array but got:', data);
      }
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = Array.isArray(orders) ? orders.filter(o => 
    (o.id && o.id.toLowerCase().includes(search.toLowerCase())) || 
    (o.customerEmail && o.customerEmail.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  function formatDate(dateString: string) {
    try {
      if (!dateString) return '---';
      return new Date(dateString).toLocaleString('zh-CN');
    } catch (e) {
      return '---';
    }
  }

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            采购日志<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">
            监控实时交易、发货状态与隐私协议执行情况
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="通过订单 ID、客户 ID 搜索..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass rounded-2xl overflow-hidden border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">
              <th className="px-6 py-4">订单参考 ID</th>
              <th className="px-6 py-4">采购主体</th>
              <th className="px-6 py-4">金额</th>
              <th className="px-6 py-4">下单时间</th>
              <th className="px-6 py-4">协议状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                   <Loader2 className="w-8 h-8 text-zeneio-accent animate-spin mx-auto mb-4" />
                   <p className="text-xs font-mono text-white/20 uppercase">正在同步采购日志...</p>
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                   <ShoppingCart className="w-8 h-8 text-white/10 mx-auto mb-4" />
                   <p className="text-xs font-mono text-white/20 uppercase">未发现采购记录</p>
                </td>
              </tr>
            ) : filteredOrders.map((order: any) => (
              <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-6 py-5">
                  <span className="text-xs font-mono text-zeneio-accent/70">{order.id}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-white/70">{order.customerEmail ? order.customerEmail.split('@')[0] : '匿名用户'}</span>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-white/80">${Number(order.totalAmount || 0).toFixed(2)}</td>
                <td className="px-6 py-5 text-sm text-white/40">{formatDate(order.createdAt)}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-400' : 
                      order.status === 'PROCESSING' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {order.status === 'DELIVERED' ? '已送达' : 
                       order.status === 'PROCESSING' ? '处理中' : 
                       order.status === 'SHIPPED' ? '已发货' : '待处理'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-zeneio-accent transition-all">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
