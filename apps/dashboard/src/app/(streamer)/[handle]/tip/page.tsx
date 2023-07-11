import { DonationCard } from './components/donation-card';
import { DonationForm } from './components/donation-form';
import { PaymentProvidersModal } from './components/payment-providers-modal';
export default async function Page() {
  return (
    <div className="flex justify-center">
      <DonationCard>
        <DonationForm />
      </DonationCard>
      <PaymentProvidersModal />
    </div>
  );
}
