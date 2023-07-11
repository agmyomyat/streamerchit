'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTipPageContext } from '../../providers/tip-page-provider';
export function DonationForm() {
  const {
    donationForm: form,
    streamer,
    openPaymentProviderModal,
  } = useTipPageContext();
  const watchedAmount = form.watch('amount');
  function onSubmit() {
    openPaymentProviderModal();
  }
  return (
    <Form {...form}>
      <div className="flex flex-col">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Aung Aung" {...field} />
                </FormControl>
                <FormDescription>Enter Your Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10000" {...field} />
                </FormControl>
                <FormDescription>Enter Tip Amount</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="I love you" {...field} />
                </FormControl>
                <FormDescription>Enter what you want to say</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between flex-wrap">
            <div className="font-semibold">
              Donation to <span className="capitalize">{streamer.name}</span>
            </div>
            <div className="font-semibold">Ks: {watchedAmount || 0}</div>
          </div>
          <Button type="submit" className="mt-5 px-16 self-center">
            Donate
          </Button>
        </form>
      </div>
    </Form>
  );
}
