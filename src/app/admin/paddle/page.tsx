'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3, TrendingUp, TrendingDown, Loader2, DollarSign,
  CheckCircle, AlertCircle, Clock, RefreshCw, ExternalLink, ArrowRight
} from 'lucide-react';

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  fee: number;
  net: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  customerEmail: string;
  createdAt: string;
}

// Simulated Paddle transactions — replace with Paddle Transactions API
const SIMULATED_TRANSACTIONS: Transaction[] = [
  { id: 'txn_1', orderId: 'order_abc123', amount: 129.99, fee: 4.55, net: 125.44, currency: 'USD', status: 'completed', customerEmail: 'alice@example.com', createdAt: '2026-04-19' },
  { id: 'txn_2', orderId: 'order_def456', amount: 79.99, fee: 2.80, net: 77.19, currency: 'USD', status: 'completed', customerEmail: 'bob@email.com', createdAt: '2026-04-18' },
  { id: 'txn_3', orderId: 'order_ghi789', amount: 199.99, fee: 7.00, net: 192.99, currency: 'USD', status: 'pending', customerEmail: 'carol@example.com', createdAt: '2026-04-17' },
  { id: 'txn_4', orderId: 'order_jkl012', amount: 49.99, fee: 1.75, net: 48.24, currency: 'USD', status: 'completed', customerEmail: 'david@mail.com', createdAt: '2026-04-16' },
  { id: 'txn_5', orderId: 'order_mno345', amount: 89.99, fee: 3.15, net: 86.84, currency: 'USD', status: 'failed', customerEmail: 'emma@demo.com', createdAt: '2026-04-15' },
];

export default function PaddleReconciliationPage() {
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  const txns = SIMULATED_TRANSACTIONS;
  const totalGross = txns.filter(t => t.status === 'completed').reduce((s, t) => s + t.amount, 0);
  const totalFees = txns.filter(t => t.status === 'completed').reduce((s, t) => s + t.fee, 0);
  const totalNet = totalGross - totalFees;
  const pendingAmount = txns.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  const failedAmount = txns.filter(t => t.status === 'failed').reduce((s, t) => s + t.amount, 0);
  const successRate = txns.length > 0 ? (txns.filter(t => t.status === 'completed').length / txns.length * 100).toFixed(1) : '0';

  const filtered = txns.filter(t => {
    if (dateFrom && t.createdAt < dateFrom) return false;
    if (dateTo && t.createdAt > dateTo) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-zeneio-accent animate-spin" />
        <p className="text-xs font-mono text-white/20 uppercase tracking-widest">同步 Paddle 交易数据...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            Paddle 对账<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">交易记录与收款核对</p>
        </div>
        <a href="https://vendors.paddle.com/transactions" target="_blank" rel="noopener"
          className="glass px-4 py-2.5 rounded-xl border-white/5 text-xs font-bold text-zeneio-accent hover:bg-zeneio-accent/10 transition-all flex items-center gap-2">
          Paddle Dashboard <ExternalLink size={12} />
        </a>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: '总收入', value: `$${totalGross.toFixed(2)}`, icon: DollarSign, color: '#34D399', trend: '+12%' },
          { label: '手续费', value: `-$${totalFees.toFixed(2)}`, icon: TrendingDown, color: '#EF4444', trend: '' },
          { label: '实际到账', value: `$${totalNet.toFixed(2)}`, icon: CheckCircle, color: '#81D8D0', trend: '+8%' },
          { label: '待确认', value: `$${pendingAmount.toFixed(2)}`, icon: Clock, color: '#FBBF24', trend: '' },
          { label: '失败金额', value: `-$${failedAmount.toFixed(2)}`, icon: AlertCircle, color: '#EF4444', trend: '' },
        ].map((s, i) => (
          <div key={i} className="glass p-5 rounded-2xl border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">{s.label}</span>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
            {s.trend && <p className="text-[10px] text-green-400 font-bold mt-1">{s.trend} vs 上月</p>}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass p-4 rounded-2xl border-white/5 flex flex-wrap items-center gap-4">
        <span className="text-xs text-white/30 font-bold uppercase tracking-widest">日期筛选</span>
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white/50 focus:outline-none" />
        <span className="text-white/20 text-xs">至</span>
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white/50 focus:outline-none" />
        <span className="text-xs text-white/30 ml-auto">{filtered.length} 笔交易</span>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-green-400 font-bold">{successRate}% 成功率</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass rounded-2xl overflow-hidden border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">
              <th className="px-6 py-4">Paddle 交易 ID</th>
              <th className="px-6 py-4">订单 ID</th>
              <th className="px-6 py-4">客户</th>
              <th className="px-6 py-4">金额</th>
              <th className="px-6 py-4">手续费</th>
              <th className="px-6 py-4">实际到账</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">日期</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(txn => (
              <tr key={txn.id} className="hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4"><span className="text-xs font-mono text-zeneio-accent/70">{txn.id}</span></td>
                <td className="px-6 py-4"><span className="text-xs font-mono text-white/50">{txn.orderId}</span></td>
                <td className="px-6 py-4"><span className="text-xs text-white/70">{txn.customerEmail}</span></td>
                <td className="px-6 py-4"><span className="text-sm font-bold text-white/80">${txn.amount.toFixed(2)}</span></td>
                <td className="px-6 py-4"><span className="text-xs text-red-400">-${txn.fee.toFixed(2)}</span></td>
                <td className="px-6 py-4"><span className="text-sm font-bold text-green-400">${txn.net.toFixed(2)}</span></td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    txn.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                    txn.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {txn.status === 'completed' ? '已完成' : txn.status === 'pending' ? '待确认' : '失败'}
                  </span>
                </td>
                <td className="px-6 py-4"><span className="text-xs text-white/40">{txn.createdAt}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Integration Note */}
      <div className="glass p-5 rounded-xl border-zeneio-accent/20 bg-zeneio-accent/5">
        <h3 className="text-sm font-bold text-zeneio-accent mb-2">📊 接入 Paddle Transactions API</h3>
        <p className="text-xs text-white/40 leading-relaxed">
          当前为模拟数据。接入真实 Paddle API：在 <code className="text-zeneio-accent/70 bg-white/5 px-1 py-0.5 rounded font-mono">PADDLE_VENDOR_ID</code> 和 <code className="text-zeneio-accent/70 bg-white/5 px-1 py-0.5 rounded font-mono">PADDLE_API_KEY</code> 环境变量中配置凭证，然后调用 Paddle 的 <code className="text-zeneio-accent/70 bg-white/5 px-1 py-0.5 rounded font-mono">GET /transactions</code> 接口获取真实交易数据。
        </p>
      </div>
    </div>
  );
}
