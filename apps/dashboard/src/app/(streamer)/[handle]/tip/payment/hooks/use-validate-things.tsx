import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { getPaymentSessionToken } from '../payment.utils';
import { decodeToken, isExpired } from 'react-jwt';
import { useParams, useRouter } from 'next/navigation';
import { TRPCClientErrorLike } from '@trpc/client';

export function useValidateThings(
  paymentProviderName: string,
  trpcError: TRPCClientErrorLike<any> | null
) {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    if (trpcError) {
      toast({ title: 'Error', description: trpcError.message, duration: 5000 });
    }
  }, [trpcError]);
  useEffect(() => {
    const token = getPaymentSessionToken();
    const decodedData = decodeToken(token) as { payment_provider_name };
    if (decodedData?.payment_provider_name !== paymentProviderName) {
      router.replace(`/${params.handle}/tip`);
    }
    if (isExpired(token)) {
      router.replace(`/${params.handle}/tip`);
    }
  }, []);
}
