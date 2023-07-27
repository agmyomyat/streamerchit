import { useEffect, useRef, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { useAudio } from './use-audio';
import { useQueryValue } from './use-query-value';
import { useDonationSetting } from '../contexts/donation-settings-context';

interface DonationData {
  ping: boolean;
  name: string;
  message: string;
  amount: number;
}
export function useDonationEvent(sseEndpoint: string) {
  const [queueData, setQueueData] = useState<DonationData[]>([]);
  const queueIsOccupying = useRef(false);
  const token = useQueryValue('token');
  const { duration, sound_href } = useDonationSetting();
  const { play, stop } = useAudio(sound_href || '');
  useEffect(() => {
    if (!queueData.length) return;
    if (queueIsOccupying.current) return;
    if (!duration) return;
    queueIsOccupying.current = true;
    const _duration = duration * 1000 || 10000;
    play();
    setTimeout(() => {
      queueIsOccupying.current = false;
      stop();
      setQueueData((prev) => {
        const newArr = [...prev];
        newArr.pop();
        if (newArr?.length) {
          return newArr;
        }
        return [];
      });
    }, _duration);
  }, [queueData.length, duration]);
  useEffect(() => {
    let eventSource: EventSource | null = null;
    if (!window?.location.search) return;
    if (eventSource) return;
    if (!token) return;
    const _decodeToken = decodeToken(token) as { user_id: string };
    if (!_decodeToken) return;
    eventSource = new EventSource(`${sseEndpoint}/${_decodeToken.user_id}`);
    eventSource.onmessage = ({ data }) => {
      const donationData: DonationData = JSON.parse(data);
      if (donationData.ping) return;
      setQueueData((prev) => [donationData, ...prev]);
    };
    return () => {
      eventSource?.close();
      eventSource = null;
    };
  }, [sseEndpoint, token]);
  return { data: queueData };
}
