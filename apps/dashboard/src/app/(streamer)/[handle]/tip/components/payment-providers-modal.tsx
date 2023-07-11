'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTipPageContext } from '../../providers/tip-page-provider';
import { KbzPayButton } from '@/components/payments/kbz-pay-button';
import { AyaPayButton } from '@/components/payments/aya-pay-button';
import { WavePayButton } from '@/components/payments/wave-pay-button';
import { CbPayButton } from '@/components/payments/cb-pay-button';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { useParams, useRouter } from 'next/navigation';
import { storePaymentSessionToken } from '../payment/payment.utils';
import {
  AYA_PAY_PROVIDER_NAME,
  KBZ_PAY_PROVIDER_NAME,
  WAVE_PAY_PROVIDER_NAME,
} from '@/constants/dinger-payment-providers';

export function PaymentProvidersModal() {
  const router = useRouter();
  const params = useParams();
  const { paymentProviderModal, closePaymentProviderModal, donationForm } =
    useTipPageContext();
  const { mutateAsync, isLoading } =
    trpcReact.donation.createPaymentSession.useMutation();
  function createPaymentSession(routePath: string, paymentProvider: string) {
    const values = donationForm.getValues();
    mutateAsync({
      amount: parseInt(values.amount),
      donation_page_handle: params.handle,
      message: values.message,
      name: values.name,
      payment_name: paymentProvider,
    }).then((res) => {
      storePaymentSessionToken(res.token);
      router.push(`tip/payment/${routePath}`);
    });
  }
  return (
    <Dialog
      open={paymentProviderModal}
      modal
      onOpenChange={closePaymentProviderModal}
    >
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-3">
            <div>Total Amount</div>
            <div className="text-lg">{donationForm.getValues().amount} Ks</div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 w-full justify-center">
          <KbzPayButton
            onClick={() =>
              createPaymentSession('kbzpay', KBZ_PAY_PROVIDER_NAME)
            }
            disabled={isLoading}
            className="py-6"
          />
          <AyaPayButton
            onClick={() =>
              createPaymentSession('ayapay', AYA_PAY_PROVIDER_NAME)
            }
            disabled={isLoading}
            className="py-6"
          />
          <WavePayButton
            onClick={() =>
              createPaymentSession('wavepay', WAVE_PAY_PROVIDER_NAME)
            }
            disabled={isLoading}
            className="py-6"
          />
          {/* <CbPayButton disabled={isLoading} className="py-6" /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
