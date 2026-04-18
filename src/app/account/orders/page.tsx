'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import {
  Package, ChevronRight, Eye, Search,
  Filter, Download
} from 'lucide-react';

const mockOrders = [
  { id: 'ZNE-20240315-001', date: 'Mar 15, 2026', items: [
    { name: 'NEO Vibrating Ring Pro', qty: 1, price: 49.99, img: '' },
    { name: 'AURA Wand Vibrator', qty: 1, price: 69.99, img: '' },
    { name: 'Lace Babydoll Set', qty: 1, price: 34.99, img: '' },
  ], total: 189.97, status: 'Delivered', statusColor: '#4ADE80', tracking: 'TRK-9876543210' },
  { id: 'ZNE-20240308-002', date: 'Mar 8, 2026', items: [
    { name: 'SUCTION Rose Toy Pro', qty: 2, price: 44.99, img: '' },
  ], total: 89.98, status: 'Shipped', statusColor: '#60A5FA', tracking: 'TRK-1234567890' },
  { id: 'ZNE-20240228-003', date: 'Feb 28, 2026', items: [
    { name: 'APEX Auto Stroker Elite', qty: 1, price: 189.99, img: '' },
  ], total: 189.99, status: 'Delivered', statusColor: '#4ADE80', tracking: 'TRK-5556667777' },
  { id: 'ZNE-202420-004', date: 'Feb 20, 2026', items: [
    { name: 'Prostate Wand X', qty: 1, price: 79.99, img: '' },
    { name: 'Delay Spray Premium', qty: 2, price: 24.99, img: '' },
  ], total: 129.97, status: 'Cancelled', statusColor: '#F87171', tracking: null },
  { id: 'ZNE-20240210-005', date: 'Feb 10, 2026', items: [
    { name: 'Satin Robe & Chemise Set', qty: 1, price: 54.99, img: '' },
  ], total: 54.99, status: 'Delivered', statusColor: '#4ADE80', tracking: 'TRK-1112223333' },
];

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zeneio-black"><Navbar />
        <div className="section-container pt-32 pb-20 text-center">
          <h1 className="text-heading-2 font-bold mb-3">Sign In Required</h1>
          <p className="text-white/40 mb-8">Please sign in to view your orders.</p>
          <Link href="/login" className="btn-accent">Sign In</Link>
        </div><Footer /></div>
    );
  }

  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header">
      <div className="section-container flex items-center justify-between">
        <div><Link href="/account" className="text-sm text-white/40 hover:text-white mb-3 inline-flex items-center gap-1">← Back to Account</Link><h1>My Orders</h1><p>{mockOrders.length} orders placed</p></div>
      </div></div>

      <div className="section-container pb-24 space-y-4">
        {/* Filter bar */}
        <div className="flex items-center justify-between glass rounded-xl p-4 gap-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f, i) => (
              <button key={f} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${i === 0 ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'}`}>{f}</button>
            ))}
          </div>
          <button className="btn-ghost hidden sm:flex"><Download size={14} /> Export</button>
        </div>

        {/* Order List */}
        {mockOrders.map(order => (
          <div key={order.id} className="glass rounded-2xl overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between p-4 sm:p-5 border-b border-white/5 gap-3">
              <div className="flex items-center gap-4 sm:gap-8">
                <Package size={22} className="text-white/25" />
                <div><p className="font-mono text-xs font-semibold">{order.id}</p><p className="text-[11px] text-white/30 mt-0.5">{order.date}</p></div>
              </div>
              <div className="flex items-center gap-3 sm:gap-5">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize`} style={{ color: order.statusColor, background: `${order.statusColor}15` }}>{order.status}</span>
                {order.tracking && <a href="#" className="text-xs text-zeneio-accent font-medium hover:underline">{order.tracking}</a>}
                <Link href={`/account/orders/${order.id}`} className="btn-outline !py-2 !px-4 text-xs"><Eye size={12} /> Details</Link>
              </div>
            </div>

            {/* Items */}
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.img || '/images/placeholder.jpg'} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-zeneio-gray"
                        onError={(e) => {(e.target as HTMLImageElement).src = '/images/placeholder.jpg';}} />
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{item.name}</p><p className="text-xs text-white/30">Qty: {item.qty}</p></div>
                      <p className="text-sm font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="sm:text-right sm:border-l sm:border-white/5 sm:pl-6">
                  <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Order Total</p>
                  <p className="text-xl font-black text-zeneio-accent">${order.total.toFixed(2)}</p>
                  {order.status === 'delivered' && <button className="btn-accent !py-2 !px-4 text-xs mt-3 w-full sm:w-auto">Reorder</button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer /></div>
  );
}
