'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ALL_PRODUCTS, formatPrice } from '@/lib/products-data';
import { Plus, Search, Edit3, Trash2, Eye, Package } from 'lucide-react';

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filtered = searchQuery.trim()
    ? ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.includes(searchQuery.toLowerCase()))
    : ALL_PRODUCTS;

  const categoryIcons: Record<string, string> = { male: '♂', female: '♀', lingerie: '✦' };
  const categoryColors: Record<string, string> = { male: '#81D8D0', female: '#F472B6', lingerie: '#9B87F5' };

  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="section-container pt-24 lg:pt-28 pb-20">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-1">Admin Dashboard</p>
          <h1 className="text-heading-2 font-bold">Product Management</h1>
          <p className="text-sm text-white/40 mt-1">{ALL_PRODUCTS.length} total products</p>
        </div>
        <Link href="/products" className="btn-outline"><Eye size={14} /> View Store</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[{ label: 'Total Products', value: ALL_PRODUCTS.length.toString() }, { label: 'In Stock', value: ALL_PRODUCTS.filter(p => p.inStock).length.toString() }, { label: 'On Sale', value: ALL_PRODUCTS.filter(p => p.discountPercent && p.discountPercent > 0).length.toString() }, { label: 'Categories', value: '3' }].map(s => (
          <div key={s.label} className="glass rounded-xl p-4"><p className="text-xl font-black">{s.value}</p><p className="text-[11px] text-white/35 mt-0.5">{s.label}</p></div>
        ))}
      </div>

      {/* Search + Add */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="input-field !rounded-xl pl-10 py-2.5 text-sm" />
        </div>
        <button className="btn-accent !py-2.5"><Plus size={16} /> Add Product</button>
      </div>

      {/* Products Table */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Mobile cards */}
        <div className="lg:hidden divide-y divide-white/5">
          {filtered.map(product => (
            <div key={product.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-zeneio-gray"
                  onError={(e) => {(e.target as HTMLImageElement).src = '/images/placeholder.jpg';}} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{product.name}</p>
                  <p className="text-xs text-zeneio-accent">{formatPrice(product.price)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: categoryColors[product.category] }} className="text-[11px] font-medium uppercase tracking-wider">
                  {categoryIcons[product.category]} {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <button className="btn-ghost !py-1.5 !px-3 text-xs"><Edit3 size={13} /></button>
                  <button className="btn-ghost !py-1.5 !px-3 text-xs !text-red-400/60"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <table className="hidden lg:table w-full text-sm">
          <thead><tr className="border-b border-white/5">
            <th className="text-left px-5 py-3 text-[11px] font-bold tracking-widest uppercase text-white/30">Product</th>
            <th className="text-left px-5 py-3 text-[11px] font-bold tracking-widest uppercase text-white/30">Category</th>
            <th className="text-left px-5 py-3 text-[11px] font-bold tracking-widest uppercase text-white/30">Price</th>
            <th className="text-left px-5 py-3 text-[11px] font-bold tracking-widest uppercase text-white/30">Stock</th>
            <th className="text-right px-5 py-3 text-[11px] font-bold tracking-widest uppercase text-white/30">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(product => (
              <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="w-11 h-11 rounded-lg object-cover bg-zeneio-gray flex-shrink-0"
                      onError={(e) =>{(e.target as HTMLImageElement).src = '/images/placeholder.jpg';}} />
                    <span className="font-medium truncate max-w-[200px] group-hover:text-zeneio-accent transition-colors">{product.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4"><span style={{color: categoryColors[product.category]}} className="capitalize">{product.category}</span></td>
                <td className="px-5 py-4 font-mono font-semibold text-zeneio-accent">{formatPrice(product.price)}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                    {product.inStock ? `✓ ${product.stockCount || 'Yes'}` : 'Out'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/50 hover:text-white"><Edit3 size={15} /></button>
                    <button className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-red-400/60 hover:text-red-400"><Trash2 size={15} /></button>
                    <Link href={`/products/${product.slug}`} className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/50 hover:text-white"><Eye size={15} /></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div><Footer /></div>
  );
}
