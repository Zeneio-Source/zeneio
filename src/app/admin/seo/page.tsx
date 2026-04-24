'use client';

import React, { useState } from 'react';
import {
  Search, Save, Edit2, AlertTriangle, Check
} from 'lucide-react';

interface ProductSEO {
  id: string;
  name: string;
  slug: string;
  metaTitle: string;
  metaDesc: string;
  tags: string[];
}

const SAMPLE_PRODUCTS: ProductSEO[] = [
  { id: '1', name: 'ZENEIO Pulse Pro', slug: 'zeneio-pulse-pro', metaTitle: 'ZENEIO Pulse Pro — Premium Body-Safe Massager', metaDesc: 'Shop the ZENEIO Pulse Pro: medical-grade silicone, IPX7 waterproof, whisper-quiet motor. Free discreet shipping on orders over $99.', tags: ['massager', 'body-safe', 'premium'] },
  { id: '2', name: 'ZENEIO Whisper Mini', slug: 'zeneio-whisper-mini', metaTitle: '', metaDesc: '', tags: [] },
  { id: '3', name: 'ZENEIO Arc Classic', slug: 'zeneio-arc-classic', metaTitle: '', metaDesc: '', tags: [] },
];

function titleLen(t: string) { return t.length; }
function descLen(d: string) { return d.length; }

export default function SEOPage() {
  const [products, setProducts] = useState<ProductSEO[]>(SAMPLE_PRODUCTS);
  const [editId, setEditId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formTags, setFormTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');

  function startEdit(p: ProductSEO) {
    setEditId(p.id);
    setFormTitle(p.metaTitle);
    setFormDesc(p.metaDesc);
    setFormTags([...p.tags]);
  }

  function save() {
    if (!editId) return;
    setProducts(ps => ps.map(p => p.id === editId ? { ...p, metaTitle: formTitle, metaDesc: formDesc, tags: formTags } : p));
    setEditId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (!t || formTags.includes(t)) return;
    setFormTags([...formTags, t]);
    setTagInput('');
  }

  function removeTag(tag: string) {
    setFormTags(formTags.filter(t => t !== tag));
  }

  const filtered = products.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            产品 SEO<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">
            优化每个产品的 Meta Title / Description / Tags
          </p>
        </div>
        <button onClick={save} disabled={!editId}
          className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest disabled:opacity-50">
          {saved ? <><Check size={16} /> 已保存 ✓</> : <><Save size={16} /> 保存更改</>}
        </button>
      </div>

      <div className="glass p-5 rounded-xl border-zeneio-accent/20 bg-zeneio-accent/5 text-xs text-white/40">
        💡 Google 推荐 Title 50-60 字符，Description 150-160 字符。良好的 SEO 可提升自然搜索排名。
      </div>

      <div className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
        <Search size={18} className="text-white/20" />
        <input type="text" placeholder="搜索产品..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none" />
      </div>

      <div className="space-y-4">
        {filtered.map(p => (
          <div key={p.id} className="glass rounded-2xl border-white/5 p-6">
            {editId === p.id ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white/60">{p.name}</p>
                  <button onClick={() => setEditId(null)} className="text-xs text-white/30 hover:text-white/60">取消</button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Meta Title</label>
                    <span className={`text-[10px] font-mono ${titleLen(formTitle) > 60 ? 'text-red-400' : titleLen(formTitle) > 50 ? 'text-amber-400' : 'text-green-400'}`}>
                      {titleLen(formTitle)}/60
                    </span>
                  </div>
                  <input value={formTitle} onChange={e => setFormTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50"
                    placeholder="输入 SEO 标题..." />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Meta Description</label>
                    <span className={`text-[10px] font-mono ${descLen(formDesc) > 160 ? 'text-red-400' : descLen(formDesc) > 150 ? 'text-amber-400' : 'text-green-400'}`}>
                      {descLen(formDesc)}/160
                    </span>
                  </div>
                  <textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50 resize-none"
                    placeholder="输入 SEO 描述..." />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formTags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-zeneio-accent/10 text-zeneio-accent border border-zeneio-accent/20">
                        {tag} <button onClick={() => removeTag(tag)} className="hover:text-red-400 ml-1">×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-zeneio-accent/50"
                      placeholder="输入后回车添加 tag..." />
                    <button onClick={addTag} className="px-4 py-2 rounded-xl bg-zeneio-accent/10 text-zeneio-accent text-xs font-bold hover:bg-zeneio-accent/20 transition-all">添加</button>
                  </div>
                </div>

                <button onClick={save}
                  className="btn-accent w-full py-3 rounded-xl text-sm font-bold uppercase tracking-widest">
                  保存 SEO 设置
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-sm font-bold text-white/80">{p.name}</p>
                    <span className="text-[10px] font-mono text-white/20">{p.slug}</span>
                  </div>
                  {p.metaTitle ? (
                    <div className="space-y-1">
                      <p className="text-xs text-zeneio-accent/70 truncate">{p.metaTitle}</p>
                      <p className="text-[10px] text-white/30 line-clamp-2">{p.metaDesc}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {p.tags.map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">{t}</span>)}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-amber-400 flex items-center gap-1">
                      <AlertTriangle size={12} /> 未设置 SEO 信息
                    </p>
                  )}
                </div>
                <button onClick={() => startEdit(p)}
                  className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-zeneio-accent transition-all flex-shrink-0">
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
