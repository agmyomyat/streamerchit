import { Smile } from 'lucide-react';

export function PendingPaymentRegisterationWarning() {
  return (
    <div className="flex text-center items-center flex-col gap-2 ">
      <div className="flex gap-1">
        Good News{' '}
        <span className="flex">
          <Smile /> !!!
        </span>
      </div>
      <span>
        We are reviewing your payment registration details. STAY TUNED, and we
        will get back to you after that
      </span>
    </div>
  );
}
