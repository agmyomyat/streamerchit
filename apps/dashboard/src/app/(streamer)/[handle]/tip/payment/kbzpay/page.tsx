'use client';
import { useEffect, useState } from 'react';
import { isExpired } from 'react-jwt';
import { useParams, useRouter } from 'next/navigation';
import { getPaymentSessionToken } from '../payment.utils';
import APP from '@/components/icons/phone-icon';
import QR from '@/components/icons/qr-icon';
import { Payment } from '../components/payment';
import { useTipPageContext } from '../../../providers/tip-page-provider';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { PaymentModal } from '../components/payment/payment-modal';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/components/ui/use-toast';
import { useValidateThings } from '../hooks/use-validate-things';
import { windowRedirect } from '@/utils/window-redirect';
import { useTransactionStatus } from '../hooks/use-transaction-status';
import { KBZ_PAY_PROVIDER_NAME } from '@/constants/dinger-payment-providers';
const PAYMENT_PROVIDER_NAME = 'KBZ Pay';
type PaymentMethods = 'QR' | 'PWA';
export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { donationForm } = useTipPageContext();
  const [qrModal, setQrModal] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethods>('QR');
  const { data, mutateAsync, isLoading, error } =
    trpcReact.donation.createTransaction.useMutation();
  useValidateThings(KBZ_PAY_PROVIDER_NAME, error);
  const intervalRef = useTransactionStatus(data?.merchOrderId || '');
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
      setQrModal(res.qrCode || '');
    });
  }
  return (
    <>
      <Payment submit={onSubmit} submitting={isLoading}>
        <Payment.CardsContainer total={donationForm.getValues().amount}>
          <Payment.Card
            label="Pay with QR"
            methodName="QR"
            selectedMethod={selectedMethod}
            setMethod={() => setSelectedMethod('QR')}
            Icon={<QR />}
          />
          <Payment.Card
            label="Pay with mobile app"
            methodName="PWA"
            selectedMethod={selectedMethod}
            setMethod={() => setSelectedMethod('PWA')}
            Icon={<APP />}
          />
        </Payment.CardsContainer>
      </Payment>
      <PaymentModal
        close={() => {
          clearInterval(intervalRef);
          setQrModal('');
        }}
        loading
        open={!!qrModal}
      >
        <QRCodeSVG
          value={qrModal}
          fgColor="#FFFFFF"
          bgColor="#000000"
          className="w-96 h-96 p-10 max-w-full"
        />
      </PaymentModal>
    </>
  );
}
