import { useEffect, useState } from 'react';
export interface SettingData {
  image_href: string;
  sound_href: string;
  duration: number;
  font_color: string;
  font_size: string;
  message_font_size: string;
  font_weight: number;
}
export const useFetchSettings = (url: string, token: string | null) => {
  const [response, setResponse] = useState<SettingData | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController: AbortController;
    if (!token) return;
    const fetchData = async () => {
      try {
        abortController = new AbortController();
        const signal = abortController.signal;
        const res = await fetch(url, {
          headers: { authorization: token },
          signal,
        });
        const json = await res.json();
        setResponse(json);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchData();
    return () => {
      if (abortController) abortController.abort();
      setResponse(null);
      setError(null);
    };
  }, [token, url]);

  return { response, error };
};
