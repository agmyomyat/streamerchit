'use client';
import { cn } from '@/utils';
import { SidebarContent } from './side-bar-content';
import { usePathname } from 'next/navigation';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Sidebar({ className }: SidebarProps) {
  const path = usePathname();
  return (
    <div className={cn('pb-12', className)}>
      <SidebarContent routePath={path} />
    </div>
  );
}
