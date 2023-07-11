import { useState, useRef, useEffect } from 'react';

export const useAudio = (url: string) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>();
  const toggle = () => setPlaying(!playing);
  function play() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current?.play();
    }
  }
  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }
  useEffect(() => {
    if (playing) {
      if (!audioRef.current) return;
      audioRef.current.currentTime = 0;
      audioRef.current?.play();
      return;
    }
    audioRef.current?.pause();
  }, [playing]);
  useEffect(() => {
    if (!url) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.addEventListener('ended', () => setPlaying(false));
    }
    return () => {
      audioRef.current?.removeEventListener('ended', () => setPlaying(false));
    };
  }, [url]);

  return { playing, toggle, play, stop };
};
