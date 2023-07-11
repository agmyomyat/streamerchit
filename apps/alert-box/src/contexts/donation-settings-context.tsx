import { createContext, useContext } from 'react';
import { SettingData, useFetchSettings } from '../hooks/use-fetch';
import { useQueryValue } from '../hooks/use-query-value';
type DonationSettingsContext = SettingData;
const donationSettingContext = createContext<DonationSettingsContext | null>(
  null
);
export const DonationSettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = useQueryValue('token');
  const { response } = useFetchSettings(
    `${import.meta.env.VITE_BACKEND_URL}/v1/alertbox/settings`,
    token
  );
  const image_href = response?.image_href || '';
  const duration = response?.duration || 0;
  const sound_href = response?.sound_href || '';
  const font_color = response?.font_color || '';
  return (
    <donationSettingContext.Provider
      value={{ font_color, image_href, duration, sound_href }}
    >
      {children}
    </donationSettingContext.Provider>
  );
};
export function useDonationSetting() {
  const ctx = useContext(donationSettingContext);
  if (!ctx) {
    throw new Error(
      'useDonationSetting must be used within a DonationSettingProvider'
    );
  }
  return ctx;
}
