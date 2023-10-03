import { observable } from '@legendapp/state';
// give genric name for later refactor to reusesablility
// right not this is only use for dinger payment not setup noti
type PaymentwarningState =
  | 'ActivatePaymentRegisteration'
  | 'PendingPaymentRegistration'
  | null;
export const paymentRegisterationWarningState =
  observable<PaymentwarningState>(null);
