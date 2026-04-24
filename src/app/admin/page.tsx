'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp, Users, ShoppingCart, Activity, ArrowUpRight, ArrowDownRight,
  Database, ShieldCheck, Zap, Loader2, Package, ShoppingBag, BarChart3,
  Tag, Mail, CreditCard, ArrowRight
} from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const [syncing, setSyncing] = useState(false);

  async function syncDatabase() {
    setSyncing(true);
    try {
      const res = await fetch('/api/setup');
      const json = await res.json();
      alert(`矩阵数据同步完成！已录入 ${json.products} 个硬件组件。`);
      window.location.reload();
    } catch (err) {
      alert('数据同步失败');
    } finally {
      setSyncing(false);
    }
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-zeneio-accent animate-spin" />
        <p className="text-xs font-mono text-white/20 uppercase tracking-widest">正在连接神经链路...</p>
      </div>
    );
  }

  const stats = [
    { label: '营收通量', value: data?.stats?.totalRevenue || '$0.00', trend: '+12.5%', trendUp: true, icon: Zap, description: '累计采购总额' },
    { label: '活跃矩阵', value: data?.stats?.totalOrders || '0', trend: '+3.2%', trendUp: true, icon: Users, description: '总订单数' },
    { label: '库存组件', value: data?.stats?.totalProducts || '0', trend: '实时', trendUp: true, icon: Package, description: '在架产品数' },
    { label: '系统完整性', value: data?.stats?.systemIntegrity || '99.98%', trend: '稳定', trendUp: true, icon: ShieldCheck, description: '端到端加密健康度' },
  ];

  const recentOrders = data?.recentOrders || [];

  const quickLinks = [
    { label: '添加产品', href: '/admin/products', icon: Package, color: '#81D8D0', desc: '上架新组件' },
    { label: '查看订单', href: '/admin/orders', icon: ShoppingBag, color: '#9B87F5', desc: '处理采购' },
    { label: '创建优惠券', href: '/admin/coupons', icon: Tag, color: '#F472B6', desc: '促销活动' },
    { label: '流量分析', href: '/admin/analytics', icon: BarChart3, color: '#FBBF24', desc: '数据看板' },
    { label: 'Paddle 对账', href: '/admin/paddle', icon: CreditCard, color: '#60A5FA', desc: '收款核对' },
    { label: '邮件模板', href: '/admin/email-templates', icon: Mail, color: '#34D399', desc: '自动化邮件' },
  ];

  return (
    <div className="relative z-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            控制中心<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">
            实时监控全球采购指标与系统健康状态
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={syncDatabase}
            disabled={syncing}
            className="glass px-4 py-2 rounded-xl flex items-center gap-2 border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-zeneio-accent hover:bg-zeneio-accent/10 transition-all"
          >
            <Database size={14} className={syncing ? 'animate-spin' : ''} />
            {syncing ? '同步中...' : '同步数据'}
          </button>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-3 border-white/5">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-tighter leading-none mb-1">最后同步</span>
              <span className="text-[11px] font-mono text-white/70 leading-none">
                {new Date().toLocaleDateString('zh-CN')} {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
              <Activity size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: any, i: number) => (
          <div key={i} className="glass p-6 rounded-2xl border-white/5 group hover:border-zeneio-accent/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-zeneio-accent/10 group-hover:text-zeneio-accent transition-all">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                stat.trendUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {stat.trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white mb-1">{stat.value}</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 mb-2">{stat.label}</p>
            <p className="text-[9px] font-mono text-white/20 border-t border-white/5 pt-2">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickLinks.map((link, i) => (
          <Link key={i} href={link.href}
            className="glass p-5 rounded-2xl border-white/5 hover:border-white/10 transition-all group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: link.color + '20', color: link.color }}>
              <link.icon size={18} />
            </div>
            <p className="text-xs font-bold text-white/80 mb-0.5">{link.label}</p>
            <p className="text-[10px] text-white/30">{link.desc}</p>
            <ArrowRight size={12} className="text-white/10 group-hover:text-white/30 mt-2 transition-all" />
          </Link>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-white/80">最近采购</h2>
          <Link href="/admin/orders" className="text-xs font-bold text-zeneio-accent/60 hover:text-zeneio-accent transition-colors uppercase tracking-widest">
            查看全部 →
          </Link>
        </div>
        <div className="glass rounded-2xl overflow-hidden border-white/5">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">
                <th className="px-6 py-4">参考 ID</th>
                <th className="px-6 py-4">客户</th>
                <th className="px-6 py-4">产品</th>
                <th className="px-6 py-4">金额</th>
                <th className="px-6 py-4 text-right">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <ShoppingCart className="w-8 h-8 text-white/10 mx-auto mb-3" />
                    <p className="text-xs font-mono text-white/20 uppercase">暂无订单数据</p>
                  </td>
                </tr>
              ) : recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-xs font-mono text-zeneio-accent/70">{order.id.slice(0, 20)}...</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-white/70">{order.user}</span>
                  </td>
                  <td className="px-6 py-5 text-sm text-white/50">{order.product}</td>
                  <td className="px-6 py-5 text-sm font-bold text-white/80">{order.amount}</td>
                  <td className="px-6 py-5 text-right">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-400' :
                      order.status === 'PROCESSING' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {order.status === 'DELIVERED' ? '已送达' : order.status === 'PROCESSING' ? '处理中' : order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
