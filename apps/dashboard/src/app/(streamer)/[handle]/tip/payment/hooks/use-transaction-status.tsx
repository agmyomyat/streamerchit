import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/trpc';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function useTransactionStatus(id: string) {
  const [status, setStatus] = useState('');
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timer>();
  useEffect(() => {
    if (status === 'SUCCESS') {
      router.replace('/');
    }
  }, [status]);
  useEffect(() => {
    if (!id) return;
    intervalRef.current = setInterval(() => {
      fetchTransactionStatus(id).then((data) => setStatus(data.status));
    }, 3000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [id]);
  return intervalRef.current;
}
function fetchTransactionStatus(id: string) {
  return client.donation.transactionStatus.query({ id });
}
