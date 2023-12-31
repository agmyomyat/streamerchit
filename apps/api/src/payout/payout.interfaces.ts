export interface CreatePayoutPayload {
  amount: number;
  bank_account_number: string;
  bank_type: string;
  bank_username: string;
  note: string;
}

export interface ListPayoutHistoryQuery {
  query: {
    take?: number;
    skip?: number;
  };
}