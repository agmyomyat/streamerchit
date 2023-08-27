import { Button } from '@/components/ui/button';

export function SLConnectButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="bg-[#31c3a2]">
      CONNECT
    </Button>
  );
}
