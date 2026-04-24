'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Users, ShoppingCart, DollarSign, Eye, Clock,
  ArrowUpRight, ArrowDownRight, Loader2, BarChart3, Globe, Target, PieChart
} from 'lucide-react';

interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: any;
  description: string;
  color: string;
}

// Simulated analytics data — replace with real Google Analytics / Plausible API integration
const SIMULATED_DATA = {
  visitors: 4829,
  pageviews: 12847,
  conversionRate: 2.4,
  topProducts: [
    { name: 'ZENEIO Pulse Pro', views: 1847, orders: 42, revenue: 5418 },
    { name: 'ZENEIO Whisper Mini', views: 1204, orders: 31, revenue: 3100 },
    { name: 'ZENEIO Arc Classic', views: 987, orders: 18, revenue: 1800 },
    { name: 'ZENEIO Duo Set', views: 762, orders: 15, revenue: 2247 },
    { name: 'ZENEIO Flex Ring', views: 541, orders: 9, revenue: 720 },
  ],
  trafficSources: [
    { source: 'Organic Search', visits: 2104, pct: 43.6, color: '#81D8D0' },
    { source: 'Direct', visits: 1104, pct: 22.9, color: '#9B87F5' },
    { source: 'Social Media', visits: 724, pct: 15.0, color: '#F472B6' },
    { source: 'Referral', visits: 482, pct: 10.0, color: '#FBBF24' },
    { source: 'Email', visits: 287, pct: 5.9, color: '#60A5FA' },
    { source: 'Paid Ads', visits: 128, pct: 2.6, color: '#34D399' },
  ],
  topCountries: [
    { country: 'United States', visitors: 1820, pct: 37.7 },
    { country: 'United Kingdom', visitors: 724, pct: 15.0 },
    { country: 'Canada', visitors: 412, pct: 8.5 },
    { country: 'Australia', visitors: 287, pct: 5.9 },
    { country: 'Germany', visitors: 196, pct: 4.1 },
    { country: 'Others', visitors: 1390, pct: 28.8 },
  ],
  weeklyData: [
    { day: 'Mon', visitors: 620, orders: 14 },
    { day: 'Tue', visitors: 710, orders: 18 },
    { day: 'Wed', visitors: 680, orders: 16 },
    { day: 'Thu', visitors: 820, orders: 22 },
    { day: 'Fri', visitors: 740, orders: 19 },
    { day: 'Sat', visitors: 540, orders: 12 },
    { day: 'Sun', visitors: 719, orders: 15 },
  ],
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with real GA4 / Plausible API fetch
    setTimeout(() => setLoading(false), 800);
  }, []);

  const data = SIMULATED_DATA;
  const maxVisitors = Math.max(...data.weeklyData.map(d => d.visitors));
  const totalRevenue = data.topProducts.reduce((s, p) => s + p.revenue, 0);

  const stats: StatCard[] = [
    { label: '独立访客', value: data.visitors.toLocaleString(), trend: '+12.4%', trendUp: true, icon: Users, description: '本周 vs 上周', color: '#81D8D0' },
    { label: '页面浏览', value: data.pageviews.toLocaleString(), trend: '+8.7%', trendUp: true, icon: Eye, description: '本周总计', color: '#9B87F5' },
    { label: '转化率', value: `${data.conversionRate}%`, trend: '+0.3%', trendUp: true, icon: Target, description: '访客→下单', color: '#F472B6' },
    { label: '本周营收', value: `$${totalRevenue.toLocaleString()}`, trend: '+18.2%', trendUp: true, icon: DollarSign, description: '最近7天', color: '#FBBF24' },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-zeneio-accent animate-spin" />
        <p className="text-xs font-mono text-white/20 uppercase tracking-widest">正在加载流量数据...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            流量分析<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">数据基于最近7天</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded-xl border-white/5 text-xs text-white/30 font-mono">
            更新: {new Date().toLocaleDateString('zh-CN')}
          </div>
          <a href="https://analytics.google.com" target="_blank" rel="noopener"
            className="glass px-4 py-2 rounded-xl border-white/5 text-xs font-bold text-zeneio-accent hover:bg-zeneio-accent/10 transition-all">
            Google Analytics ↗
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="glass p-5 rounded-2xl border-white/5 group hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.color + '20', color: s.color }}>
                <s.icon size={16} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${s.trendUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {s.trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {s.trend}
              </div>
            </div>
            <h3 className="text-xl font-black text-white mb-0.5">{s.value}</h3>
            <p className="text-[10px] font-bold tracking-wider uppercase text-white/20 mb-1">{s.label}</p>
            <p className="text-[9px] text-white/20">{s.description}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 glass p-6 rounded-2xl border-white/5">
          <h3 className="text-sm font-bold text-white/60 mb-6 flex items-center gap-2">
            <BarChart3 size={14} /> 本周趋势
          </h3>
          <div className="space-y-3">
            {data.weeklyData.map((d, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-white/30 w-6">{d.day}</span>
                <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden relative">
                  <div className="h-full rounded-lg flex items-center px-2" style={{ width: `${(d.visitors / maxVisitors) * 100}%`, background: 'linear-gradient(90deg, rgba(129,216,208,0.3), rgba(129,216,208,0.15))' }}>
                    <span className="text-[10px] font-bold text-zeneio-accent">{d.visitors.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/40 w-16 text-right">{d.orders} 单</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="glass p-6 rounded-2xl border-white/5">
          <h3 className="text-sm font-bold text-white/60 mb-6 flex items-center gap-2">
            <Globe size={14} /> 流量来源
          </h3>
          <div className="space-y-4">
            {data.trafficSources.map((s, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/60">{s.source}</span>
                  <span className="text-xs font-mono text-white/40">{s.visits.toLocaleString()} ({s.pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Countries */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="glass p-6 rounded-2xl border-white/5">
          <h3 className="text-sm font-bold text-white/60 mb-6 flex items-center gap-2">
            <TrendingUp size={14} /> 热销产品
          </h3>
          <div className="space-y-3">
            {data.topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <span className="text-xs font-black text-white/20 w-4">#{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white/80">{p.name}</p>
                  <p className="text-[10px] text-white/30">{p.views.toLocaleString()} 浏览 · {p.orders} 订单</p>
                </div>
                <span className="text-sm font-bold text-zeneio-accent">${p.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="glass p-6 rounded-2xl border-white/5">
          <h3 className="text-sm font-bold text-white/60 mb-6 flex items-center gap-2">
            <Globe size={14} /> 访客地区
          </h3>
          <div className="space-y-3">
            {data.topCountries.map((c, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <span className="text-xs font-black text-white/20 w-4">#{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white/80">{c.country}</p>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-zeneio-accent/50 rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
                <span className="text-xs font-mono text-white/40">{c.visitors.toLocaleString()} ({c.pct}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GA4 Setup Note */}
      <div className="glass p-6 rounded-2xl border-zeneio-accent/20 bg-zeneio-accent/5">
        <h3 className="text-sm font-bold text-zeneio-accent mb-2">📊 接入真实数据</h3>
        <p className="text-xs text-white/40 leading-relaxed">
          当前为模拟数据。接入真实 Google Analytics 4：添加 <code className="text-zeneio-accent/70 bg-white/5 px-1 py-0.5 rounded font-mono">NEXT_PUBLIC_GA_ID</code> 到环境变量，或接入 Plausible / Umami 等隐私友好的分析工具。
        </p>
      </div>
    </div>
  );
}
