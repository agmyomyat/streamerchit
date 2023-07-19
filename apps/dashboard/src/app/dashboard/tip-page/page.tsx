'use client';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { GlobalLoader } from '@/global-stores/global-loading';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { generateTipPageUrl } from '@/utils/generate-tip-page-url';
import { use, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import copy from 'copy-to-clipboard';
import { TipPageForm } from './templates/tip-page-form';
import { TipPageAvatarSection } from './templates/avatar-section';
import { Button } from '@/components/ui/button';
const TipPageSettingsFormDataZod = z.object({
  memo: z.string().nullable(),
  display_name: z.string(),
  url_handle: z.string(),
  avatar_url: z.string(),
  page_cover: z.string().nullable(),
});
export type TipPageSettingsFormData = z.infer<
  typeof TipPageSettingsFormDataZod
>;
export default function TipPagePage() {
  const {
    data,
    isLoading: loadingTipPage,
    isFetching: fetchingTipPage,
    error,
    refetch,
  } = trpcReact.user.getTipPageSettings.useQuery();
  const { mutate, isLoading: updatingTipPage } =
    trpcReact.user.updatetipPageSettings.useMutation();
  const { toast } = useToast();
  const form = useForm<TipPageSettingsFormData>({
    defaultValues: {
      avatar_url: '',
      display_name: '',
      memo: '',
      page_cover: '',
      url_handle: '',
    },
  });
  const tipPageUrl = generateTipPageUrl(data?.url_handle);
  const copyTipPageUrl = () => {
    if (!tipPageUrl) return;
    copy(tipPageUrl);
    toast({
      title: 'Copied Tip Page Url',
    });
  };
  useEffect(() => {
    if (error) {
      toast({
        title: 'something went wrong refresh the page',
        variant: 'destructive',
      });
    }
  }, [error]);
  useEffect(() => {
    if (loadingTipPage || fetchingTipPage || updatingTipPage) {
      GlobalLoader.set(true);
      return;
    }
    GlobalLoader.set(false);
  }, [loadingTipPage, fetchingTipPage, updatingTipPage]);
  useEffect(() => {
    form.reset(data);
  }, [data]);
  if (!data) return null;
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div>
        <h3 className="text-2xl font-medium">Tip Page</h3>
        <p className="text-lg text-muted-foreground">
          This is how viewers will see your tip page.
        </p>
        <div className="my-3">
          Your Tip Page:{' '}
          <span
            className="hover:cursor-pointer text-muted-foreground"
            onClick={copyTipPageUrl}
          >
            {tipPageUrl}
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-center my-5">
        <TipPageAvatarSection url={data.avatar_url} onClickAction={() => {}} />
      </div>
      <div className="text-2xl">Settings</div>
      <TipPageForm form={form} />
      <Button
        className="self-center"
        disabled={updatingTipPage}
        onClick={form.handleSubmit((data) => {
          mutate(
            { ...data },
            {
              onSuccess: () => {
                toast({ title: 'settings updated' });
                form.reset();
                // refetch settings to update the form values
                //
                refetch();
              },
              onError: () =>
                toast({
                  title: 'something went wrong try again',
                  variant: 'destructive',
                }),
            }
          );
        })}
      >
        Save Settings
      </Button>
    </div>
  );
}
