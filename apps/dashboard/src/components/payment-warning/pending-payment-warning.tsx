import { Smile } from 'lucide-react';

export function PendingPaymentRegisterationWarning() {
  return (
    <div className="flex gap-2 ">
      Good News{' '}
      <span className="flex">
        <Smile /> !!!
      </span>
      <span>
        We are reviewing your payment registration details. STAY TUNED, and we
        will get back to you after that
      </span>
    </div>
  );
}
