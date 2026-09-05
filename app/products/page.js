'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

const emptyForm = { code: '', name: '', type: '', collection_id: '', sale_price: '', current_stock: '0', image_url: '' };

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    const [{ data: p, error: pe }, { data: c, error: ce }] = await Promise.all([
      supabase.from('products').select('*, collections(name)').order('created_at', { ascending: false }),
      supabase.from('collections').select('id,name').order('name'),
    ]);
    if (pe || ce) setError((pe || ce).message);
    setProducts(p || []);
    setCollections(c || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addProduct(e) {
    e.preventDefault();
    setSaving(true); setError('');
    const { error: saveError } = await supabase.from('products').insert({
      code: form.code.trim(), name: form.name.trim(), type: form.type.trim(),
      collection_id: form.collection_id || null, sale_price: form.sale_price ? Number(form.sale_price) : null,
      current_stock: Number(form.current_stock || 0), image_url: form.image_url.trim() || null,
    });
    if (saveError) setError(saveError.message);
    else { setForm(emptyForm); setShowForm(false); await load(); }
    setSaving(false);
  }

  async function removeProduct(id) {
    if (!confirm('هل تريد حذف هذا المنتج؟')) return;
    const { error: deleteError } = await supabase.from('products').delete().eq('id', id);
    if (deleteError) setError(deleteError.message); else await load();
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div><p className="text-sm font-medium text-slate-500">DB Kinda</p><h1 className="mt-1 text-3xl font-bold text-slate-900">المنتجات</h1><p className="mt-2 text-slate-600">إدارة الحيوانات والقطع والبيانات الخاصة بكل منتج.</p></div>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">الرئيسية</Link>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div><h2 className="text-xl font-semibold text-slate-900">قائمة المنتجات</h2><p className="mt-1 text-sm text-slate-500">البيانات محفوظة مباشرة في Supabase.</p></div>
            <button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">{showForm ? 'إلغاء' : 'إضافة منتج'}</button>
          </div>

          {showForm && <form onSubmit={addProduct} className="mt-6 grid gap-3 rounded-xl bg-slate-50 p-4 md:grid-cols-4">
            {[['code','الكود'],['name','اسم المنتج'],['type','النوع'],['sale_price','سعر البيع'],['current_stock','المخزون'],['image_url','رابط الصورة']].map(([key,label]) => <input key={key} required={['code','name','type'].includes(key)} type={key==='sale_price'||key==='current_stock'?'number':'text'} step={key==='sale_price'?'0.01':undefined} placeholder={label} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300" />)}
            <select value={form.collection_id} onChange={e=>setForm({...form,collection_id:e.target.value})} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="">بدون مجموعة</option>{collections.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <button disabled={saving} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50">{saving ? 'جارٍ الحفظ...' : 'حفظ المنتج'}</button>
          </form>}

          {error && <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[800px] text-right text-sm"><thead className="border-b border-slate-200 text-slate-500"><tr>{['الكود','اسم المنتج','النوع','المجموعة','السعر','المخزون',''].map(h=><th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
              <tbody>{loading ? <tr><td colSpan="7" className="px-4 py-12 text-center text-slate-400">جارٍ التحميل...</td></tr> : products.length === 0 ? <tr><td colSpan="7" className="px-4 py-12 text-center text-slate-400">لا توجد منتجات مضافة حتى الآن.</td></tr> : products.map(p=><tr key={p.id} className="border-b border-slate-100"><td className="px-4 py-3 font-medium">{p.code}</td><td className="px-4 py-3">{p.name}</td><td className="px-4 py-3">{p.type}</td><td className="px-4 py-3">{p.collections?.name || '—'}</td><td className="px-4 py-3">{p.sale_price ?? '—'}</td><td className="px-4 py-3">{p.current_stock}</td><td className="px-4 py-3"><button onClick={()=>removeProduct(p.id)} className="text-red-600">حذف</button></td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
