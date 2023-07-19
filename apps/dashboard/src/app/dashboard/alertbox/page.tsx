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
function testDonation(token?: string | null) {
  if (!token) throw new Error('No token provided');
  return fetch('http://localhost:3333/v1/alertbox/test', {
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
  const {
    data,
    refetch,
    error,
    isFetching: fetchingSettings,
    isLoading: loadingSettings,
  } = trpcReact.user.getDonationSettings.useQuery();
  const form = useForm<SettingFormData>();
  const { mutate, isLoading: updatingSetting } =
    trpcReact.user.updateDonationSettings.useMutation();
  const { toast } = useToast();
  const alertBoxUrl = generateAlertBoxUrl(
    'http://localhost:5173',
    data?.alertbox_listener_token
  );
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
