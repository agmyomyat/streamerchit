import { Meta, StoryObj } from '@storybook/react';
import { SLConnectButton } from './sl-connect-button';
const meta: Meta<typeof SLConnectButton> = {
  title: 'components/StreamLabsConnectButton',
  component: SLConnectButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SLConnectButton>;
export const Default: Story = { args: {} };
