'use client';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSCSession } from '@/lib/provider/session-checker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '../ui/form';
import { useState } from 'react';
const ActivatePaymentDialogFormDataZod = z
  .object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    fb_link: z.string(),
  })
  .required();
export type ActivatePaymentDialogFormData = z.infer<
  typeof ActivatePaymentDialogFormDataZod
>;

export function ActivatePaymentRegistrationWarning() {
  const [registerFormOpen, setRegisterFormOpen] = useState(false);
  const form = useForm<ActivatePaymentDialogFormData>();
  const { update } = useSCSession();
  const { mutateAsync, isLoading } =
    trpcReact.user.registerPayment.useMutation();
  // payment_register_status gets from user session so after mutate session needs to refresh to get "PENDING" state in session object ;
  const submit = form.handleSubmit(async (data) => {
    await mutateAsync(data);
    await update();
    setRegisterFormOpen(false);
  });
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <h1>Set up payment to start accepting donations.</h1>

        <Dialog
          open={registerFormOpen}
          onOpenChange={(prev) => setRegisterFormOpen(!!prev)}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#FDBE34] h-8">Activate Payment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Register Payment Account</DialogTitle>
              <DialogDescription>
                We Partnered with{' '}
                <span>
                  <Link
                    target="_blank"
                    className="text-[#FDBE34]"
                    href={'https://dinger.asia'}
                  >
                    {' '}
                    Dinger
                  </Link>
                </span>{' '}
                {
                  "to handle all payments to accept donation. To create a Dinger account, we need to check your identity and verify your streamer profile. After that, we'll get in touch with you and give you more information on setting up your payment account."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Your Name" />
                      </FormControl>
                      <FormDescription>Your Name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({
                    field: { name, value, onBlur, onChange, ref },
                  }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          name={name}
                          value={value || ''}
                          onBlur={onBlur}
                          onChange={onChange}
                          ref={ref}
                          placeholder="Email"
                        />
                      </FormControl>
                      <FormDescription>
                        Email to get invitation for payment account
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Your Phone Number"
                        />
                      </FormControl>
                      <FormDescription>
                        To contact you after reviewing your form
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fb_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Your Facebook Link"
                        />
                      </FormControl>
                      <FormDescription>
                        facebook profile link that you stream
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
            <DialogFooter>
              <Button disabled={isLoading} onClick={submit}>
                Register
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
