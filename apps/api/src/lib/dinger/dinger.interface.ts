export type PaymentTokenResponse = {
  code: string;
  message: string;
  time: string;
  response: {
    paymentToken: string;
    expireIn: string;
  };
};
export type DingerPayResponse = {
  code: string;
  message: string;
  time: string;
  response: {
    amount: number;
    merchOrderId: string;
    transactionNum: string;
    formToken?: string | null;
    qrCode?: string | null;
    sign: string;
    signType: string;
  };
};
