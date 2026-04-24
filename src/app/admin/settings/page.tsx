'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings, Save, Loader2, Key, Globe, Bell, Shield,
  Mail, Database, ExternalLink, Copy, Check, AlertTriangle
} from 'lucide-react';

const SECTIONS = ['General', 'Payment', 'Shipping', 'Notifications', 'API Keys', 'Danger Zone'];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('General');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState('');
  const [settings, setSettings] = useState({
    // General
    storeName: 'ZENEIO',
    storeEmail: 'support@zeneio.com',
    storeUrl: 'https://zeneio.com',
    currency: 'USD',
    // Payment
    paddleVendorId: '',
    paddleApiKey: '',
    // Shipping
    freeShippingThreshold: '99',
    defaultShippingCost: '9.99',
    discreetPackaging: true,
    // Notifications
    orderNotificationEmail: 'support@zeneio.com',
    lowStockAlert: '10',
    newOrderAlert: true,
    // API
    paddleWebhookSecret: '',
  });

  function save() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  }

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            系统设置<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">配置商店运营参数</p>
        </div>
        <button onClick={save} disabled={saving}
          className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest disabled:opacity-50">
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
          {saving ? '保存中...' : saved ? '已保存 ✓' : '保存设置'}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col gap-1 w-48 flex-shrink-0">
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setActiveSection(s)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeSection === s ? 'bg-zeneio-accent/10 text-zeneio-accent' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-8">
          {activeSection === 'General' && (
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border-white/5 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">商店信息</h3>
                {[
                  { key: 'storeName', label: '商店名称', placeholder: 'ZENEIO' },
                  { key: 'storeEmail', label: '联系邮箱', placeholder: 'support@zeneio.com', type: 'email' },
                  { key: 'storeUrl', label: '商店 URL', placeholder: 'https://zeneio.com' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">{f.label}</label>
                    <input type={f.type || 'text'} value={(settings as any)[f.key]} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50" placeholder={f.placeholder} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">结算货币</label>
                  <select value={settings.currency} onChange={e => setSettings(s => ({ ...s, currency: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none">
                    <option value="USD" className="bg-[#0a0a0a]">USD — US Dollar</option>
                    <option value="EUR" className="bg-[#0a0a0a]">EUR — Euro</option>
                    <option value="GBP" className="bg-[#0a0a0a]">GBP — British Pound</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Payment' && (
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border-white/5 space-y-5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Paddle 配置</h3>
                  <a href="https://vendors.paddle.com" target="_blank" rel="noopener" className="text-zeneio-accent text-xs hover:underline flex items-center gap-1">文档 <ExternalLink size={10} /></a>
                </div>
                {[
                  { key: 'paddleVendorId', label: 'Paddle Vendor ID', placeholder: '12345' },
                  { key: 'paddleApiKey', label: 'Paddle API Key', placeholder: '...', type: 'password' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">{f.label}</label>
                    <div className="relative">
                      <input type={f.type || 'text'} value={(settings as any)[f.key]} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-10 text-sm text-white font-mono focus:outline-none focus:border-zeneio-accent/50" placeholder={f.placeholder} />
                      <button onClick={() => copy((settings as any)[f.key], f.key)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                        {copied === f.key ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'Shipping' && (
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border-white/5 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">运费规则</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">免运费门槛 (USD)</label>
                    <input type="number" value={settings.freeShippingThreshold} onChange={e => setSettings(s => ({ ...s, freeShippingThreshold: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">默认运费 (USD)</label>
                    <input type="number" step="0.01" value={settings.defaultShippingCost} onChange={e => setSettings(s => ({ ...s, defaultShippingCost: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50" />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-12 h-7 rounded-full transition-all ${settings.discreetPackaging ? 'bg-green-500' : 'bg-white/10'}`}
                       onClick={() => setSettings(s => ({ ...s, discreetPackaging: !s.discreetPackaging }))}>
                    <div className={`w-5 h-5 mt-1 rounded-full bg-white shadow transition-all ${settings.discreetPackaging ? 'ml-6' : 'ml-1'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/70">默认启用隐私包装</p>
                    <p className="text-xs text-white/30">所有订单默认使用 plain unmarked box</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'Notifications' && (
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border-white/5 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">通知设置</h3>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">订单通知邮箱</label>
                  <input type="email" value={settings.orderNotificationEmail} onChange={e => setSettings(s => ({ ...s, orderNotificationEmail: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">库存预警阈值</label>
                  <input type="number" value={settings.lowStockAlert} onChange={e => setSettings(s => ({ ...s, lowStockAlert: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50" />
                  <p className="text-[10px] text-white/20 mt-1">库存低于此数量时发送预警</p>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-12 h-7 rounded-full transition-all ${settings.newOrderAlert ? 'bg-green-500' : 'bg-white/10'}`}
                       onClick={() => setSettings(s => ({ ...s, newOrderAlert: !s.newOrderAlert }))}>
                    <div className={`w-5 h-5 mt-1 rounded-full bg-white shadow transition-all ${settings.newOrderAlert ? 'ml-6' : 'ml-1'}`} />
                  </div>
                  <span className="text-sm font-bold text-white/70">新订单邮件通知</span>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'API Keys' && (
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border-white/5 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Webhook 密钥</h3>
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                    <AlertTriangle size={12} /> 安全提示
                  </div>
                  <p className="text-xs text-white/40">Webhook 密钥用于验证 Paddle 回调请求的安全性。请勿泄露给他人。</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Paddle Webhook Secret</label>
                  <div className="relative">
                    <input type="password" value={settings.paddleWebhookSecret} onChange={e => setSettings(s => ({ ...s, paddleWebhookSecret: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-10 text-sm text-white font-mono focus:outline-none focus:border-zeneio-accent/50" placeholder="Paddle webhook signing secret" />
                    <button onClick={() => copy(settings.paddleWebhookSecret, 'webhook')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                      {copied === 'webhook' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Danger Zone' && (
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border-red-500/20 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-400">危险操作区</h3>
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <p className="text-sm font-bold text-white/80 mb-1">清除所有测试订单</p>
                  <p className="text-xs text-white/40 mb-3">删除所有 PENDING 状态的订单，仅用于清理测试数据</p>
                  <button className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all">
                    确认清除
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
