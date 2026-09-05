'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;

      if (!data.user && pathname !== '/login') {
        router.replace('/login');
        return;
      }

      if (data.user && pathname === '/login') {
        router.replace('/');
        return;
      }

      setChecking(false);
    }

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== '/login') router.replace('/login');
      if (session && pathname === '/login') router.replace('/');
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (checking && pathname !== '/login') {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">جارٍ التحقق...</div>;
  }

  return children;
}
