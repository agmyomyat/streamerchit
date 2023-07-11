'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createContext, useContext, useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  amount: z.string().min(3, {
    message: 'Tip amount must be at least 500',
  }),
  message: z.string().max(255, {
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
  children: React.ReactNode;
}) {
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
  const form = useForm<DonationFormData>({
    defaultValues: { name: '', message: '', amount: '' },
    resolver: zodResolver(formSchema),
  });
  return (
    <TipPageContext.Provider
      value={{
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
