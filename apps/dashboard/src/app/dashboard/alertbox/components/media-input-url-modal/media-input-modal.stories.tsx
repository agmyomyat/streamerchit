import { Meta, StoryObj } from '@storybook/react';
import { MediaInputUrlModal } from '.';
const meta: Meta<typeof MediaInputUrlModal> = {
  title: 'components/MediaInputUrlModal',
  component: MediaInputUrlModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MediaInputUrlModal>;
export const Default: Story = {
  args: {
    description: 'put your sound url',
    title: 'sound url',
    old_url: 'https://google.com',
    onSumit: console.log,
    children: <button>trigger</button>,
  },
};
