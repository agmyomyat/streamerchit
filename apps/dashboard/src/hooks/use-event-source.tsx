import { useObservable } from '@legendapp/state/react';
import { useEffect, useState } from 'react';

interface DonationEventData {
  name: string;
  message: string;
  amount: number;
  date: Date;
}
export function useEventSource(url: string | null) {
  const eventData = useObservable<DonationEventData[]>([]);
  useEffect(() => {
    let eventSource: EventSource | null = null;
    if (eventSource) return;
    if (!url) return;
    eventSource = new EventSource(`${url}`);
    eventSource.onmessage = ({ data }) => {
      const donationData: DonationEventData = JSON.parse(data);
      eventData.unshift({ ...donationData, date: new Date() });
    };
    return () => {
      eventSource?.close();
      eventSource = null;
    };
  }, [url]);
  return { eventData };
}
