const sections = [
  ['المنتجات', 'إدارة الحيوانات والقطع والبيانات الخاصة بكل منتج'],
  ['المجموعات', 'تنظيم المنتجات حسب المجموعات التي وصلت منها'],
  ['المخزون', 'متابعة الكميات الحالية لكل منتج'],
  ['الحركات', 'سجل الإضافات والمبيعات والتلف والتسويات'],
  ['التقارير', 'نظرة مختصرة على المنتجات والمخزون والحركات'],
  ['الإعدادات', 'إعدادات النظام الأساسية'],
];

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="mb-2 text-sm font-medium text-slate-500">DB Kinda</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">نظام إدارة المنتجات والمخزون</h1>
          <p className="mt-2 text-slate-600">لوحة التحكم الرئيسية</p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(([title, description]) => (
            <article
              key={title}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              <button className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                فتح
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
