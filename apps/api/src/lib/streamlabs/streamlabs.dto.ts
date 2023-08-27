export class CreateDonationDto {
  name!: string;
  message!: string;
  identifier!: string;
  amount!: number;
  currency!: 'USD';
}
