'use client';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { PayoutHistoryTable } from './components/payout-history-table';
import { useToast } from '@/components/ui/use-toast';
import { useSCSession } from '@/lib/provider/session-checker';
import { usePaginationButtons } from '@/hooks/use-pagination-buttons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePayoutModal } from './components/create-payout-modal';
import { GlobalLoader } from '@/global-stores/global-loading';
import { useEffect } from 'react';
const CreatePayoutFormDataZod = z.object({
  amount: z.number().min(30000, { message: 'Minimum Payout is 30,000 MMK' }),
  bank_account_number: z.string().nonempty(),
  bank_type: z.string().nonempty({ message: 'please ' }),
  bank_username: z.string().nonempty(),
  note: z.string(),
});
export type CreatePayoutFormData = z.infer<typeof CreatePayoutFormDataZod>;
export default function PayOutPage() {
  const { toast } = useToast();
  const { status } = useSCSession();
  const { Comp: PaginationButtons, page } = usePaginationButtons();
  const { data: balance, refetch: refetchBalance } =
    trpcReact.user.checkBalance.useQuery();
  const { mutate } = trpcReact.user.payout.create.useMutation();
  const form = useForm<CreatePayoutFormData>({
    defaultValues: {
      amount: 0,
      bank_account_number: '',
      bank_type: '',
      bank_username: '',
      note: '',
    },
    resolver: zodResolver(CreatePayoutFormDataZod),
  });
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MMK',
  }).format(balance?.active_total || 0);
  const {
    data,
    refetch: refetchPayoutList,
    isLoading: payoutListLoading,
    isFetching: payoutListFetching,
  } = trpcReact.user.payout.list.useQuery(
    {
      query: { skip: Math.ceil(page - 1), take: 10 },
    },
    { enabled: status === 'authenticated' }
  );
  useEffect(() => {
    if (payoutListLoading || payoutListFetching) {
      GlobalLoader.set(true);
      return;
    }
    GlobalLoader.set(false);
    return () => {
      GlobalLoader.set(false);
    };
  }, [payoutListFetching, payoutListLoading]);
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl mb-5 font-bold">Payout</h1>
        <div className="flex flex-col gap-3">
          <div>Your Balance: {formattedBalance}</div>
          <CreatePayoutModal
            onSubmit={form.handleSubmit((data) => {
              GlobalLoader.set(true);
              mutate(data, {
                onSuccess: () => {
                  toast({
                    title: 'Payout Successfully created',
                    variant: 'default',
                  });
                  refetchPayoutList();
                  refetchBalance();
                  form.reset();
                },
                onError: (error) => {
                  toast({
                    title: 'error while creating payout',
                    variant: 'destructive',
                    description: error.message,
                  });
                },
                onSettled: () => {
                  GlobalLoader.set(false);
                },
              });
            })}
            form={form}
          />
        </div>
      </div>
      <PayoutHistoryTable data={data} />
      <PaginationButtons hasMore={data?.length === 10} />
    </div>
  );
}
