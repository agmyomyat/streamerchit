'use client';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { GlobalLoader } from '@/global-stores/global-loading';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { generateTipPageUrl } from '@/utils/generate-tip-page-url';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import copy from 'copy-to-clipboard';
import { TipPageForm } from './templates/tip-page-form';
import { TipPageAvatarSection } from './templates/avatar-section';
import { Button } from '@/components/ui/button';
import { useSCSession } from '@/lib/provider/session-checker';
import { AvatarUploadModal } from './components/avatar-upload-modal';
import { uploadAvatar } from './tip-page.request';
import { extractFileKeyAndExtFromUrl } from '@/utils/extract-file-key-from-url';
import { uploadS3PresignedFile } from '@/lib/upload-file';
import { isFileBiggerThan } from '@/utils/is-file-bigger-than';
import { MEDIA_UPLOAD_SIZE_LIMIT } from '@/constants/media-file-upload-size-limit';
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
  const { status } = useSCSession();
  const {
    data,
    isLoading: loadingTipPage,
    isFetching: fetchingTipPage,
    error,
    refetch,
  } = trpcReact.user.getTipPageSettings.useQuery(undefined, {
    enabled: status === 'authenticated',
  });
  const { mutate, isLoading: updatingTipPage } =
    trpcReact.user.updatetipPageSettings.useMutation();
  const { mutate: deleteFileMutate } =
    trpcReact.user.fileLibrary.deleteFileFromLibrary.useMutation();
  const { mutateAsync: createFileAsync } =
    trpcReact.user.fileLibrary.createFile.useMutation();
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
  const onFileChosen = async (file: File[]) => {
    GlobalLoader.set(true);
    // limit = 5Mb
    if (isFileBiggerThan(file[0], MEDIA_UPLOAD_SIZE_LIMIT)) {
      toast({
        title: 'file is too big',
        description: 'file should be less than 5mb',
        variant: 'destructive',
      });
      GlobalLoader.set(false);
      return;
    }
    let createFileData: Awaited<ReturnType<typeof createFileAsync>>;
    const oldAvatarUrl = form.getValues().avatar_url;
    const file_id = extractFileKeyAndExtFromUrl(oldAvatarUrl);
    try {
      createFileData = await createFileAsync({
        file_type: file[0].type,
        original_name: file[0].name,
        size_in_byte: file[0].size,
      });
    } catch (e) {
      toast({
        title: 'something went wrong while uploading try again',
        variant: 'destructive',
      });
      return;
    } finally {
      GlobalLoader.set(false);
    }
    try {
      await uploadS3PresignedFile(createFileData.presigned_upload_url, [
        file[0],
      ]);
    } catch (e) {
      if (file_id) {
        deleteFileMutate({ file_id });
      }
      console.log(e);
      toast({
        title: 'something went wrong while uploading try again',
        variant: 'destructive',
      });
      return;
    } finally {
      GlobalLoader.set(false);
    }
    if (file_id) {
      deleteFileMutate({ file_id });
    }
    form.handleSubmit((data) => {
      mutate(
        { ...data, avatar_url: createFileData.public_url },
        {
          onSuccess: () => {
            form.reset();
            refetch();
            GlobalLoader.set(false);
          },
          onError: () => {
            toast({
              title: 'something went wrong try again',
              variant: 'destructive',
            });
            GlobalLoader.set(false);
          },
        }
      );
    })();
  };
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
        <TipPageAvatarSection url={data.avatar_url}>
          <AvatarUploadModal onFileChosen={onFileChosen} />
        </TipPageAvatarSection>
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
