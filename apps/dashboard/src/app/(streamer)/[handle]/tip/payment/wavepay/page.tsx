'use client';
import APP from '@/components/icons/phone-icon';
import { Payment } from '../components/payment';
import { useToast } from '@/components/ui/use-toast';
import { WAVE_PAY_PROVIDER_NAME } from '@/constants/dinger-payment-providers';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { windowRedirect } from '@/utils/window-redirect';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { isExpired } from 'react-jwt';
import { useTipPageContext } from '../../../providers/tip-page-provider';
import { useValidateThings } from '../hooks/use-validate-things';
import { getPaymentSessionToken } from '../payment.utils';
type PaymentMethods = 'PIN';
export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { donationForm } = useTipPageContext();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethods>('PIN');
  const { mutateAsync, isLoading, error } =
    trpcReact.donation.createTransaction.useMutation();
  useValidateThings(WAVE_PAY_PROVIDER_NAME, error);
  function onSubmit() {
    if (isExpired(getPaymentSessionToken())) {
      toast({
        title: 'Expired',
        description: 'Your Payment Token expired',
        duration: 5000,
        variant: 'destructive',
      });
      router.replace(`/${params.handle}/tip`);
      return;
    }
    mutateAsync({
      payment_method: selectedMethod,
      payment_session_token: getPaymentSessionToken(),
    }).then((res) => {
      if (res.redirect_url) {
        windowRedirect(res.redirect_url);
        return;
      }
    });
  }
  return (
    <>
      <Payment submit={onSubmit} submitting={isLoading}>
        <Payment.CardsContainer total={donationForm.getValues().amount}>
          <Payment.Card
            label="Pay with PIN"
            methodName="PIN"
            selectedMethod={selectedMethod}
            setMethod={() => setSelectedMethod('PIN')}
            Icon={<APP />}
          />
        </Payment.CardsContainer>
      </Payment>
    </>
  );
}
