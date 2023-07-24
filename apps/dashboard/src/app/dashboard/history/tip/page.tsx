'use client';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { TipHistoryTable } from './components/history-table';
import { useEffect } from 'react';
import { GlobalLoader } from '@/global-stores/global-loading';
import { useToast } from '@/components/ui/use-toast';
import { use_SC_Session } from '@/lib/provider/session-checker';
import { usePaginationButtons } from '@/hooks/use-pagination-buttons';

export default function TipHistoryPage() {
  const { Comp: PaginationButtons, page } = usePaginationButtons();
  const { toast } = useToast();
  const { status } = use_SC_Session();
  const {
    data,
    error,
    isLoading: loadingHistory,
    isFetching: fetchingHistory,
  } = trpcReact.user.getDonationHistory.useQuery(
    {
      query: { skip: page === 1 ? 0 : page * 10, take: 10 },
    },
    { enabled: status === 'authenticated' }
  );
  useEffect(() => {
    if (error) {
      toast({ title: 'Error occured try refreshing the page' });
    }
  }, [error]);
  useEffect(() => {
    if (loadingHistory || fetchingHistory) {
      GlobalLoader.set(true);
      return;
    }
    GlobalLoader.set(false);
  }, [loadingHistory, fetchingHistory]);
  // if (!data || !data?.length) {
  //   return (
  //     <div className="flex w-full justify-center">
  //       <h1>No History Yet</h1>
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col w-full">
      <TipHistoryTable data={data} />
      <PaginationButtons hasMore={data?.length === 10} />
    </div>
  );
}
