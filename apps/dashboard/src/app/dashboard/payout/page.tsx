'use client';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { PayoutHistoryTable } from './components/payout-history-table';
import { useToast } from '@/components/ui/use-toast';
import { use_SC_Session } from '@/lib/provider/session-checker';
import { Button } from '@/components/ui/button';
import { usePaginationButtons } from '@/hooks/use-pagination-buttons';

export default function PayOutPage() {
  const { toast } = useToast();
  const { status } = use_SC_Session();
  const { Comp: PaginationButtons, page } = usePaginationButtons();
  const { data: balance } = trpcReact.user.checkBalance.useQuery();
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MMK',
  }).format(balance?.active_total || 0);
  const { data } = trpcReact.user.payout.list.useQuery(
    {
      query: { skip: page === 1 ? 0 : page * 10, take: 10 },
    },
    { enabled: status === 'authenticated' }
  );
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl mb-5 font-bold">Payout</h1>
        <div className="flex flex-col gap-3">
          <div>Your Balance: {formattedBalance}</div>
          <Button>Create Payout</Button>
        </div>
      </div>
      <PayoutHistoryTable data={data} />
      <PaginationButtons hasMore={data?.length === 10} />
    </div>
  );
}
