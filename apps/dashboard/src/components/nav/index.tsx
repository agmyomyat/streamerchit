'use client';
import { cn } from '@/utils';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use_SC_Session } from '@/lib/provider/session-checker';
export function NavBar() {
  const session = use_SC_Session();
  const path = usePathname();
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
          <div className={cn({ hidden: path.includes('dashboard') })}>
            <Link href={'/dashboard/alertbox'} passHref>
              <Button>Dashboard</Button>
            </Link>
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
