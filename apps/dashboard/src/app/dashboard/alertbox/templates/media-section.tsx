import { SoundUploadModal } from '../components/sound-upload-modal';

export function MediaSection({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-7">Media</h1>
      <div className="flex gap-10">{children}</div>
    </div>
  );
}
