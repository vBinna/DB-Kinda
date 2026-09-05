import Link from 'next/link';

export default function SettingsPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">DB Kinda</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">الإعدادات</h1>
            <p className="mt-2 text-slate-600">الإعدادات الأساسية للنظام.</p>
          </div>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">الرئيسية</Link>
        </div>
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">معلومات النظام</h2>
            <p className="mt-2 text-sm text-slate-500">DB Kinda — نظام إدارة المنتجات والمخزون.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">قاعدة البيانات</h2>
            <p className="mt-2 text-sm text-slate-500">Supabase / PostgreSQL</p>
          </div>
        </section>
      </div>
    </main>
  );
}
