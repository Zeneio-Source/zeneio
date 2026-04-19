import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <AdminSidebar />
      <main className="pl-64 min-h-screen">
        <div className="p-8 lg:p-12">
          {children}
        </div>
      </main>
      
      {/* Global Background Grid */}
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-zeneio-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </div>
  );
}
