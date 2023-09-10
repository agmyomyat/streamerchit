'use client';
import { cn } from '@/utils';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSCSession } from '@/lib/provider/session-checker';
import { scSignOut } from '@/lib/auth/sc-sign-out';
import { useEffect } from 'react';
import { TopBarMessageState } from '@/global-stores/top-bar-noti';
import { PaymentSetupWarning } from '../payment-warning';
export function NavBar() {
  const session = useSCSession();
  const path = usePathname();
  useEffect(() => {
    if (!session.data?.user) return;
    if (!session.data?.user.payment_configured) {
      TopBarMessageState.set(<PaymentSetupWarning />);
    }
    return () => {
      TopBarMessageState.set(null);
    };
  }, [session]);
  return (
    <div className={'w-full h-16 flex items-center shadow-sm shadow-gray-600'}>
      <div className="flex sm:mx-16 justify-between w-full">
        <Link href={'/'} passHref>
          <div className="flex gap-1  ">
            <div className={cn('text-xl sm:text-3xl hover:cursor-pointer')}>
              StreamerChit
            </div>
            <Heart size={'1.875rem'} />
            <div className="text-[0.625rem] text-blue-300 self-end">BETA</div>
          </div>
        </Link>
        {session?.data?.user ? (
          <div className="flex gap-3">
            <div className={cn({ hidden: path.includes('dashboard') })}>
              <Link href={'/dashboard/account'} passHref>
                <Button>Dashboard</Button>
              </Link>
            </div>
            <Button variant={'destructive'} onClick={scSignOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div>
            <Link href={'/sign-in'} passHref>
              <Button>Sign In</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
