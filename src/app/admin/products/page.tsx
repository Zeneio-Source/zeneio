'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2,
  Package
} from 'lucide-react';

export default function InventoryLab() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('确定要销毁该组件吗？此操作无法撤销。')) return;
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
            库存实验室<span className="text-zeneio-accent">.</span>
          </h1>
          <p className="text-sm text-white/30 font-medium tracking-wide uppercase">
            管理硬件规格与库存完整性
          </p>
        </div>
        <button className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest">
          <Plus size={18} /> 添加新组件
        </button>
      </div>

      {/* Search & Filter */}
      <div className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="通过名称、别名或 SKU 搜索..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-zeneio-accent/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/40 uppercase tracking-widest">
          状态: 正常运行 (Operational)
        </div>
      </div>

      {/* Product Table */}
      <div className="glass rounded-2xl overflow-hidden border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">
              <th className="px-6 py-4">组件 / SKU</th>
              <th className="px-6 py-4">分类</th>
              <th className="px-6 py-4">价格</th>
              <th className="px-6 py-4">库存</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                   <Loader2 className="w-8 h-8 text-zeneio-accent animate-spin mx-auto mb-4" />
                   <p className="text-xs font-mono text-white/20 uppercase">正在扫描库存 (Scanning Inventory)...</p>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                   <Package className="w-8 h-8 text-white/10 mx-auto mb-4" />
                   <p className="text-xs font-mono text-white/20 uppercase">矩阵中未发现组件 (No components found)</p>
                </td>
              </tr>
            ) : filteredProducts.map((p: any) => (
              <tr key={p.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/80">{p.name}</p>
                      <p className="text-[10px] font-mono text-white/20 uppercase">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-white/40 uppercase tracking-widest">
                    {p.category.name}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-mono text-white/70">${Number(p.price).toFixed(2)}</td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                     <span className={`text-sm font-bold ${p.inventory > 10 ? 'text-white/60' : 'text-amber-400'}`}>
                       {p.inventory}
                     </span>
                     <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${p.inventory > 10 ? 'bg-zeneio-accent/40' : 'bg-amber-400/40'}`} style={{ width: `${Math.min(p.inventory, 100)}%` }} />
                     </div>
                   </div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-1.5">
                     <div className={`w-1.5 h-1.5 rounded-full ${p.inventory > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                     <span className="text-[10px] font-bold text-white/40 uppercase">{p.inventory > 0 ? '有现货 (In Stock)' : '已售罄 (Depleted)'}</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-zeneio-accent transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => deleteProduct(p.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
