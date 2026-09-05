import Link from 'next/link';

export default function ReportsPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">DB Kinda</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">التقارير</h1>
            <p className="mt-2 text-slate-600">نظرة مختصرة على المنتجات والمخزون والحركات.</p>
          </div>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">الرئيسية</Link>
        </div>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['تقرير المخزون', 'إجمالي القطع والمنتجات منخفضة المخزون.'],
            ['تقرير المنتجات', 'ملخص المنتجات والمجموعات والأسعار.'],
            ['تقرير الحركات', 'ملخص الإضافات والبيعات والتلف والتسويات.'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              <button className="mt-5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">عرض التقرير</button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
