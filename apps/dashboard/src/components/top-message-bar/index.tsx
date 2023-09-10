'use client';
// this is only use for "payment not setup" noti at the moment
// give genric names for states and components for later refactor to reusesablility
// should refactor for more reuseable or more messages
import { TopBarMessageState } from '@/global-stores/top-bar-noti';
import { useSelector } from '@legendapp/state/react';
export function TopMessageBar() {
  const message = useSelector(() => TopBarMessageState.get());
  if (!message) return null;
  return (
    <div className="py-4 bg-gray-900 w-full flex justify-center">{message}</div>
  );
}
