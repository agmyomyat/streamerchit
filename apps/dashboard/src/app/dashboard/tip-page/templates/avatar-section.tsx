import { Button } from '@/components/ui/button';
import { TipPageAvatar } from '../components/avatar';
interface TipPageAvatarSectionProps {
  url: string;
  children: React.ReactNode;
}
export function TipPageAvatarSection(props: TipPageAvatarSectionProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <TipPageAvatar url={props.url} />
      {props.children}
    </div>
  );
}
