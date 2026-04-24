'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Loader2, Image, Save } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  categoryId: string;
  inventory: number;
  isFeatured: boolean;
  isPublished: boolean;
  specs?: any;
  metaTitle?: string;
  metaDesc?: string;
}

interface Props {
  product?: Product | null;
  onClose: () => void;
  onSave: () => void;
}

const DEFAULT_SPECS = {
  material: '',
  battery: '',
  motor: '',
  waterproof: '',
  noise: '',
  charging: '',
  size: '',
  weight: '',
};

export default function ProductFormModal({ product, onClose, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [specs, setSpecs] = useState<Record<string, string>>(DEFAULT_SPECS);
  const [form, setForm] = useState<Product>({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
    categoryId: product?.categoryId || '',
    inventory: product?.inventory || 0,
    isFeatured: product?.isFeatured || false,
    isPublished: product?.isPublished !== undefined ? product?.isPublished : true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setCategories(data); })
      .catch(() => {});
  }, []);

  function autoSlug(name: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(f => ({ ...f, slug }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = '名称必填';
    if (!form.slug.trim()) errs.slug = 'Slug 必填';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = '请输入有效价格';
    if (!form.categoryId) errs.categoryId = '请选择分类';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        inventory: Number(form.inventory),
        specs,
      };
      const url = product?.id ? `/api/admin/products?id=${product.id}` : '/api/admin/products';
      const method = product?.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      onSave();
      onClose();
    } catch (err) {
      alert('保存失败');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/5 bg-[#0f0f0f] rounded-t-2xl">
          <div>
            <h2 className="text-xl font-black text-white">
              {product?.id ? '编辑组件' : '添加新组件'}
            </h2>
            <p className="text-xs text-white/30 mt-0.5">填写硬件规格与库存参数</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">基本信息</h3>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">名称</label>
              <input
                value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); autoSlug(e.target.value); }}
                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all`}
                placeholder="例如：ZENEIO Pulse Pro"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Slug</label>
              <input
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className={`w-full bg-white/5 border ${errors.slug ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all font-mono`}
                placeholder="zeneio-pulse-pro"
              />
              {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">描述</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all resize-none"
                placeholder="描述产品的核心卖点和特点..."
              />
            </div>
          </div>

          {/* Price & Inventory */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">价格 (USD)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className={`w-full bg-white/5 border ${errors.price ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50 transition-all`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">库存</label>
              <input
                type="number"
                value={form.inventory}
                onChange={e => setForm(f => ({ ...f, inventory: Number(e.target.value) }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50 transition-all"
                placeholder="0"
              />
            </div>
          </div>

          {/* Category & Image */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">分类</label>
              <select
                value={form.categoryId}
                onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
                className={`w-full bg-white/5 border ${errors.categoryId ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-zeneio-accent/50 transition-all`}
              >
                <option value="" className="bg-[#0f0f0f]">选择分类</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#0f0f0f]">{c.name}</option>
                ))}
              </select>
              {errors.categoryId && <p className="text-red-400 text-xs mt-1">{errors.categoryId}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">产品图片 URL</label>
              <input
                value={form.image}
                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Specs */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">技术规格</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'material', label: '材质' },
                { key: 'battery', label: '电池' },
                { key: 'motor', label: '马达' },
                { key: 'waterproof', label: '防水等级' },
                { key: 'noise', label: '噪音 (dB)' },
                { key: 'charging', label: '充电时间' },
                { key: 'size', label: '尺寸' },
                { key: 'weight', label: '重量' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">{field.label}</label>
                  <input
                    value={specs[field.key] || ''}
                    onChange={e => setSpecs(s => ({ ...s, [field.key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all"
                    placeholder="-"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-10 h-6 rounded-full transition-all ${form.isFeatured ? 'bg-zeneio-accent' : 'bg-white/10'}`}
                   onClick={() => setForm(f => ({ ...f, isFeatured: !f.isFeatured }))}>
                <div className={`w-4 h-4 mt-1 rounded-full bg-white shadow transition-all ${form.isFeatured ? 'ml-5' : 'ml-1'}`} />
              </div>
              <span className="text-sm font-medium text-white/70">精选产品</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-10 h-6 rounded-full transition-all ${form.isPublished ? 'bg-green-500' : 'bg-white/10'}`}
                   onClick={() => setForm(f => ({ ...f, isPublished: !f.isPublished }))}>
                <div className={`w-4 h-4 mt-1 rounded-full bg-white shadow transition-all ${form.isPublished ? 'ml-5' : 'ml-1'}`} />
              </div>
              <span className="text-sm font-medium text-white/70">上架销售</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-bold text-white/50 hover:bg-white/5 transition-all">
              取消
            </button>
            <button type="submit" disabled={loading} className="flex-1 btn-accent py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {loading ? '保存中...' : '保存组件'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
