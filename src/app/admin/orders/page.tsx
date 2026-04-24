'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Loader2, ShoppingCart, Eye, Filter, ArrowUpRight,
  Clock, CheckCircle, Truck, XCircle, Package
} from 'lucide-react';

const STATUS_OPTS = [
  { key: '', label: '全部', icon: Package, color: 'text-white/40', bg: 'bg-white/5' },
  { key: 'PENDING', label: '待处理', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { key: 'PAID', label: '已付款', icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { key: 'SHIPPED', label: '已发货', icon: Truck, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { key: 'DELIVERED', label: '已送达', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
  { key: 'CANCELLED', label: '已取消', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
];

function formatDate(d: string) {
  try { return new Date(d).toLocaleString('zh-CN'); } catch { return '---'; }
}

export default function AcquisitionLogs() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => { fetchOrders(); }, []);

  function fetchOrders() {
    fetch('/api/admin/orders', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setOrders(data); })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }

  async function updateStatus(id: string, status: string) {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch {}
  }

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || (o.customerEmail || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || o.status === statusFilter;
    const matchDate = (!dateFrom || new Date(o.createdAt) >= new Date(dateFrom)) && (!dateTo || new Date(o.createdAt) <= new Date(dateTo + 'T23:59:59'));
    return matchSearch && matchStatus && matchDate;
  });

  const totalRevenue = filtered.reduce((s, o) => s + Number(o.totalAmount || 0), 0);

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            采购日志<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">
            {filtered.length} 条记录 · 筛选营收 ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-4 rounded-2xl border-white/5 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input
            type="text"
            placeholder="搜索订单ID或邮箱..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <input
          type="date"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white/50 focus:outline-none"
        />
        <span className="text-white/20 text-xs">至</span>
        <input
          type="date"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white/50 focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTS.map(opt => (
            <button key={opt.key} onClick={() => setStatusFilter(opt.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${statusFilter === opt.key ? `${opt.bg} ${opt.color} border border-current/20` : 'bg-white/5 text-white/30 hover:bg-white/10 border border-transparent'}`}>
              <opt.icon size={10} /> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">
              <th className="px-6 py-4">订单参考 ID</th>
              <th className="px-6 py-4">客户</th>
              <th className="px-6 py-4">金额</th>
              <th className="px-6 py-4">下单时间</th>
              <th className="px-6 py-4">快递</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-20 text-center">
                <Loader2 className="w-8 h-8 text-zeneio-accent animate-spin mx-auto mb-4" />
                <p className="text-xs font-mono text-white/20 uppercase">正在同步采购日志...</p>
              </td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-20 text-center">
                <ShoppingCart className="w-8 h-8 text-white/10 mx-auto mb-4" />
                <p className="text-xs font-mono text-white/20 uppercase">未发现采购记录</p>
              </td></tr>
            ) : filtered.map((order) => {
              const cfg = STATUS_OPTS.find(c => c.key === order.status) || STATUS_OPTS[0];
              return (
                <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-xs font-mono text-zeneio-accent/70">{order.id.slice(0, 20)}...</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-white/70">{order.customerEmail ? order.customerEmail.split('@')[0] : '匿名'}</p>
                    <p className="text-[10px] text-white/20">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-white/80">${Number(order.totalAmount || 0).toFixed(2)}</td>
                  <td className="px-6 py-5 text-sm text-white/40">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-5">
                    {order.trackingNumber ? (
                      <p className="text-xs font-mono text-white/50">{order.carrier || '-'}<br/><span className="text-zeneio-accent/60">{order.trackingNumber.slice(0, 16)}...</span></p>
                    ) : <span className="text-[10px] text-white/20">-</span>}
                  </td>
                  <td className="px-6 py-5">
                    <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border-0 cursor-pointer ${cfg.bg} ${cfg.color}`}>
                      {STATUS_OPTS.filter(o => o.key !== '').map(o => <option key={o.key} value={o.key} className="bg-[#0a0a0a]">{o.label}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1 p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-zeneio-accent transition-all">
                      <Eye size={14} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
