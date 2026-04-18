'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { MapPin, Plus, Edit3, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';

const mockAddresses = [
  {
    id: 'addr_1', label: 'Home', isDefault: true,
    name: 'John Doe', phone: '+1 (555) 123-4567',
    address1: '123 Main Street, Apt 4B', city: 'New York',
    state: 'NY', postalCode: '10001', country: 'United States',
  },
  {
    id: 'addr_2', label: 'Office', isDefault: false,
    name: 'John Doe', phone: '+1 (555) 987-6543',
    address1: '456 Business Ave, Suite 100', city: 'Los Angeles',
    state: 'CA', postalCode: '90001', country: 'United States',
  },
];

export default function AddressesPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zeneio-black"><Navbar />
        <div className="section-container pt-32 pb-20 text-center">
          <MapPin size={64} className="mx-auto text-white/10 mb-6" />
          <h1 className="text-heading-2 font-bold mb-3">Sign In Required</h1>
          <p className="text-white/40 mb-8">Please sign in to manage your addresses.</p>
          <Link href="/login" className="btn-accent btn-lg">Sign In</Link></div><Footer /></div>
    );
  }

  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header">
      <div className="section-container flex items-center justify-between"><div>
        <Link href="/account" className="text-sm text-white/40 hover:text-white mb-3 inline-flex items-center gap-1"><ArrowLeft size={14} /> Back to Account</Link>
        <h1>My Addresses</h1><p>Manage your shipping addresses</p></div>
        <button className="btn-accent !py-2.5 hidden sm:flex"><Plus size={16} /> Add New Address</button></div>
      </div>

      <div className="section-container pb-24">
        {/* Mobile add button */}
        <button className="btn-accent w-full sm:hidden mb-6"><Plus size={16} /> Add New Address</button>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockAddresses.map(addr => (
            <div key={addr.id} className={`glass rounded-2xl p-5 relative group transition-all ${addr.isDefault ? 'border-zeneio-accent/20' : ''}`}>
              {addr.isDefault && (
                <span className="absolute top-3 right-3 text-[11px] font-bold tracking-wide uppercase text-zeneio-accent bg-zeneio-accent/10 px-2.5 py-1 rounded-full">Default</span>
              )}

              <div className="space-y-2.5 mb-4">
                <p className="font-bold text-sm">{addr.label}</p>
                <p className="text-sm text-white/70">{addr.name}</p>
                <p className="text-sm text-white/50">{addr.phone}</p>
                <div className="text-sm text-white/50 leading-relaxed">
                  <p>{addr.address1}</p>
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                </div>
              </div>

              <div className="flex gap-2 border-t border-white/5 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 btn-ghost !py-2 text-xs"><Edit3 size={14} /> Edit</button>
                {!addr.isDefault && <button className="flex-1 btn-ghost !py-2 !text-red-400/60 hover:!text-red-400 text-xs"><Trash2 size={14} /> Delete</button>}
                {!addr.isDefault && <button className="flex-1 btn-ghost !py-2 text-xs"><CheckCircle2 size={14} /> Set Default</button>}
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <Link href="#" className="glass rounded-2xl p-5 flex flex-col items-center justify-center min-h-[200px] border-dashed border-white/10 hover:border-zeneio-accent/30 hover:bg-zeneio-accent/[0.02] transition-all group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:bg-zeneio-accent/10 transition-colors"><Plus size={22} className="text-white/40 group-hover:text-zeneio-accent transition-colors" /></div>
            <p className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors">Add New Address</p>
          </Link>
        </div>
      </div><Footer /></div>
  );
}
