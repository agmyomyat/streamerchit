'use client';
import { use_SC_Session } from '@/lib/provider/session-checker';

export default function AccountPage() {
  const { data } = use_SC_Session();
  return (
    <div>
      <h1 className="text-3xl mb-7 font-bold ">Personal Infomation</h1>
      <div className="flex flex-col gap-5">
        <PersonalInfo k="Name" v={data?.user.name || ''} />
        <PersonalInfo k="Email" v={data?.user.email || ''} />
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
