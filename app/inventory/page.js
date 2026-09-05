'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    const { data, error: loadError } = await supabase
      .from('products')
      .select('id,code,name,type,sale_price,current_stock,collections(name)')
      .order('name');
    if (loadError) setError(loadError.message);
    setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const totalStock = products.reduce((sum, p) => sum + Number(p.current_stock || 0), 0);
  const lowStock = products.filter(p => Number(p.current_stock) > 0 && Number(p.current_stock) <= 5).length;
  const outOfStock = products.filter(p => Number(p.current_stock) === 0).length;

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div><p className="text-sm font-medium text-slate-500">DB Kinda</p><h1 className="mt-1 text-3xl font-bold text-slate-900">المخزون</h1><p className="mt-2 text-slate-600">متابعة الكميات الحالية لكل منتج.</p></div>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">الرئيسية</Link>
        </div>

        {error && <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">إجمالي القطع</p><p className="mt-2 text-3xl font-bold text-slate-900">{totalStock}</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">منتجات منخفضة المخزون</p><p className="mt-2 text-3xl font-bold text-slate-900">{lowStock}</p><p className="mt-1 text-xs text-slate-500">من 1 إلى 5 قطع</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">منتجات بدون مخزون</p><p className="mt-2 text-3xl font-bold text-slate-900">{outOfStock}</p></div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold text-slate-900">تفاصيل المخزون</h2><p className="mt-1 text-sm text-slate-500">الكميات الحالية محدثة من قاعدة البيانات.</p></div><button onClick={load} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">تحديث</button></div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[800px] text-right text-sm"><thead className="border-b border-slate-200 text-slate-500"><tr>{['الكود','اسم المنتج','النوع','المجموعة','السعر','المخزون','الحالة'].map(h => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
              <tbody>{loading ? <tr><td colSpan="7" className="px-4 py-12 text-center text-slate-400">جارٍ التحميل...</td></tr> : products.length === 0 ? <tr><td colSpan="7" className="px-4 py-12 text-center text-slate-400">لا توجد منتجات حتى الآن.</td></tr> : products.map(p => { const stock = Number(p.current_stock || 0); return <tr key={p.id} className="border-b border-slate-100"><td className="px-4 py-3 font-medium">{p.code}</td><td className="px-4 py-3">{p.name}</td><td className="px-4 py-3">{p.type}</td><td className="px-4 py-3">{p.collections?.name || '—'}</td><td className="px-4 py-3">{p.sale_price ?? '—'}</td><td className="px-4 py-3 font-semibold">{stock}</td><td className="px-4 py-3">{stock === 0 ? <span className="text-red-600">نفد</span> : stock <= 5 ? <span className="text-amber-600">منخفض</span> : <span className="text-emerald-600">متوفر</span>}</td></tr>; })}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
