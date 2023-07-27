export class DonationAlertEventData {
  constructor(
    public name: string,
    public amount: number,
    public message: string
  ) {}
}

export class DonationAlertEventPingData {
  public ping!: boolean;
}