import { Button } from '@/components/ui/button';
import { TipPageAvatar } from '../components/avatar';
interface TipPageAvatarSectionProps {
  url: string;
  onClickAction: () => void;
}
export function TipPageAvatarSection(props: TipPageAvatarSectionProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <TipPageAvatar url={props.url} />
      <Button onClick={props.onClickAction} className="w-32 text-xs">
        Change Avatar
      </Button>
    </div>
  );
}
