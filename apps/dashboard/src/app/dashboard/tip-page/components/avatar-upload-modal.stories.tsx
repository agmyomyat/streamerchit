import { Meta, StoryObj } from '@storybook/react';
import { AvatarUploadModal } from './avatar-upload-modal';
const meta: Meta<typeof AvatarUploadModal> = {
  title: 'components/AvatarUploadModal',
  component: AvatarUploadModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AvatarUploadModal>;
export const Default: Story = {
  args: {},
};
