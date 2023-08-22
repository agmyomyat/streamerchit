export interface CreatePaymentTransactionParams {
  amount: number;
  streamerName: string;
  streamerId: string;
  donarMessage: string;
  donarName: string;
  paymentMethod: string;
  paymentProvider: string;
}
