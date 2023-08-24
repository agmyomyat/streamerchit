import { Meta, StoryObj } from '@storybook/react';
import { DonationShowCase } from './donation-showcase';
const meta: Meta<typeof DonationShowCase> = {
  title: 'components/DonationShowCase',
  component: DonationShowCase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DonationShowCase>;
export const Default: Story = { args: {} };
