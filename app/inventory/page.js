import Link from 'next/link';

export default function InventoryPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">DB Kinda</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">المخزون</h1>
            <p className="mt-2 text-slate-600">متابعة الكميات الحالية لكل منتج.</p>
          </div>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">الرئيسية</Link>
        </div>
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">إجمالي القطع</p><p className="mt-2 text-3xl font-bold text-slate-900">0</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">منتجات منخفضة المخزون</p><p className="mt-2 text-3xl font-bold text-slate-900">0</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">منتجات بدون مخزون</p><p className="mt-2 text-3xl font-bold text-slate-900">0</p></div>
        </section>
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">تفاصيل المخزون</h2>
          <p className="mt-2 text-sm text-slate-500">ستظهر هنا كميات المنتجات وحالتها بعد إضافة البيانات.</p>
        </section>
      </div>
    </main>
  );
}
