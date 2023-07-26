'use client';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { AlertBoxUrlSection } from './templates/alert-box-url-section';
import { generateAlertBoxUrl } from '@/utils/generate-alertbox-url';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SettingsSection } from './templates/settings-section';
import { useEffect } from 'react';
import { GlobalLoader } from '@/global-stores/global-loading';
import { useSCSession } from '@/lib/provider/session-checker';
import { MediaSection } from './templates/media-section';
import { SoundUploadModal } from './components/sound-upload-modal';
import { ImageUploadModal } from './components/image-upload-modal';
import { extractFileKeyAndExtFromUrl } from '@/utils/extract-file-key-from-url';
import { uploadFile } from '@/lib/upload-file';
function testDonation(token?: string | null) {
  if (!token) throw new Error('No token provided');
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/alertbox/test`, {
    headers: {
      Authorization: token,
    },
  });
}
const SettingFormDataZod = z.object({
  image_href: z.string(),
  duration: z.number(),
  font_weight: z.number(),
  font_size: z.string(),
  font_color: z.string(),
  message_font_weight: z.number(),
  message_font_size: z.string(),
  message_font_color: z.string(),
  sound_href: z.string(),
});
export type SettingFormData = z.infer<typeof SettingFormDataZod>;
export default function Page() {
  const { status } = useSCSession();
  const {
    data,
    refetch,
    error,
    isFetching: fetchingSettings,
    isLoading: loadingSettings,
  } = trpcReact.user.getDonationSettings.useQuery(undefined, {});
  const form = useForm<SettingFormData>();
  const { mutate, isLoading: updatingSetting } =
    trpcReact.user.updateDonationSettings.useMutation();
  const { mutate: deleteFileMutate } =
    trpcReact.user.fileLibrary.deleteFileFromLibrary.useMutation();
  const { toast } = useToast();
  const alertBoxUrl = generateAlertBoxUrl(
    `${process.env.NEXT_PUBLIC_ALERTBOX_URL}`,
    data?.alertbox_listener_token
  );
  const onSubmitSoundUrl = async (url: string) => {
    const file_id = extractFileKeyAndExtFromUrl(data?.sound_href!);
    if (file_id) {
      deleteFileMutate({ file_id });
    }
    form.handleSubmit((data) => {
      mutate(
        { ...data, sound_href: url },
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
  const onSubmitImageUrl = async (url: string) => {
    const file_id = extractFileKeyAndExtFromUrl(data?.image_href!);
    if (file_id) {
      deleteFileMutate({ file_id });
    }
    form.handleSubmit((data) => {
      mutate(
        { ...data, image_href: url },
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
  const onFileChosen = async (
    file: File[],
    old_file_url: string,
    file_url_replace_key: 'image_href' | 'sound_href'
  ) => {
    GlobalLoader.set(true);
    let uploadedFile: { key: string; url: string };

    const file_id = extractFileKeyAndExtFromUrl(old_file_url);
    if (file_id) {
      deleteFileMutate({ file_id });
    }
    try {
      uploadedFile = await uploadFile(file);
    } catch (e) {
      console.log(e);
      toast({
        title: 'something went wrong try again',
        variant: 'destructive',
      });
      return;
    } finally {
      GlobalLoader.set(false);
    }
    form.handleSubmit((data) => {
      mutate(
        { ...data, [file_url_replace_key]: uploadedFile.url },
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
  useEffect(() => {
    if (fetchingSettings || updatingSetting || loadingSettings) {
      GlobalLoader.set(true);
      return;
    }
    GlobalLoader.set(false);
  }, [fetchingSettings, updatingSetting]);
  useEffect(() => {
    if (error) {
      toast({
        title: 'something went wrong refresh the page',
        variant: 'destructive',
      });
    }
  }, [error]);
  useEffect(() => {
    form.reset(data);
  }, [data]);
  if (!data) return null;
  return (
    <div className="flex flex-col gap-10 w-full py-10 mr-40">
      <div>
        <h1 className="text-2xl font-bold mb-10">Alert Box</h1>
        <p className="text-slate-400 mb-5">
          Now you can stream and your viewers can appreciate your contents
        </p>
        <AlertBoxUrlSection url={alertBoxUrl} />
        <div className="mt-10 flex flex-col gap-2 text-slate-400">
          <span>
            Once the alertbox is open and running, use the buttons below to
            queue up sample alerts.
          </span>
          <Button
            onClick={() => {
              testDonation(data?.alertbox_listener_token)
                .then(() => {
                  toast({ title: 'alert sent' });
                })
                .catch(() => {
                  toast({ title: 'something went wrong try again' });
                });
            }}
            className="h-8 w-44 text-sm"
          >
            Test Donation
          </Button>
        </div>
      </div>
      <MediaSection>
        <SoundUploadModal
          onSubmitSoundUrl={onSubmitSoundUrl}
          onFileChosen={(file) => {
            onFileChosen(file, data.sound_href, 'sound_href');
          }}
          sound_url={data.sound_href}
        />
        <ImageUploadModal
          onSubmitImageUrl={onSubmitImageUrl}
          image_url={data.image_href}
          onFileChosen={(file) => {
            onFileChosen(file, data.image_href, 'image_href');
          }}
        />
      </MediaSection>
      <h1 className="text-2xl font-bold mb-3">Settings</h1>
      <div>
        <SettingsSection form={form} />
      </div>
      <Button
        className="self-center"
        disabled={updatingSetting}
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
