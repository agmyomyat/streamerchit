'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { use_SC_Session } from '@/hooks/use-custom-session';
import { scSignOut } from '@/lib/auth/sc-sign-out';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { getSession, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useEffect } from 'react';

export default function Home() {
  const session = use_SC_Session();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { data } = trpcReact.donation.transactionStatus.useQuery({ id: 'hi' });
  useEffect(() => {
    console.log(session);
  }, [session]);
  const signOutNow = async () => {
    setIsLoading(true);
    try {
      await scSignOut();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging out',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{JSON.stringify(session)}</div>
      {session.status === 'authenticated' ? (
        <Button disabled={isLoading} onClick={signOutNow}>
          signout
        </Button>
      ) : null}
    </main>
  );
}
