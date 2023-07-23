import FileUploadField from '@/components/file-upload-field';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Link, Music, Play, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { MediaInputUrlModal } from '../media-input-url-modal';
export function SoundUploadModal({
  onFileChosen,
  sound_url,
  onSubmitSoundUrl,
}: {
  sound_url: string;
  onFileChosen: (files: File[]) => void;
  onSubmitSoundUrl: (url: string) => void;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const soundRef = useRef<HTMLAudioElement>(null);
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <audio className="hidden" src={sound_url} ref={soundRef}></audio>
      <Card className="w-[200px] h-[250px] flex flex-col gap-5 items-center justify-center">
        <Music className="w-24 h-24" />
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => {
              if (!sound_url) {
                toast({ title: 'No sound file', variant: 'destructive' });
              }
              soundRef.current?.play();
            }}
          >
            <Play />
          </Button>
          <DialogTrigger asChild>
            <Button variant="ghost" onClick={() => setOpen(true)}>
              <Upload />
            </Button>
          </DialogTrigger>
          <MediaInputUrlModal
            description="Insert Sound Url"
            old_url={sound_url}
            title="Sound"
            onSumit={onSubmitSoundUrl}
          >
            <Button variant="ghost">
              <Link />
            </Button>
          </MediaInputUrlModal>
        </div>
      </Card>
      <DialogContent className="sm:max-w-[500px] ">
        <FileUploadField
          className="py-10"
          filetypes={['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4']}
          text={
            <div className="text-center">
              Drag and drop a sound file here, or click to select a file with up
              to 5Mb
            </div>
          }
          onFileChosen={(files) => {
            onFileChosen(files);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
