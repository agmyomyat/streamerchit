'use client';
import { UseFormReturn } from 'react-hook-form';
import { CreatePayoutFormData } from '../page';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { BankTypeSelect } from './bank-type-select';

interface CreatePayoutModalProps {
  form: UseFormReturn<CreatePayoutFormData>;
  onSubmit: () => void;
}
export function CreatePayoutModal(props: CreatePayoutModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Payout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay Out</DialogTitle>
          <DialogDescription>
            We currently only support "pay" payout methods from dashboard. if
            you want to us to transfer from bank account please contact us
          </DialogDescription>
        </DialogHeader>
        <Form {...props.form}>
          <FormField
            control={props.form.control}
            name="bank_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Type</FormLabel>
                <FormControl>
                  <BankTypeSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="bank_account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="bank_username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Aung Aung" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="amount"
            render={({ field: { name, onBlur, onChange, ref, value } }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30000"
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    ref={ref}
                    value={value}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="some note" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => {
              props.onSubmit();
              setOpen(false);
            }}
          >
            Submit
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
