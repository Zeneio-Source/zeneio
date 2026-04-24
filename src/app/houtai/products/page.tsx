'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Search, Edit2, Trash2, Loader2, Package,
  Upload, Download, X, Eye, EyeOff, Star, ToggleLeft, ToggleRight, ChevronDown, Filter
} from 'lucide-react';
import ProductFormModal from '@/components/admin/ProductFormModal';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  categoryId: string;
  category?: { name: string; slug: string };
  inventory: number;
  isFeatured: boolean;
  isPublished: boolean;
  specs?: any;
  createdAt: string;
}

export default function InventoryLab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; errors: string[] } | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showUnpublished, setShowUnpublished] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function fetchProducts() {
    fetch('/api/admin/products', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setProducts(data); })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchProducts(); }, []);

  async function deleteProduct(id: string) {
    if (!confirm('确定要删除该组件吗？此操作无法撤销。')) return;
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      setProducts(p => p.filter(x => x.id !== id));
    } catch {
      alert('删除失败');
    }
  }

  async function toggleFeatured(p: Product) {
    try {
      await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: p.id, isFeatured: !p.isFeatured }),
      });
      setProducts(ps => ps.map(x => x.id === p.id ? { ...x, isFeatured: !x.isFeatured } : x));
    } catch {}
  }

  async function togglePublished(p: Product) {
    try {
      await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: p.id, isPublished: !p.isPublished }),
      });
      setProducts(ps => ps.map(x => x.id === p.id ? { ...x, isPublished: !x.isPublished } : x));
    } catch {}
  }

  async function handleBulkAction() {
    if (!bulkAction || selectedProducts.size === 0) return;
    const ids = Array.from(selectedProducts);
    if (bulkAction === 'delete') {
      if (!confirm(`确定删除 ${ids.length} 个产品？`)) return;
      for (const id of ids) {
        await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      }
      setProducts(p => p.filter(x => !selectedProducts.has(x.id)));
      setSelectedProducts(new Set());
    } else if (bulkAction === 'publish') {
      for (const id of ids) {
        await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, isPublished: true }),
        });
      }
      fetchProducts();
      setSelectedProducts(new Set());
    } else if (bulkAction === 'unpublish') {
      for (const id of ids) {
        await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, isPublished: false }),
        });
      }
      fetchProducts();
      setSelectedProducts(new Set());
    }
    setBulkAction('');
  }

  function handleCSVImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportLoading(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const text = ev.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const results = { success: 0, errors: [] as string[] };

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
          const row: Record<string, string> = {};
          headers.forEach((h, idx) => { row[h] = cols[idx] || ''; });

          if (!row.name || !row.slug || !row.price) {
            results.errors.push(`行${i + 1}: 缺少必填字段`);
            continue;
          }

          try {
            await fetch('/api/admin/products', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: row.name,
                slug: row.slug,
                description: row.description || '',
                price: parseFloat(row.price) || 0,
                image: row.image || 'https://picsum.photos/seed/' + Date.now() + '/400/400',
                categoryId: row.categoryid || '',
                inventory: parseInt(row.inventory) || 0,
                isFeatured: row.featured === 'true',
                isPublished: row.published !== 'false',
              }),
            });
            results.success++;
          } catch {
            results.errors.push(`行${i + 1}: 保存失败`);
          }
        }
        setImportResult(results);
        fetchProducts();
      } catch {
        setImportResult({ success: 0, errors: ['CSV 解析失败，请检查格式'] });
      }
      setImportLoading(false);
      if (fileRef.current) fileRef.current.value = '';
    };
    reader.readAsText(file);
  }

  function downloadCSVTemplate() {
    const csv = 'name,slug,description,price,image,categoryId,inventory,featured,published\n"ZENEIO Pulse Pro","zeneio-pulse-pro","Premium massager",129.99,"https://...",category-cuid,50,true,true';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadAllProducts() {
    const rows = [
      ['name', 'slug', 'description', 'price', 'inventory', 'category', 'featured', 'published', 'createdAt'].join(','),
      ...products.map(p => [
        `"${p.name}"`, `"${p.slug}"`, `"${p.description}"`, p.price,
        p.inventory, `"${p.category?.name || ''}"`,
        p.isFeatured, p.isPublished, p.createdAt
      ].join(','))
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zeneio-products.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const categoryMap: Record<string, any> = {};
  products.forEach(p => { if (p.categoryId && p.category && !categoryMap[p.categoryId]) categoryMap[p.categoryId] = p.category; });
  const categories = Object.values(categoryMap);

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || p.categoryId === categoryFilter;
    const matchFeatured = !showFeaturedOnly || p.isFeatured;
    const matchPublished = !showUnpublished || !p.isPublished;
    return matchSearch && matchCategory && matchFeatured && matchPublished;
  });

  const allSelected = filtered.length > 0 && filtered.every(p => selectedProducts.has(p.id));

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            库存实验室<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">
            共 {products.length} 个组件 · 已选 {selectedProducts.size} 个
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowImport(true)} className="glass px-4 py-2.5 rounded-xl flex items-center gap-2 border-white/5 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
            <Upload size={14} /> 批量导入
          </button>
          <button onClick={downloadAllProducts} className="glass px-4 py-2.5 rounded-xl flex items-center gap-2 border-white/5 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
            <Download size={14} /> 导出
          </button>
          <button onClick={() => { setEditProduct(null); setShowForm(true); }} className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest">
            <Plus size={18} /> 添加组件
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-4 rounded-2xl border-white/5 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input
            type="text"
            placeholder="搜索名称或Slug..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white/50 focus:outline-none focus:border-zeneio-accent/50 transition-all"
        >
          <option value="" className="bg-[#0a0a0a]">全部分类</option>
          {categories.map(c => c && <option key={c.name} value={c.name} className="bg-[#0a0a0a]">{c.name}</option>)}
        </select>
        <button onClick={() => setShowFeaturedOnly(v => !v)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${showFeaturedOnly ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
          <Star size={12} /> 精选
        </button>
        <button onClick={() => setShowUnpublished(v => !v)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${showUnpublished ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
          {showUnpublished ? <EyeOff size={12} /> : <Eye size={12} />} {showUnpublished ? '未上架' : '全部'}
        </button>

        {selectedProducts.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <select
              value={bulkAction}
              onChange={e => setBulkAction(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs font-bold text-white/50 focus:outline-none"
            >
              <option value="">批量操作</option>
              <option value="publish">批量上架</option>
              <option value="unpublish">批量下架</option>
              <option value="delete">批量删除</option>
            </select>
            <button onClick={handleBulkAction} className="btn-accent px-4 py-2 rounded-lg text-xs font-bold">
              应用
            </button>
            <button onClick={() => setSelectedProducts(new Set())} className="text-xs text-white/30 hover:text-white/60">取消</button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">
              <th className="px-4 py-4 w-10">
                <input type="checkbox" checked={allSelected} onChange={e => {
                  if (e.target.checked) setSelectedProducts(new Set(filtered.map(p => p.id)));
                  else setSelectedProducts(new Set());
                }} className="accent-zeneio-accent" />
              </th>
              <th className="px-4 py-4">组件 / SKU</th>
              <th className="px-4 py-4">分类</th>
              <th className="px-4 py-4">价格</th>
              <th className="px-4 py-4">库存</th>
              <th className="px-4 py-4">精选</th>
              <th className="px-4 py-4">状态</th>
              <th className="px-4 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-20 text-center">
                  <Loader2 className="w-8 h-8 text-zeneio-accent animate-spin mx-auto mb-4" />
                  <p className="text-xs font-mono text-white/20 uppercase">正在扫描库存组件...</p>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-20 text-center">
                  <Package className="w-8 h-8 text-white/10 mx-auto mb-4" />
                  <p className="text-xs font-mono text-white/20 uppercase">未发现库存组件</p>
                </td>
              </tr>
            ) : filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-4 py-4">
                  <input type="checkbox" checked={selectedProducts.has(p.id)}
                    onChange={e => {
                      const next = new Set(selectedProducts);
                      if (e.target.checked) next.add(p.id); else next.delete(p.id);
                      setSelectedProducts(next);
                    }}
                    className="accent-zeneio-accent" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/80">{p.name}</p>
                      <p className="text-[10px] font-mono text-white/20">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-white/40 uppercase tracking-widest">
                    {p.category?.name || '-'}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-mono text-white/70">${Number(p.price).toFixed(2)}</td>
                <td className="px-4 py-4">
                  <span className={`text-sm font-bold ${p.inventory > 10 ? 'text-white/60' : 'text-amber-400'}`}>{p.inventory}</span>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => toggleFeatured(p)} className="transition-all">
                    {p.isFeatured ? <Star size={14} className="text-amber-400 fill-amber-400" /> : <Star size={14} className="text-white/20" />}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => togglePublished(p)} className="flex items-center gap-1">
                    {p.isPublished ? (
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-400 uppercase tracking-wider">上架</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 text-white/30 uppercase tracking-wider">下架</span>
                    )}
                  </button>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setEditProduct(p); setShowForm(true); }} className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-zeneio-accent transition-all">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && <ProductFormModal product={editProduct} onClose={() => setShowForm(false)} onSave={fetchProducts} />}

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowImport(false); setImportResult(null); }} />
          <div className="relative z-10 w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">批量导入</h2>
              <button onClick={() => { setShowImport(false); setImportResult(null); }} className="p-2 rounded-lg hover:bg-white/5 text-white/40"><X size={20} /></button>
            </div>
            <p className="text-sm text-white/40">上传 CSV 文件批量导入产品。请先下载模板确保格式正确。</p>
            <button onClick={downloadCSVTemplate} className="w-full glass py-3 rounded-xl text-sm font-bold text-zeneio-accent hover:bg-zeneio-accent/10 transition-all">
              下载 CSV 模板
            </button>
            <div className="relative">
              <input ref={fileRef} type="file" accept=".csv" onChange={handleCSVImport} className="hidden" id="csv-upload" />
              <label htmlFor="csv-upload" className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 border-dashed cursor-pointer transition-all text-sm font-bold ${importLoading ? 'border-white/10 text-white/20' : 'border-zeneio-accent/30 text-zeneio-accent hover:bg-zeneio-accent/10'}`}>
                {importLoading ? <><Loader2 size={16} className="animate-spin" /> 导入中...</> : <><Upload size={16} /> 选择 CSV 文件</>}
              </label>
            </div>
            {importResult && (
              <div className={`p-4 rounded-xl border ${importResult.errors.length > 0 ? 'border-amber-500/20 bg-amber-500/5' : 'border-green-500/20 bg-green-500/5'}`}>
                <p className="text-sm font-bold text-white/80">导入完成：成功 {importResult.success} 个</p>
                {importResult.errors.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {importResult.errors.slice(0, 5).map((e, i) => <p key={i} className="text-xs text-amber-400">{e}</p>)}
                    {importResult.errors.length > 5 && <p className="text-xs text-amber-400">...共 {importResult.errors.length} 个错误</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
