'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { User, Mail, Phone, Lock, Eye, EyeOff, Save, ArrowLeft, Camera } from 'lucide-react';

export default function SettingsPage() {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const [saved, setSaved] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-zeneio-black"><Navbar />
        <div className="section-container pt-32 pb-20 text-center">
          <h1 className="text-heading-2 font-bold mb-3">Sign In Required</h1>
          <Link href="/login" className="btn-accent btn-lg">Sign In</Link></div><Footer /></div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header">
      <div className="section-container"><div>
        <Link href="/account" className="text-sm text-white/40 hover:text-white mb-3 inline-flex items-center gap-1"><ArrowLeft size={14} /> Back to Account</Link><h1>Account Settings</h1><p>Manage your profile and preferences</p></div></div></div>

      <div className="section-container pb-24 max-w-3xl mx-auto space-y-6">
        {/* Profile Picture */}
        <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group cursor-pointer" onClick={() => alert('Upload avatar')}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zeneio-accent to-zeneio-purple flex items-center justify-center text-3xl font-bold text-black">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-zeneio-accent text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Camera size={14} /></button>
          </div>
          <div className="text-center sm:text-left"><h2 className="font-bold text-lg">{user.name}</h2><p className="text-sm text-white/40">{user.email}</p></div>
          <button onClick={() => alert('Upload')} className="btn-outline !py-2 !px-4 ml-auto text-sm hidden sm:flex">Change Photo</button>
        </div>

        {/* Personal Info */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
          <h3 className="font-bold">Personal Information</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">First Name</label>
              <input defaultValue={user.name?.split(' ')[0]} placeholder="John" className="input-field" />
            </div>
            <div>
              <label className="input-label">Last Name</label>
              <input defaultValue={user.name?.split(' ').slice(1).join(' ') || ''} placeholder="Doe" className="input-field" />
            </div>
            <div>
              <label className="input-label">Email Address</label>
              <input type="email" defaultValue={user.email} className="input-field font-mono text-sm" disabled style={{ opacity: 0.5 }} />
            </div>
            <div>
              <label className="input-label">Phone Number</label>
              <input type="tel" defaultValue="+1 (555) 000-0000" placeholder="+1 (555) 000-0000" className="input-field" />
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
          <h3 className="font-bold">Change Password</h3>

          <div className="space-y-4">
            <div><label className="input-label">Current Password</label><input type="password" placeholder="••••••••" className="input-field" /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="input-label">New Password</label><input type="password" placeholder="Min. 6 characters" className="input-field" minLength={6} /></div>
              <div><label className="input-label">Confirm New Password</label><input type="password" placeholder="Re-enter new password" className="input-field" /></div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
          <h3 className="font-bold">Preferences</h3>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" defaultChecked className="rounded accent-zeneio-accent w-5 h-5" />
              <span className="text-sm text-white/70 group-hover:text-white transition-colors">Email me about new products and exclusive offers</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" defaultChecked className="rounded accent-zeneio-accent w-5 h-5" />
              <span className="text-sm text-white/70 group-hover:text-white transition-colors">Send me order status updates via SMS</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="rounded accent-zeneio-accent w-5 h-5" />
              <span className="text-sm text-white/70 group-hover:text-white transition-colors">Subscribe to our wellness newsletter</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between gap-4">
          <button onClick={logout} className="btn-ghost !text-red-400/70 hover:!text-red-400">Sign Out of Account</button>
          <button onClick={handleSave} className={`btn-accent px-10 ${saved ? '!bg-green-500' : ''}`}>
            {saved ? <>✓ Saved!</> : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div><Footer /></div>
  );
}
