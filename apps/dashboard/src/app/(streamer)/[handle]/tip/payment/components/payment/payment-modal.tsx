import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
type PaymentModalProps = {
  open: boolean;
  close: () => void;
  loading: boolean;
  children: React.ReactNode;
};

export function PaymentModal(props: PaymentModalProps) {
  return (
    <Dialog open={props.open}>
      <DialogContent>
        <div
          onClick={props.close}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-12 w-12" />
          <span className="sr-only">Close</span>
        </div>
        <div className="flex flex-col justify-center items-center ">
          {props.children}
          {props.loading && <Loading />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
function Loading() {
  return (
    <div className="relative w-full  h-1  rounded">
      <div className="w-1/2 absolute top-0 h-1 rounded animate-progress-bar bg-white"></div>
    </div>
  );
}
