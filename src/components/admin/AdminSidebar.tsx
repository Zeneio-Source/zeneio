'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3, 
  ShieldCheck,
  LogOut,
  Database
} from 'lucide-react';

const navItems = [
  { name: 'Control Center', icon: LayoutDashboard, href: '/admin' },
  { name: 'Acquisition Logs', icon: ShoppingCart, href: '/admin/orders' },
  { name: 'Inventory Lab', icon: Package, href: '/admin/products' },
  { name: 'Neural Traffic', icon: BarChart3, href: '/admin/analytics' },
  { name: 'Identity Matrix', icon: Users, href: '/admin/users' },
  { name: 'System Core', icon: Settings, href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-[#0A0A0A] border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.png" className="h-6 w-auto" alt="ZENEIO" />
          <span className="text-sm font-black tracking-widest text-white italic uppercase">
            CONTROL<span className="text-zeneio-accent">.</span>
          </span>
        </Link>
        <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zeneio-accent/5 border border-zeneio-accent/10">
          <div className="w-1.5 h-1.5 rounded-full bg-zeneio-accent animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-zeneio-accent uppercase tracking-tighter">System: Optimal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                isActive 
                  ? 'bg-zeneio-accent/10 text-zeneio-accent' 
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.02]'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-zeneio-accent' : 'text-white/20 group-hover:text-white/40'} />
              <span className="tracking-tight">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1 h-1 rounded-full bg-zeneio-accent shadow-[0_0_8px_rgba(129,216,208,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto border-t border-white/5 space-y-2">
        <div className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zeneio-accent to-zeneio-purple flex items-center justify-center text-[10px] font-bold text-black">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-white/80">Admin Root</p>
              <p className="text-[10px] text-white/30 font-mono">Level 5 Access</p>
            </div>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all">
          <LogOut size={18} />
          <span>Terminate Session</span>
        </button>
      </div>
    </div>
  );
}
