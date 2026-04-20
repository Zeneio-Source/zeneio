'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Database,
  ShieldCheck,
  Zap,
  Loader2
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
        <p className="text-xs font-mono text-white/20 uppercase tracking-widest">正在连接神经链路 (初始化)...</p>
      </div>
    );
  }

  const stats = [
    { 
      label: '营收通量', 
      value: data?.stats?.totalRevenue || '$0.00', 
      trend: '+12.5%', 
      trendUp: true, 
      icon: Zap,
      description: '累计采购总额'
    },
    { 
      label: '活跃矩阵', 
      value: '1,284', 
      trend: '+3.2%', 
      trendUp: true, 
      icon: Users,
      description: '实时神经流量监测'
    },
    { 
      label: '采购日志', 
      value: data?.stats?.totalOrders || '0', 
      trend: '累计', 
      trendUp: true, 
      icon: ShoppingCart,
      description: '成功完成的安全交付'
    },
    { 
      label: '系统完整性', 
      value: data?.stats?.systemIntegrity || '100%', 
      trend: '稳定', 
      trendUp: true, 
      icon: ShieldCheck,
      description: '端到端加密健康度'
    },
  ];

  const recentOrders = data?.recentOrders || [];
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
            {syncing ? '矩阵同步中...' : '同步研究数据'}
          </button>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-3 border-white/5">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-tighter leading-none mb-1">最后同步时间</span>
              <span className="text-[11px] font-mono text-white/70 leading-none">2026.04.19 17:42:05</span>
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

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-white/80">采购日志 (实时)</h2>
            <button className="text-xs font-bold text-zeneio-accent/60 hover:text-zeneio-accent transition-colors uppercase tracking-widest">查看完整日志</button>
          </div>
          <div className="glass rounded-2xl overflow-hidden border-white/5">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">
                  <th className="px-6 py-4">参考 ID</th>
                  <th className="px-6 py-4">主体</th>
                  <th className="px-6 py-4">采购组件</th>
                  <th className="px-6 py-4">价值</th>
                  <th className="px-6 py-4 text-right">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-5">
                      <span className="text-xs font-mono text-zeneio-accent/70">{order.id}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-white/70">{order.user}</span>
                      <p className="text-[10px] text-white/20">{order.time}</p>
                    </td>
                    <td className="px-6 py-5 text-sm text-white/50">{order.product}</td>
                    <td className="px-6 py-5 text-sm font-bold text-white/80">{order.amount}</td>
                    <td className="px-6 py-5 text-right">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        order.status === '已送达' ? 'bg-green-500/10 text-green-400' : 
                        order.status === '处理中' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Right Column */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-white/80">神经状态</h2>
          </div>
          <div className="glass p-8 rounded-2xl border-white/5 space-y-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <Database size={80} />
             </div>
             
             <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/30 uppercase">数据库上行</span>
                   <span className="text-[10px] font-mono text-green-400">已加密保护</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-zeneio-accent w-[92%] animate-pulse" />
                </div>
             </div>

             <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/30 uppercase">API 延迟</span>
                   <span className="text-[10px] font-mono text-white/60">12ms</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-white/20 w-[15%]" />
                </div>
             </div>

             <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-zeneio-accent/5 border border-zeneio-accent/10">
                   <div className="w-8 h-8 rounded-lg bg-zeneio-accent/20 flex items-center justify-center text-zeneio-accent">
                      <ShieldCheck size={18} />
                   </div>
                   <div>
                      <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest leading-none mb-1">PCI 1级安全认证</p>
                      <p className="text-[9px] text-white/30 leading-none">合规性由 Root 验证</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between group cursor-pointer hover:border-zeneio-accent/30 transition-all">
             <div>
                <p className="text-[10px] font-bold text-zeneio-accent uppercase tracking-widest mb-1">发布新组件 (新产品)</p>
                <p className="text-[9px] text-white/20 uppercase font-mono tracking-tighter">进入库存实验室 →</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-zeneio-accent/10 flex items-center justify-center text-zeneio-accent group-hover:scale-110 transition-transform">
                <ArrowUpRight size={20} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
