'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock,
  Loader2, Save, MapPin, User, Mail, CreditCard, FileText
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  PENDING:   { label: '待处理',   color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Clock },
  PAID:      { label: '已付款',   color: 'text-blue-400',   bg: 'bg-blue-500/10',   icon: CreditCard },
  SHIPPED:   { label: '已发货',   color: 'text-orange-400', bg: 'bg-orange-500/10', icon: Truck },
  DELIVERED: { label: '已送达',   color: 'text-green-400',  bg: 'bg-green-500/10',  icon: CheckCircle },
  CANCELLED: { label: '已取消',   color: 'text-red-400',    bg: 'bg-red-500/10',    icon: XCircle },
};

const CARRIERS = ['USPS', 'FedEx', 'UPS', 'DHL', 'Royal Mail', 'Canada Post', 'Australia Post', 'Other'];

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editTracking, setEditTracking] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/orders/${id}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setOrder(data);
          setTrackingNumber(data.trackingNumber || '');
          setCarrier(data.carrier || '');
          setNotes(data.notes || '');
          setNewStatus(data.status);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  async function saveChanges() {
    if (!order) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          trackingNumber,
          carrier,
          notes,
        }),
      });
      const data = await res.json();
      setOrder(data);
      setEditTracking(false);
    } catch {
      alert('保存失败');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-zeneio-accent animate-spin" />
        <p className="text-xs font-mono text-white/20 uppercase tracking-widest">加载订单数据...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-white/30 text-sm">订单不存在</p>
        <button onClick={() => router.push('/houtai/orders')} className="mt-4 text-zeneio-accent text-sm font-bold">返回订单列表</button>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;

  return (
    <div className="space-y-8 relative z-10 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button onClick={() => router.push('/houtai/orders')} className="flex items-center gap-2 text-white/30 hover:text-white/60 text-xs font-bold uppercase tracking-widest mb-4 transition-colors">
            <ArrowLeft size={14} /> 采购日志
          </button>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            订单详情<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-mono">{order.id}</p>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${statusCfg.bg} ${statusCfg.color}`}>
            <statusCfg.icon size={12} /> {statusCfg.label}
          </span>
          <p className="text-xs text-white/30 mt-2 font-mono">
            {new Date(order.createdAt).toLocaleString('zh-CN')}
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Status Selector */}
        <div className="glass p-6 rounded-2xl border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">更新状态</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setNewStatus(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  newStatus === key ? `${cfg.bg} ${cfg.color} border` : 'bg-white/5 text-white/30 hover:bg-white/10 border border-transparent'
                }`}
              >
                <cfg.icon size={12} /> {cfg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Info */}
          <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30">
              <User size={14} /> 客户信息
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <Mail size={14} className="text-white/30 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">邮箱</p>
                  <p className="text-sm text-white/70">{order.customerEmail}</p>
                </div>
              </div>
              {order.customerName && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <User size={14} className="text-white/30 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">姓名</p>
                    <p className="text-sm text-white/70">{order.customerName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30">
              <MapPin size={14} /> 收货地址
            </h3>
            {order.shippingAddress ? (
              <div className="p-3 rounded-xl bg-white/5 space-y-1">
                <p className="text-sm text-white/70">{order.shippingAddress}</p>
                {order.shippingCity && <p className="text-xs text-white/40">{order.shippingCity}</p>}
                {order.shippingCountry && <p className="text-xs text-white/40">{order.shippingCountry} {order.shippingZip}</p>}
              </div>
            ) : (
              <p className="text-xs text-white/30 italic">暂无地址信息</p>
            )}
          </div>
        </div>

        {/* Shipping Tracking */}
        <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30">
              <Truck size={14} /> 物流信息
            </h3>
            {!editTracking && (
              <button onClick={() => setEditTracking(true)} className="text-xs font-bold text-zeneio-accent hover:text-zeneio-accent/70 transition-colors">
                编辑物流
              </button>
            )}
          </div>

          {editTracking ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-wider mb-2">快递公司</label>
                <select value={carrier} onChange={e => setCarrier(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50">
                  <option value="" className="bg-[#0a0a0a]">选择快递公司</option>
                  {CARRIERS.map(c => <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-wider mb-2">快递单号</label>
                <input value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-mono focus:outline-none focus:border-zeneio-accent/50"
                  placeholder="TRACK123456789" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              {order.carrier ? (
                <>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white/80">{order.carrier}</p>
                    <p className="text-xs font-mono text-zeneio-accent/70">{order.trackingNumber || '暂无单号'}</p>
                  </div>
                  <Truck size={20} className="text-white/20" />
                </>
              ) : (
                <p className="text-xs text-white/30 italic">尚未填写物流信息</p>
              )}
            </div>
          )}

          {editTracking && (
            <div className="flex gap-3">
              <button onClick={() => setEditTracking(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-white/50 hover:bg-white/5 transition-all">取消</button>
              <button onClick={saveChanges} disabled={saving}
                className="btn-accent px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? '保存中...' : '保存物流'}
              </button>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30">
            <FileText size={14} /> 备注
          </h3>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 resize-none"
            placeholder="内部备注，例如：客户要求隐私包装..." />
        </div>

        {/* Order Items */}
        <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">采购组件</h3>
          <div className="space-y-3">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                  <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white/80">{item.product?.name || 'Unknown'}</p>
                  <p className="text-xs text-white/30 font-mono">{item.product?.slug}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white/70">×{item.quantity}</p>
                  <p className="text-xs text-white/30">${Number(item.product?.price || 0).toFixed(2)} × {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-sm font-bold text-white/50 uppercase tracking-wider">订单总额</span>
            <span className="text-2xl font-black text-white">${Number(order.totalAmount || 0).toFixed(2)}</span>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={saveChanges} disabled={saving}
          className="w-full btn-accent py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? '保存中...' : '保存所有更改'}
        </button>
      </div>
    </div>
  );
}
