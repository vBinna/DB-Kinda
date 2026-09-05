'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

const movementTypes = [['addition','إضافة'],['sale','بيع'],['damage','تلف'],['adjustment','تسوية']];
const emptyForm = { product_id:'', movement_type:'addition', quantity:'', note:'' };

export default function MovementsPage() {
  const [products,setProducts] = useState([]);
  const [movements,setMovements] = useState([]);
  const [form,setForm] = useState(emptyForm);
  const [showForm,setShowForm] = useState(false);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [error,setError] = useState('');

  async function load() {
    setLoading(true); setError('');
    const [{data:p,error:pe},{data:m,error:me}] = await Promise.all([
      supabase.from('products').select('id,code,name,current_stock').order('name'),
      supabase.from('inventory_movements').select('id,product_id,movement_type,quantity,note,created_at,products(name,code)').order('created_at',{ascending:false}).limit(100),
    ]);
    if (pe || me) setError((pe || me).message);
    setProducts(p || []); setMovements(m || []); setLoading(false);
  }

  useEffect(()=>{ load(); },[]);

  async function addMovement(e) {
    e.preventDefault(); setSaving(true); setError('');
    const qty = Number(form.quantity);
    if (!Number.isInteger(qty) || qty === 0) { setError('أدخل كمية صحيحة غير صفرية.'); setSaving(false); return; }
    const product = products.find(p => p.id === form.product_id);
    if (!product) { setError('اختر المنتج أولاً.'); setSaving(false); return; }
    const current = Number(product.current_stock || 0);
    let next = current;
    if (form.movement_type === 'addition') next = current + Math.abs(qty);
    else if (form.movement_type === 'sale' || form.movement_type === 'damage') next = current - Math.abs(qty);
    else next = current + qty;
    if (next < 0) { setError('لا يمكن أن يصبح المخزون بالسالب.'); setSaving(false); return; }

    const movementQty = form.movement_type === 'adjustment' ? qty : Math.abs(qty);
    const { error: movementError } = await supabase.from('inventory_movements').insert({ product_id: product.id, movement_type: form.movement_type, quantity: movementQty, note: form.note.trim() || null });
    if (movementError) { setError(movementError.message); setSaving(false); return; }
    const { error: stockError } = await supabase.from('products').update({ current_stock: next }).eq('id', product.id);
    if (stockError) { setError('تم تسجيل الحركة لكن تعذر تحديث المخزون: ' + stockError.message); setSaving(false); await load(); return; }
    setForm(emptyForm); setShowForm(false); await load(); setSaving(false);
  }

  const label = type => movementTypes.find(([key])=>key===type)?.[1] || type;
  const signed = (type, qty) => type === 'addition' ? '+' + qty : type === 'adjustment' ? (qty > 0 ? '+' + qty : qty) : '-' + qty;

  return <main className="min-h-screen p-6 md:p-10"><div className="mx-auto max-w-7xl">
    <div className="mb-8 flex items-center justify-between gap-4"><div><p className="text-sm font-medium text-slate-500">DB Kinda</p><h1 className="mt-1 text-3xl font-bold text-slate-900">الحركات</h1><p className="mt-2 text-slate-600">إدارة إضافات وبيعات وتلف وتسويات المخزون.</p></div><Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">الرئيسية</Link></div>
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h2 className="text-xl font-semibold text-slate-900">سجل الحركات</h2><p className="mt-1 text-sm text-slate-500">كل حركة تحدث المخزون الحالي للمنتج.</p></div><button onClick={()=>setShowForm(!showForm)} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">{showForm?'إلغاء':'إضافة حركة'}</button></div>
      {showForm && <form onSubmit={addMovement} className="mt-6 grid gap-3 rounded-xl bg-slate-50 p-4 md:grid-cols-4">
        <select required value={form.product_id} onChange={e=>setForm({...form,product_id:e.target.value})} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="">اختر المنتج</option>{products.map(p=><option key={p.id} value={p.id}>{p.code} — {p.name} (المخزون: {p.current_stock})</option>)}</select>
        <select value={form.movement_type} onChange={e=>setForm({...form,movement_type:e.target.value})} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">{movementTypes.map(([key,l])=><option key={key} value={key}>{l}</option>)}</select>
        <input required type="number" step="1" placeholder={form.movement_type==='adjustment'?'كمية التعديل (+/-)':'الكمية'} value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
        <input type="text" placeholder="ملاحظة (اختياري)" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
        <button disabled={saving} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50 md:col-span-4">{saving?'جارٍ الحفظ...':'حفظ الحركة وتحديث المخزون'}</button>
      </form>}
      {error && <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[800px] text-right text-sm"><thead className="border-b border-slate-200 text-slate-500"><tr>{['التاريخ','الكود','المنتج','نوع الحركة','الكمية','ملاحظة'].map(h=><th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead><tbody>{loading?<tr><td colSpan="6" className="px-4 py-12 text-center text-slate-400">جارٍ التحميل...</td></tr>:movements.length===0?<tr><td colSpan="6" className="px-4 py-12 text-center text-slate-400">لا توجد حركات مسجلة حتى الآن.</td></tr>:movements.map(m=><tr key={m.id} className="border-b border-slate-100"><td className="px-4 py-3">{new Date(m.created_at).toLocaleString('ar-BH')}</td><td className="px-4 py-3 font-medium">{m.products?.code || '—'}</td><td className="px-4 py-3">{m.products?.name || '—'}</td><td className="px-4 py-3">{label(m.movement_type)}</td><td className="px-4 py-3 font-semibold">{signed(m.movement_type,m.quantity)}</td><td className="px-4 py-3">{m.note || '—'}</td></tr>)}</tbody></table></div>
    </section></div></main>;
}
