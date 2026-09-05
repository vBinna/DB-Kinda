import Link from 'next/link';

export default function CollectionsPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">DB Kinda</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">المجموعات</h1>
            <p className="mt-2 text-slate-600">تنظيم المنتجات حسب المجموعات التي وصلت منها.</p>
          </div>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">الرئيسية</Link>
        </div>
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">قائمة المجموعات</h2>
              <p className="mt-1 text-sm text-slate-500">كل مجموعة تمثل مصدرًا أو دفعة للمنتجات.</p>
            </div>
            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">إضافة مجموعة</button>
          </div>
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400">لا توجد مجموعات مضافة حتى الآن.</div>
        </section>
      </div>
    </main>
  );
}
