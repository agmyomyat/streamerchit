'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/utils';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { OAUTH_CREATE_ACCOUNT_ERROR } from './sign-in.constants';
export default function Page() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === OAUTH_CREATE_ACCOUNT_ERROR) {
      // settimeout to show in initial page load
      setTimeout(() => {
        toast({
          title: 'Error',
          description:
            'You are not permitted to create an account get an invitation from our team first',
          variant: 'destructive',
          duration: 10000,
        });
      }, 500);
    }
  }, [searchParams]);
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn('google');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex justify-center')}>
      <Button
        type="button"
        size="sm"
        className=" w-96 max-w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        Google
      </Button>
    </div>
  );
}
