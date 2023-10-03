'use client';
// this is only use for "payment not setup" noti at the moment
// give genric names for states and components for later refactor to reusesablility
// should refactor for more reuseable or more messages
import { paymentRegisterationWarningState } from '@/global-stores/top-bar-noti';
import { useSelector } from '@legendapp/state/react';
import { ActivatePaymentRegistrationWarning } from '../payment-warning/activate-payment-warning';
import { PendingPaymentRegisterationWarning } from '../payment-warning/pending-payment-warning';
export function PaymentRegisterationWarningBar() {
  const message = useSelector(paymentRegisterationWarningState);
  if (!message) return null;
  return (
    <div className="py-4 bg-gray-900 w-full flex justify-center">
      {message === 'ActivatePaymentRegisteration' ? (
        <ActivatePaymentRegistrationWarning />
      ) : message === 'PendingPaymentRegistration' ? (
        <PendingPaymentRegisterationWarning />
      ) : null}
    </div>
  );
}
