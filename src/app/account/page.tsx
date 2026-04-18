'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import {
  Package, Heart, User as UserIcon, MapPin,
  Settings, LogOut, ChevronRight, ShoppingBag, Edit3
} from 'lucide-react';

const accountNav = [
  { href: '/account', label: 'Dashboard', icon: UserIcon },
  { href: '/account/orders', label: 'My Orders', icon: Package },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart, badge: '3' },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/settings', label: 'Account Settings', icon: Settings },
];

export default function AccountPage() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-zeneio-black">
        <Navbar />
        <div className="section-container pt-32 pb-20 text-center">
          <UserIcon size={64} className="mx-auto text-white/10 mb-6" />
          <h1 className="text-heading-2 font-bold mb-3">Sign In Required</h1>
          <p className="text-white/40 mb-8">Please sign in to access your account.</p>
          <Link href="/login" className="btn-accent btn-lg">Sign In</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />

      {/* Page Header */}
      <div className="page-header">
        <h1>My Account</h1>
        <p>Welcome back, {user.name}!</p>
      </div>

      <div className="section-container pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="glass rounded-2xl p-4 space-y-1 sticky top-28">
              {/* User Info */}
              <div className="px-3 py-4 mb-3 border-b border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zeneio-accent to-zeneio-purple flex items-center justify-center text-lg font-bold text-black mb-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-sm truncate">{user.name}</p>
                <p className="text-xs text-white/35 truncate">{user.email}</p>
              </div>

              {accountNav.map(item => {
                const isActive = (item.href === '/account' && pathname === '/account') ||
                  (item.href !== '/account' && pathname.startsWith(item.href));
                return (
                  <Link key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-zeneio-accent/10 text-zeneio-accent border border-zeneio-accent/15'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                    {item.badge && <span className="ml-auto text-xs bg-zeneio-accent/20 text-zeneio-accent px-2 py-0.5 rounded-full">{item.badge}</span>}
                  </Link>
                );
              })}

              <div className="h-px bg-white/5 my-2" />

              <button
                onClick={logout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 w-full transition-all"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content - Dashboard */}
          <main className="flex-1 min-w-0 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Orders', value: '12', icon: Package, color: '#81D8D0' },
                { label: 'Wishlist Items', value: '3', icon: Heart, color: '#F472B6' },
                { label: 'Saved Addresses', value: '2', icon: MapPin, color: '#9B87F5' },
                { label: 'Points Earned', value: '240', icon: ShoppingBag, color: '#FBBF24' },
              ].map(stat => (
                <div key={stat.label} className="glass rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${stat.color}10` }}>
                    <stat.icon size={20} style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-xs text-white/35 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/5">
                <h2 className="font-bold text-lg">Recent Orders</h2>
                <Link href="/account/orders" className="text-sm text-zeneio-accent hover:underline flex items-center gap-1">
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="divide-y divide-white/5">
                {[
                  { id: 'ZNE-20240315-001', date: 'Mar 15, 2026', items: 3, total: 189.97, status: 'delivered', statusColor: '#4ADE80' },
                  { id: 'ZNE-20240308-002', date: 'Mar 8, 2026', items: 1, total: 49.99, status: 'shipped', statusColor: '#60A5FA' },
                  { id: 'ZNE-20240228-003', date: 'Feb 28, 2026', items: 2, total: 84.98, status: 'delivered', statusColor: '#4ADE80' },
                ].map(order => (
                  <div key={order.id} className="p-5 sm:p-6 flex items-center gap-4 sm:gap-8 hover:bg-white/[0.02] transition-colors">
                    <div className="hidden sm:flex items-center gap-3 min-w-[120px]">
                      <Package size={24} className="text-white/25" />
                      <div>
                        <p className="font-mono text-xs font-medium">{order.id}</p>
                        <p className="text-[11px] text-white/30 mt-0.5">{order.date}</p>
                      </div>
                    </div>
                    <div className="sm:hidden">
                      <p className="font-mono text-xs font-medium">{order.id.slice(-6)}</p>
                    </div>

                    <div className="flex-1 text-sm text-white/50 hidden md:block">
                      {order.items} item{order.items !== 1 ? 's' : ''}
                    </div>

                    <span className="font-bold">${order.total.toFixed(2)}</span>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize`}
                      style={{ color: order.statusColor, background: `${order.statusColor}15` }}
                    >{order.status}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 text-center border-t border-white/5">
                <Link href="/products" className="btn-outline text-sm !py-2.5">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/account/wishlist" className="glass rounded-2xl p-6 group hover:border-pink-400/20 transition-all">
                <Heart size={24} className="text-pink-400/50 mb-3 group-hover:text-pink-400 transition-colors" />
                <h3 className="font-bold mb-1">My Wishlist</h3>
                <p className="text-sm text-white/40 mb-3">3 items saved</p>
                <span className="text-sm text-pink-400/70 group-hover:text-pink-400 transition-colors flex items-center gap-1">
                  View Wishlist <ChevronRight size={14} />
                </span>
              </Link>

              <Link href="/account/addresses" className="glass rounded-2xl p-6 group hover:border-zeneio-purple/20 transition-all">
                <MapPin size={24} className="text-zeneio-purple/50 mb-3 group-hover:text-zeneio-purple transition-colors" />
                <h3 className="font-bold mb-1">Saved Addresses</h3>
                <p className="text-sm text-white/40 mb-3">Manage shipping addresses</p>
                <span className="text-sm text-zeneio-purple/70 group-hover:text-zeneio-purple transition-colors flex items-center gap-1">
                  Manage Addresses <ChevronRight size={14} />
                </span>
              </Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
