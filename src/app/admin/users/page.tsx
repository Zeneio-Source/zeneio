'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, Search, Mail, Loader2, Shield, UserCheck, Clock, ShoppingBag, Eye
} from 'lucide-react';

export default function UsersPage() {
  const [loading] = useState(false);

  // Mock users — replace with real auth provider / Supabase query
  const [users] = useState([
    { id: '1', email: 'alice@example.com', name: 'Alice M.', orders: 3, totalSpent: 389.97, joinedAt: '2026-01-15', lastOrder: '2026-04-10', status: 'active' },
    { id: '2', email: 'bob@email.com', name: 'Bob T.', orders: 1, totalSpent: 129.99, joinedAt: '2026-02-20', lastOrder: '2026-02-22', status: 'active' },
    { id: '3', email: 'carol@example.com', name: 'Carol S.', orders: 5, totalSpent: 712.45, joinedAt: '2025-11-08', lastOrder: '2026-04-15', status: 'vip' },
    { id: '4', email: 'david@mail.com', name: 'David K.', orders: 2, totalSpent: 259.98, joinedAt: '2026-03-01', lastOrder: '2026-03-15', status: 'active' },
    { id: '5', email: 'emma@demo.com', name: 'Emma W.', orders: 0, totalSpent: 0, joinedAt: '2026-04-18', lastOrder: '-', status: 'new' },
  ]);

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            用户矩阵<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">
            共 {users.length} 位注册用户 · {users.filter(u => u.status !== 'new').length} 位有效客户
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: '总注册', value: users.length, icon: Users, color: '#81D8D0' },
          { label: 'VIP 客户', value: users.filter(u => u.status === 'vip').length, icon: Shield, color: '#FBBF24' },
          { label: '本月新客', value: users.filter(u => u.status === 'new').length, icon: UserCheck, color: '#F472B6' },
        ].map((s, i) => (
          <div key={i} className="glass p-5 rounded-2xl border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.color + '20', color: s.color }}>
                <s.icon size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">{s.label}</span>
            </div>
            <p className="text-2xl font-black text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="glass rounded-2xl overflow-hidden border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">
              <th className="px-6 py-4">用户</th>
              <th className="px-6 py-4">订单数</th>
              <th className="px-6 py-4">累计消费</th>
              <th className="px-6 py-4">注册时间</th>
              <th className="px-6 py-4">最近订单</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zeneio-accent to-zeneio-purple flex items-center justify-center text-xs font-bold text-black">
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/80">{u.name}</p>
                      <p className="text-[10px] text-white/30">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-mono text-white/70">{u.orders}</td>
                <td className="px-6 py-5 text-sm font-bold text-zeneio-accent">${u.totalSpent.toFixed(2)}</td>
                <td className="px-6 py-5 text-xs text-white/40">{u.joinedAt}</td>
                <td className="px-6 py-5 text-xs text-white/40">{u.lastOrder}</td>
                <td className="px-6 py-5">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    u.status === 'vip' ? 'bg-amber-500/10 text-amber-400' :
                    u.status === 'active' ? 'bg-green-500/10 text-green-400' :
                    'bg-white/5 text-white/30'
                  }`}>
                    {u.status === 'vip' ? 'VIP' : u.status === 'active' ? '活跃' : '新用户'}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-zeneio-accent transition-all">
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass p-5 rounded-xl border-zeneio-accent/20 bg-zeneio-accent/5 text-xs text-white/40">
        💡 用户数据通过 Supabase Auth 获取。接入真实用户系统后，此页面将自动显示注册用户列表及购买行为分析。
      </div>
    </div>
  );
}
