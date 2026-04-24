'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Loader2, Tag, Trash2, Edit2, Copy, Check,
  Percent, DollarSign, X, Clock, Gift, ToggleLeft, ToggleRight
} from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: string;
  minAmount: string | null;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  startsAt: string;
  expiresAt: string | null;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState('');
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    code: '', type: 'PERCENTAGE', value: '', minAmount: '', maxUses: '', expiresAt: ''
  });

  useEffect(() => { fetchCoupons(); }, []);

  function fetchCoupons() {
    fetch('/api/admin/coupons', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setCoupons(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.code.trim()) return;
    setSaving(true);
    try {
      const payload = {
        ...(editCoupon?.id && { id: editCoupon.id }),
        code: form.code.toUpperCase(),
        type: form.type,
        value: Number(form.value),
        minAmount: form.minAmount ? Number(form.minAmount) : null,
        maxUses: form.maxUses ? Number(form.maxUses) : null,
        expiresAt: form.expiresAt || null,
      };
      await fetch('/api/admin/coupons', {
        method: editCoupon ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      fetchCoupons();
      closeForm();
    } catch {}
    setSaving(false);
  }

  async function toggleActive(c: Coupon) {
    await fetch('/api/admin/coupons', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: c.id, isActive: !c.isActive }),
    });
    fetchCoupons();
  }

  async function deleteCoupon(id: string) {
    if (!confirm('确定删除该优惠券？')) return;
    await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' });
    fetchCoupons();
  }

  function openEdit(c: Coupon) {
    setEditCoupon(c);
    setForm({
      code: c.code, type: c.type, value: c.value,
      minAmount: c.minAmount || '', maxUses: c.maxUses?.toString() || '', expiresAt: c.expiresAt?.split('T')[0] || ''
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false); setEditCoupon(null);
    setForm({ code: '', type: 'PERCENTAGE', value: '', minAmount: '', maxUses: '', expiresAt: '' });
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(''), 2000);
  }

  const filtered = coupons.filter(c => !search || c.code.includes(search.toUpperCase()));
  const totalDiscount = 0; // calculated from orders table in production

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            折扣码<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">
            共 {coupons.length} 个优惠券 · {coupons.filter(c => c.isActive).length} 个有效
          </p>
        </div>
        <button onClick={() => { closeForm(); setShowForm(true); }}
          className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest">
          <Plus size={18} /> 创建优惠券
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: '有效券', value: coupons.filter(c => c.isActive).length, color: '#34D399' },
          { label: '已过期', value: coupons.filter(c => !c.isActive || (c.expiresAt && new Date(c.expiresAt) < new Date())).length, color: '#EF4444' },
          { label: '总使用', value: coupons.reduce((s, c) => s + c.usedCount, 0), color: '#FBBF24' },
        ].map((s, i) => (
          <div key={i} className="glass p-5 rounded-2xl border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2">{s.label}</p>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
        <Search size={18} className="text-white/20 flex-shrink-0" />
        <input type="text" placeholder="搜索优惠码..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Coupons List */}
      <div className="space-y-3">
        {loading ? (
          <div className="glass rounded-2xl p-20 text-center border-white/5">
            <Loader2 className="w-8 h-8 text-zeneio-accent animate-spin mx-auto mb-4" />
            <p className="text-xs font-mono text-white/20 uppercase">加载中...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass rounded-2xl p-20 text-center border-white/5">
            <Tag className="w-8 h-8 text-white/10 mx-auto mb-4" />
            <p className="text-xs font-mono text-white/20 uppercase">暂无优惠券</p>
          </div>
        ) : filtered.map(c => {
          const isExpired = c.expiresAt && new Date(c.expiresAt) < new Date();
          return (
            <div key={c.id} className="glass rounded-2xl border-white/5 p-5 hover:border-white/10 transition-all">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-zeneio-accent/10 border border-zeneio-accent/20 flex items-center justify-center flex-shrink-0">
                  {c.type === 'PERCENTAGE' ? <Percent size={20} className="text-zeneio-accent" /> : <DollarSign size={20} className="text-zeneio-accent" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg font-black font-mono text-white">{c.code}</span>
                    {isExpired && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 uppercase">已过期</span>}
                    {!c.isActive && !isExpired && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/30 uppercase">已禁用</span>}
                    {c.isActive && !isExpired && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 uppercase">有效</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                    <span className="font-bold text-zeneio-accent">
                      {c.type === 'PERCENTAGE' ? `${c.value}%` : `$${c.value}`}
                    </span>
                    {c.minAmount && <span>满 ${c.minAmount} 可用</span>}
                    {c.maxUses && <span>限 {c.maxUses} 次</span>}
                    <span>{c.usedCount} 次已使用</span>
                    {c.expiresAt && <span>有效期至 {c.expiresAt.split('T')[0]}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => copyCode(c.code)}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-all" title="复制">
                    {copied === c.code ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                  <button onClick={() => openEdit(c)}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-zeneio-accent transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => toggleActive(c)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-all" title={c.isActive ? '禁用' : '启用'}>
                    {c.isActive ? <ToggleRight size={16} className="text-green-400" /> : <ToggleLeft size={16} className="text-white/20" />}
                  </button>
                  <button onClick={() => deleteCoupon(c.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeForm} />
          <div className="relative z-10 w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">{editCoupon ? '编辑优惠券' : '创建优惠券'}</h2>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-white/5 text-white/40"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">优惠码</label>
                <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono font-black text-white tracking-widest focus:outline-none focus:border-zeneio-accent/50 uppercase"
                  placeholder="SAVE15" maxLength={20} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">类型</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none">
                    <option value="PERCENTAGE" className="bg-[#0a0a0a]">百分比折扣</option>
                    <option value="FIXED" className="bg-[#0a0a0a]">固定金额</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">值</label>
                  <input type="number" step="0.01" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none"
                    placeholder={form.type === 'PERCENTAGE' ? '15' : '10.00'} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">最低消费 (USD)</label>
                  <input type="number" step="0.01" value={form.minAmount} onChange={e => setForm(f => ({ ...f, minAmount: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none" placeholder="可选" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">使用次数上限</label>
                  <input type="number" value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none" placeholder="不限" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">过期日期</label>
                <input type="date" value={form.expiresAt} onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full btn-accent py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Gift size={14} />}
                {saving ? '保存中...' : editCoupon ? '更新优惠券' : '创建优惠券'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
