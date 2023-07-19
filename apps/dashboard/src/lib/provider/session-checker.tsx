'use client';
import { GlobalLoader } from '@/global-stores/global-loading';
import { storeSCAccessToken } from '@/utils/access-token';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';
type SessionContextData = ReturnType<typeof useSession>;

const SessionContext = createContext<SessionContextData | null>(null);
export function SC_SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      if (pathname.includes('/sign-in')) return;
      router.replace('/sign-in');
    }
    return () => {
      GlobalLoader.set(false);
    };
  }, [session, pathname]);
  useEffect(() => {
    if (session.data?.user.access_token) {
      storeSCAccessToken(session.data.user.access_token);
    }
  }, [session.data?.user.access_token]);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const use_SC_Session = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('use_SC_Sessions must be used within a SessionChecker');
  }
  return ctx;
};
