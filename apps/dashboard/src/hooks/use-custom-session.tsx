import { storeSCAccessToken } from '@/utils/access-token';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function use_SC_Session() {
  const session = useSession();
  useEffect(() => {
    if (session.data?.user.access_token) {
      storeSCAccessToken(session.data.user.access_token);
    }
  }, [session.data?.user.access_token]);
  return session;
}
