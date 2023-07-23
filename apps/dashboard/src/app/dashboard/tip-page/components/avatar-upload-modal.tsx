import FileUploadField from '@/components/file-upload-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
export function AvatarUploadModal({
  onFileChosen,
}: {
  onFileChosen: (files: File[]) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Change Avatar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] ">
        <FileUploadField
          className="py-10"
          filetypes={['image/png', 'image/jpeg']}
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
