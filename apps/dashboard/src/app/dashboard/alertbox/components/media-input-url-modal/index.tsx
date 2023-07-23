import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
interface MediaInputModalProps {
  title: string;
  description: string;
  onSumit: (url: string) => void;
  old_url: string;
}
const MediaInputModalFormDataZod = z.object({
  url: z.string().url(),
});
type MediaInputModalFormData = z.infer<typeof MediaInputModalFormDataZod>;
export function MediaInputUrlModal(
  props: MediaInputModalProps & {
    children: React.ReactNode | React.ReactNode[];
  }
) {
  const [open, setOpen] = useState(false);
  const form = useForm<MediaInputModalFormData>({
    defaultValues: { url: '' },
    resolver: zodResolver(MediaInputModalFormDataZod),
  });
  useEffect(() => {
    form.reset({ url: props.old_url });
  }, [props.old_url]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 ">
          <Form {...form}>
            <div className="flex flex-col gap-10">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
          <DialogFooter>
            <Button
              disabled={!form.formState.dirtyFields.url}
              onClick={form.handleSubmit((data) => {
                props.onSumit(data.url);
                setOpen(false);
              })}
            >
              Submit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
