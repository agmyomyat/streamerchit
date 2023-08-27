import { Button } from '@/components/ui/button';

export function SLDisconnectButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="bg-red-500">
      Disconnect
    </Button>
  );
}
