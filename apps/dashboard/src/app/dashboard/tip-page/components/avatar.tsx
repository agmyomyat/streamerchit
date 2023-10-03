import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface TipPageAvatarProps {
  url: string;
}
export function TipPageAvatar({ url }: TipPageAvatarProps) {
  return (
    <Avatar className="w-32 h-32">
      <AvatarImage src={url} />
      <AvatarFallback>No Avatar</AvatarFallback>
    </Avatar>
  );
}
