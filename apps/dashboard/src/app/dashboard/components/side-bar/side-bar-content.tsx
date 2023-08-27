import { Button } from '@/components/ui/button';
import {
  Activity,
  Boxes,
  UserSquare,
  CircleDollarSign,
  User2,
  History,
  Shirt,
} from 'lucide-react';
import Link from 'next/link';

export interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  routePath: string;
}
export function SidebarContent({ className, routePath }: SidebarContentProps) {
  return (
    <div className={className}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link href="/dashboard/tip-activities">
              <Button
                variant={
                  routePath.includes('tip-activities') ? 'secondary' : 'ghost'
                }
                className="w-full justify-start"
              >
                <Activity className="mr-2 w-4 h-4" />
                Tip Activities
              </Button>
            </Link>
            <Link href="/dashboard/account">
              <Button
                variant={routePath.includes('account') ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <User2 className="mr-2 w-4 h-4" />
                Account
              </Button>
            </Link>
            {/* <Link href="/dashboard/alertbox">
              <Button
                variant={routePath.includes('alertbox') ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <Boxes className="mr-2 h-4 w-4" />
                Alert Box
              </Button>
            </Link> */}
            <Link href="/dashboard/tip-page">
              <Button
                variant={routePath.includes('tip-page') ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <UserSquare className="mr-2 w-4 h-4" />
                Tip Page
              </Button>
            </Link>
            {/* <Link href="/dashboard/payout">
              <Button
                variant={routePath.includes('payout') ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <CircleDollarSign className="mr-2 w-4 h-4" />
                Payout
              </Button>
            </Link> */}
            <Link href="/dashboard/history/tip">
              <Button
                variant={
                  routePath.includes('history/tip') ? 'secondary' : 'ghost'
                }
                className="w-full justify-start"
              >
                <History className="mr-2 w-4 h-4" />
                Tip History
              </Button>
            </Link>
            <Link href="/dashboard/merchstore">
              <Button variant={'ghost'} className="w-full justify-start">
                <Shirt className="mr-2 w-4 h-4" />
                Merch Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
