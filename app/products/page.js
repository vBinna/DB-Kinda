import Link from 'next/link';

export default function ProductsPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">DB Kinda</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">المنتجات</h1>
            <p className="mt-2 text-slate-600">إدارة الحيوانات والقطع والبيانات الخاصة بكل منتج.</p>
          </div>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            الرئيسية
          </Link>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">قائمة المنتجات</h2>
              <p className="mt-1 text-sm text-slate-500">ستظهر هنا المنتجات مع الكود والمجموعة والسعر والمخزون.</p>
            </div>
            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
              إضافة منتج
            </button>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[700px] text-right text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">الكود</th>
                  <th className="px-4 py-3 font-medium">اسم المنتج</th>
                  <th className="px-4 py-3 font-medium">النوع</th>
                  <th className="px-4 py-3 font-medium">المجموعة</th>
                  <th className="px-4 py-3 font-medium">السعر</th>
                  <th className="px-4 py-3 font-medium">المخزون</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center text-slate-400">
                    لا توجد منتجات مضافة حتى الآن.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
