import {
  enableLegendStateReact,
  useObservable,
  useSelector,
} from '@legendapp/state/react';
import { useEffect, useState } from 'react';

export function useEventSource<T extends any[]>(url: string | null) {
  const eventData$ = useObservable<any>([]);
  const eventData = useSelector(() => eventData$.get());
  useEffect(() => {
    let eventSource: EventSource | null = null;
    if (eventSource) return;
    if (!url) return;
    eventSource = new EventSource(`${url}`);
    eventSource.onmessage = ({ data }) => {
      const donationData: T = JSON.parse(data);
      eventData$.unshift({ ...donationData, date: new Date() });
    };
    return () => {
      eventSource?.close();
      eventSource = null;
    };
  }, [url]);
  return { eventData } as { eventData: T };
}
