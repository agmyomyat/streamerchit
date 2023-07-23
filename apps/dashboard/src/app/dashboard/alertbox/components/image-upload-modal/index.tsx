import FileUploadField from '@/components/file-upload-field';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Link, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { MediaInputUrlModal } from '../media-input-url-modal';
export function ImageUploadModal({
  onFileChosen,
  image_url,
  onSubmitImageUrl,
}: {
  image_url: string;
  onFileChosen: (files: File[]) => void;
  onSubmitImageUrl: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Card className="w-[200px] h-[250px] flex flex-col gap-5 items-center justify-center">
        <Image
          unoptimized
          alt={'image'}
          src={image_url}
          className="max-h-[200px]"
          width={200}
          height={200}
        />
        <div className="flex">
          <DialogTrigger asChild>
            <Button variant="ghost" onClick={() => setOpen(true)}>
              <UploadCloud />
            </Button>
          </DialogTrigger>
          <MediaInputUrlModal
            description="Insert Sound Url"
            old_url={image_url}
            title="Sound"
            onSumit={onSubmitImageUrl}
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
          filetypes={['image/png', 'image/jpeg', 'image/gif']}
          text={
            <div className="text-center">
              Drag and drop an image here, or click to select a file with up to
              5Mb
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
