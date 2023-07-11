import { isServer } from '@/utils/is-server';

export function storePaymentSessionToken(token: string) {
  if (!isServer()) {
    return localStorage.setItem('paymentSessionToken', token);
  }
}
export function getPaymentSessionToken() {
  if (!isServer()) {
    return localStorage.getItem('paymentSessionToken') || '';
  }
  return '';
}
