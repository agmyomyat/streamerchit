'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createContext, useContext, useEffect, useState } from 'react';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { windowRedirect } from '@/utils/window-redirect';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  amount: z.string().min(3, {
    message: 'Tip amount must be at least 500',
  }),
  message: z
    .string()
    .min(1, { message: 'Message must be not be empty' })
    .max(255, {
      message: 'Message must be less than 255 characters',
    }),
});
export type DonationFormData = z.infer<typeof formSchema>;
interface TipPageContextData {
  donationForm: UseFormReturn<{
    name: string;
    message: string;
    amount: string;
  }>;
  streamer: {
    image: string;
    name: string;
  };
  paymentProviderModal: boolean;
  openPaymentProviderModal: () => void;
  closePaymentProviderModal: () => void;
  onSubmit: () => void;
  submitting:boolean
}

const TipPageContext = createContext<TipPageContextData | null>(null);
export function useTipPageContext() {
  const ctx = useContext(TipPageContext);
  if (ctx === null) {
    throw new Error('useTipPageContext must be used within a TipPage');
  }
  return ctx;
}
export function TipePageProvider(streamer: {
  image: string;
  name: string;
  streamerId: string;
  children: React.ReactNode;
}) {
  const {
    mutateAsync: prebuiltCheckoutMutate,
    isLoading,
    error,
  } = trpcReact.donation.prebuilt_checkout.useMutation();
    const { toast } = useToast();
    useEffect(() => {
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    }, [error]); 
  const form = useForm<DonationFormData>({
    defaultValues: { name: '', message: '', amount: '' },
    resolver: zodResolver(formSchema),
  });
  const [paymentSessionToken, setPaymentSessionToken] = useState('');
  const [paymentProviderModal, setPaymentProviderModal] = useState(false);
  function storePaymentSessionToken(token: string) {
    setPaymentSessionToken(token);
  }

  function openPaymentProviderModal() {
    setPaymentProviderModal(true);
  }
  function closePaymentProviderModal() {
    setPaymentProviderModal(false);
  }
  const onSubmit = form.handleSubmit(async (data) => {
    const prebuilt_checkout = await prebuiltCheckoutMutate({
      amount: parseInt(data.amount),
      donar_name: data.name,
      message: data.message,
      streamer_id: streamer.streamerId,
    });
    if (prebuilt_checkout.checkout_link) {
      windowRedirect(prebuilt_checkout.checkout_link);
    }
  });

  return (
    <TipPageContext.Provider
      value={{
        submitting:isLoading,
        onSubmit,
        donationForm: form,
        streamer: streamer,
        paymentProviderModal,
        openPaymentProviderModal,
        closePaymentProviderModal,
      }}
    >
      {streamer.children}
    </TipPageContext.Provider>
  );
}
