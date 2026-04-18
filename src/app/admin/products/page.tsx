'use client';

import React, { useState } from 'react';

// Admin Product Dashboard
export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: '1', name: 'Zeneio Pro', price: 199.00, inventory: 50, status: 'Active' },
    { id: '2', name: 'Zeneio Air', price: 99.00, inventory: 120, status: 'Active' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase italic">Zeneio Command Center</h1>
          <button className="bg-rose-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-rose-600 transition-colors">
            + New Product
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Product</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Inventory</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{product.name}</td>
                  <td className="px-6 py-4 text-slate-600">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-slate-600">{product.inventory} units</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-rose-500 transition-colors mr-4 font-bold text-xs uppercase">Edit</button>
                    <button className="text-slate-400 hover:text-red-600 transition-colors font-bold text-xs uppercase">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Orders</p>
                <p className="text-3xl font-black text-slate-900">1,284</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Revenue (30d)</p>
                <p className="text-3xl font-black text-rose-500">$42,900.00</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Pending Shipping</p>
                <p className="text-3xl font-black text-blue-500">18</p>
            </div>
        </div>
      </div>
    </div>
  );
}
