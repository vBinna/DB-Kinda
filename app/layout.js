import './globals.css';

export const metadata = {
  title: 'DB Kinda',
  description: 'نظام إدارة المنتجات والمخزون',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
