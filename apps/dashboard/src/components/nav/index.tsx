import { cn } from '@/utils';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
export function NavBar() {
  return (
    <div className={'w-full h-16 flex items-center shadow-sm shadow-gray-600'}>
      <div className="flex sm:mx-16 justify-between w-full">
        <Link href={'/'} passHref>
          <div className="flex gap-1  ">
            <div className={cn('text-xl sm:text-3xl hover:cursor-pointer')}>
              StreamerChit
            </div>
            <Heart size={'1.875rem'} />
          </div>
        </Link>
        <div>
          <Link href={'/sign-in'} passHref>
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
