import { Meta, StoryObj } from '@storybook/react';
import { DonationMessage } from './donation-message';
const meta: Meta<typeof DonationMessage> = {
  title: 'components/DonationMessage',
  component: DonationMessage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DonationMessage>;
export const Eng: Story = { args: { message: 'this is test message' } };
export const Myanmar: Story = {
  args: {
    message: 'ထက်ပြီး ဘေ..10000ks 10ယောက်ယူပါရှင့်❣🍃 Shareခဲ့ပေးအုံးရှင့်❣',
  },
};
