import { storeSCAccessToken } from '@/utils/access-token';
import { signOut } from 'next-auth/react';

export function scSignOut() {
  storeSCAccessToken('');
  return signOut();
}
