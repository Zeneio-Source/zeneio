'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail, Save, Loader2, Eye, Edit2, Send, TestTube, ArrowLeft, ArrowRight
} from 'lucide-react';

const DEFAULT_TEMPLATES = [
  {
    key: 'order_confirmation',
    label: '订单确认',
    subject: 'Your ZENEIO Order #{{order_id}} is Confirmed',
    desc: '客户付款成功后自动发送',
    vars: ['{{order_id}}', '{{customer_name}}', '{{product_names}}', '{{total_amount}}'],
    body: `Hi {{customer_name}},

Thank you for your order from ZENEIO!

Order #{{order_id}}
{{product_names}}

Total: \${total_amount}}

We'll send you a shipping notification once your discreet package is on its way.

Your Privacy Guaranteed: All orders ship in plain, unmarked boxes.

— The ZENEIO Team`,
  },
  {
    key: 'shipping_notification',
    label: '发货通知',
    subject: 'Your ZENEIO Package is on the Way!',
    desc: '填写快递单号后发送',
    vars: ['{{order_id}}', '{{tracking_number}}', '{{carrier}}', '{{estimated_delivery}}'],
    body: `Hi there,

Great news — your ZENEIO order has been shipped!

Tracking Number: {{tracking_number}}
Carrier: {{carrier}}
Estimated Delivery: {{estimated_delivery}}

Track your package: {{tracking_url}}

Your package will arrive in a plain, unmarked box. We never include any adult content indicators on the exterior.

— The ZENEIO Team`,
  },
  {
    key: 'refund_confirmed',
    label: '退款确认',
    subject: 'Your ZENEIO Refund is Being Processed',
    desc: '退款审核通过后发送',
    vars: ['{{order_id}}', '{{refund_amount}}', '{{customer_name}}'],
    body: `Hi {{customer_name}},

We've processed your refund request for order #{{order_id}}.

Refund Amount: \${refund_amount}}
Processing Time: 5-10 business days (depending on your payment provider)

If you have any questions, please reply to this email. We're here to help.

— The ZENEIO Team`,
  },
  {
    key: 'welcome',
    label: '欢迎邮件',
    subject: 'Welcome to ZENEIO — Explore Your Pleasure',
    desc: '新用户注册后发送',
    vars: ['{{customer_name}}', '{{discount_code}}'],
    body: `Hi {{customer_name}},

Welcome to ZENEIO — where technology meets intimacy.

Use code {{discount_code}} for 15% off your first order.

As a member, you'll enjoy:
✓ Exclusive early access to new products
✓ Member-only discounts and offers
✓ Expert wellness guides and tips

Shop now: zeneio.com

— The ZENEIO Team`,
  },
];

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [activeKey, setActiveKey] = useState(DEFAULT_TEMPLATES[0].key);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<{ subject: string; body: string }>({ subject: '', body: '' });

  const active = templates.find(t => t.key === activeKey)!;

  useEffect(() => {
    setForm({ subject: active.subject, body: active.body });
  }, [activeKey, editing]);

  function save() {
    setSaving(true);
    setTimeout(() => {
      setTemplates(ts => ts.map(t => t.key === activeKey ? { ...t, ...form } : t));
      setEditing(null);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  }

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            邮件模板<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">配置自动发送邮件内容与文案</p>
        </div>
        <button onClick={save} disabled={saving || editing !== activeKey}
          className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest disabled:opacity-50">
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <span>✓ 已保存</span> : <Save size={16} />}
          {saving ? '保存中...' : saved ? '已保存 ✓' : '保存模板'}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Template List */}
        <div className="w-56 flex-shrink-0 space-y-2">
          {templates.map(t => (
            <button key={t.key} onClick={() => { setActiveKey(t.key); setEditing(null); }}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                activeKey === t.key ? 'bg-zeneio-accent/10 border border-zeneio-accent/30' : 'hover:bg-white/5 border border-transparent'
              }`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${activeKey === t.key ? 'text-zeneio-accent' : 'text-white/50'}`}>{t.label}</p>
              <p className="text-[10px] text-white/20 mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 space-y-6">
          <div className="glass p-6 rounded-2xl border-white/5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">{active.label}</h3>
                <p className="text-xs text-white/30">{active.desc}</p>
              </div>
              <button onClick={() => setEditing(editing === activeKey ? null : activeKey)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                  editing === activeKey ? 'bg-zeneio-accent/10 text-zeneio-accent' : 'bg-white/5 text-white/40 hover:text-white/70'
                }`}>
                {editing === activeKey ? '预览模式' : '编辑模板'}
              </button>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">邮件主题</label>
              <input
                value={editing === activeKey ? form.subject : active.subject}
                onChange={e => { setEditing(activeKey); setForm(f => ({ ...f, subject: e.target.value })); }}
                readOnly={editing !== activeKey}
                className={`w-full rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all ${
                  editing === activeKey ? 'bg-white/5 border border-zeneio-accent/50 text-white' : 'bg-transparent border border-transparent text-white/60'
                }`}
              />
            </div>

            {/* Variables Info */}
            <div className="p-3 rounded-xl bg-zeneio-accent/5 border border-zeneio-accent/10">
              <p className="text-[10px] font-bold text-zeneio-accent uppercase tracking-wider mb-2">可用变量</p>
              <div className="flex flex-wrap gap-2">
                {active.vars.map(v => (
                  <span key={v} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-white/50">{v}</span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">邮件正文</label>
              <textarea
                value={editing === activeKey ? form.body : active.body}
                onChange={e => { setEditing(activeKey); setForm(f => ({ ...f, body: e.target.value })); }}
                readOnly={editing !== activeKey}
                rows={16}
                className={`w-full rounded-xl py-3 px-4 text-sm focus:outline-none transition-all resize-none ${
                  editing === activeKey ? 'bg-white/5 border border-zeneio-accent/50 text-white/90' : 'bg-transparent border border-transparent text-white/60'
                }`}
              />
            </div>

            {/* Preview */}
            {editing !== activeKey && (
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-white/5">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">邮件预览</p>
                <div className="text-xs text-white/50 leading-relaxed whitespace-pre-wrap font-mono">
                  {active.body.replace(/\{\{(\w+)\}\}/g, (m) => {
                    const demos: Record<string, string> = { customer_name: 'John', order_id: 'ORD-12345', product_names: 'ZENEIO Pulse Pro', total_amount: '129.99', tracking_number: '1Z999AA10123456784', carrier: 'FedEx', discount_code: 'WELCOME15' };
                    const key = m.replace(/\{\{|\}\}/g, '');
                    return demos[key] || m;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
