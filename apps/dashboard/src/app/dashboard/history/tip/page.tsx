'use client';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { TipHistoryTable } from './components/history-table';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GlobalLoader } from '@/global-stores/global-loading';
import { useToast } from '@/components/ui/use-toast';

export default function TipHistoryPage() {
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const {
    data,
    error,
    isLoading: loadingHistory,
    isFetching: fetchingHistory,
  } = trpcReact.user.getDonationHistory.useQuery({
    query: { skip: page === 1 ? 0 : page * 10, take: 10 },
  });
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
  if (!data || !data?.length) {
    return (
      <div className="flex w-full justify-center">
        <h1>No History Yet</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <TipHistoryTable data={data} />
      <div className="flex self-center gap-9 my-5">
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          prev
        </Button>
        <div className="w-10 text-center">{page}</div>
        <Button
          disabled={data?.length !== 10}
          onClick={() => setPage((prev) => prev + 1)}
        >
          next
        </Button>
      </div>
    </div>
  );
}
