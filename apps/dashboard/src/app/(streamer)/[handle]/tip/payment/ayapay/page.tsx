'use client';
import APP from '@/components/icons/phone-icon';
import QR from '@/components/icons/qr-icon';
import { QRCodeSVG } from 'qrcode.react';
import { Payment } from '../components/payment';
import { PaymentModal } from '../components/payment/payment-modal';
import { useToast } from '@/components/ui/use-toast';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { windowRedirect } from '@/utils/window-redirect';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { isExpired } from 'react-jwt';
import { useTipPageContext } from '../../../providers/tip-page-provider';
import { useTransactionStatus } from '../hooks/use-transaction-status';
import { useValidateThings } from '../hooks/use-validate-things';
import { getPaymentSessionToken } from '../payment.utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { PinModalContent } from './pin-modal-content';
import { AYA_PAY_PROVIDER_NAME } from '@/constants/dinger-payment-providers';

type PaymentMethods = 'QR' | 'PIN';
export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { donationForm } = useTipPageContext();
  const [qrModal, setQrModal] = useState('');
  const [pinModal, setPinModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethods>('QR');
  const form = useForm<{ phone: string }>({
    resolver: zodResolver(z.object({ phone: z.string().length(11) })),
  });
  const { data, mutateAsync, isLoading, error } =
    trpcReact.donation.createTransaction.useMutation();
  useValidateThings(AYA_PAY_PROVIDER_NAME, error);
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
      payment_session_token: getPaymentSessionToken(),
      phone: form.getValues().phone,
      payment_method: selectedMethod,
    }).then((res) => {
      if (res.qrCode) {
        setQrModal(res.qrCode || '');
        return;
      }
      // this is for pin method
      if (res.merchOrderId) {
        setPinModal(true);
        return;
      }
    });
  }
  return (
    <>
      <Payment
        submit={
          // pin method should validate form
          selectedMethod === 'PIN' ? form.handleSubmit(onSubmit) : onSubmit
        }
        submitting={isLoading}
      >
        <Payment.CardsContainer total={donationForm.getValues().amount}>
          <Payment.Card
            label="Pay with QR"
            methodName="QR"
            selectedMethod={selectedMethod}
            setMethod={() => setSelectedMethod('QR')}
            Icon={<QR />}
          />
          <Payment.Card
            label="Send notification to Aya pay mobile app"
            methodName="PIN"
            selectedMethod={selectedMethod}
            setMethod={() => setSelectedMethod('PIN')}
            Icon={<APP />}
          />
        </Payment.CardsContainer>
        {selectedMethod === 'PIN' && (
          <Form {...form}>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your AYA pay phone number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="0979xxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        )}
      </Payment>
      <PaymentModal
        close={() => {
          clearInterval(intervalRef);
          setPinModal(false);
        }}
        loading
        open={pinModal}
      >
        <PinModalContent />
      </PaymentModal>
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
