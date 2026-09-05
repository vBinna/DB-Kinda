import Link from 'next/link';

const movementTypes = [
  ['addition', 'إضافة'],
  ['sale', 'بيع'],
  ['damage', 'تلف'],
  ['adjustment', 'تسوية'],
];

export default function MovementsPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">DB Kinda</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">الحركات</h1>
            <p className="mt-2 text-slate-600">سجل إضافات وبيعات وتلف وتسويات المخزون.</p>
          </div>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">الرئيسية</Link>
        </div>
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">سجل الحركات</h2>
              <p className="mt-1 text-sm text-slate-500">سيتم ربط السجل بقاعدة البيانات في الخطوة التالية.</p>
            </div>
            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">إضافة حركة</button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {movementTypes.map(([, label]) => <span key={label} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">{label}</span>)}
          </div>
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400">لا توجد حركات مسجلة حتى الآن.</div>
        </section>
      </div>
    </main>
  );
}
