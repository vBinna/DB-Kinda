import './globals.css';
import AuthGuard from './auth-guard';

export const metadata = {
  title: 'DB Kinda',
  description: 'نظام إدارة المنتجات والمخزون',
};

const navigation = [
  ['الرئيسية', '/'],
  ['المنتجات', '/products'],
  ['المجموعات', '/collections'],
  ['المخزون', '/inventory'],
  ['الحركات', '/movements'],
  ['التقارير', '/reports'],
  ['الإعدادات', '/settings'],
];

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthGuard>
          <div className="min-h-screen bg-slate-50">
            <aside className="fixed right-0 top-0 hidden h-screen w-64 border-l border-slate-200 bg-white p-5 lg:block">
              <div className="mb-8">
                <div className="text-2xl font-black text-slate-900">DB Kinda</div>
                <div className="mt-1 text-sm text-slate-500">إدارة المنتجات والمخزون</div>
              </div>
              <nav className="space-y-1">
                {navigation.map(([label, href]) => (
                  <a key={href} href={href} className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950">
                    {label}
                  </a>
                ))}
              </nav>
            </aside>
            <main className="lg:mr-64">{children}</main>
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}
