'use client';
import { StreamLabsSvg } from '@/components/icons/streamlabs-logo';
import { useSCSession } from '@/lib/provider/session-checker';
import { SLConnectButton } from './components/sl-connect-button';
import { useEffect } from 'react';
import { isProduction } from '@/utils/is-production';
import { windowRedirect } from '@/utils/window-redirect';
import { SLDisconnectButton } from './components/sl-disconnect-button';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { GlobalLoader } from '@/global-stores/global-loading';
import { StreamlabsNote } from './components/streamlabs-account-note';
export default function AccountPage() {
  const { data, update } = useSCSession();
  const { mutate: disconnectSLMutate } =
    trpcReact.streamlabs.disconnectAccount.useMutation();
  const connect = () => {
    if (!isProduction()) {
      return (window.location.href = `https://streamlabs.com/api/v2.0/authorize?client_id=${process.env.NEXT_PUBLIC_SL_CLIENT_ID}&redirect_uri=http://localhost:3333/apps/sl/callback&scope=donations.read+donations.create+alerts.create&response_type=code&state=${data?.user.access_token}`);
    }
    return (window.location.href = `https://streamlabs.com/api/v2.0/authorize?client_id=${process.env.NEXT_PUBLIC_SL_CLIENT_ID}&redirect_uri=https://api.streamerchit.com/apps/sl/callback&scope=donations.read+donations.create+alerts.create&response_type=code&state=${data?.user.access_token}`);
  };
  return (
    <div>
      <h1 className="text-3xl mb-7 font-bold ">Personal Infomation</h1>
      <div className="flex flex-col gap-5">
        <PersonalInfo k="Name" v={data?.user.name || ''} />
        <PersonalInfo k="Email" v={data?.user.email || ''} />
      </div>
      <div className="mt-12">
        <StreamLabsSvg />
        <div className="py-6">
          <StreamlabsNote />
        </div>
        <div className="mt-2">
          {data?.user.streamlabs_connected ? (
            <SLDisconnectButton
              onClick={() => {
                GlobalLoader.set(true);
                disconnectSLMutate(
                  { access_token: data.user.access_token || '' },
                  {
                    onSuccess: () => {
                      update();
                    },
                    onSettled: () => {
                      GlobalLoader.set(false);
                    },
                  }
                );
              }}
            />
          ) : (
            <SLConnectButton onClick={connect} />
          )}
        </div>
      </div>
    </div>
  );
}

function PersonalInfo({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div>{k}:</div>
      <div className="bg-[#2e3338] w-[350px] h-[40px] flex items-center rounded-md ">
        <span className="ml-5 ">{v}</span>
      </div>
    </div>
  );
}
