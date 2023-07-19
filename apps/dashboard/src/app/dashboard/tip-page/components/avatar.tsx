import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface TipPageAvatarProps {
  url: string;
}
export function TipPageAvatar({ url }: TipPageAvatarProps) {
  return (
    <Avatar className="w-20 h-20">
      <AvatarImage src={url} />
      <AvatarFallback>No Avatar</AvatarFallback>
    </Avatar>
  );
}
