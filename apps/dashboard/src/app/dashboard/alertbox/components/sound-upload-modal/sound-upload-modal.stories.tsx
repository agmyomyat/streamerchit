import { Meta, StoryObj } from '@storybook/react';
import { SoundUploadModal } from '.';
const meta: Meta<typeof SoundUploadModal> = {
  title: 'components/SoundUploadModal',
  component: SoundUploadModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SoundUploadModal>;
export const Default: Story = {
  args: {
    onFileChosen: (file) => console.log(file),
    sound_url:
      'https://www.redringtones.com/wp-content/uploads/2019/02/wubba-lubba-dub-dub-ringtone.mp3',
  },
};
