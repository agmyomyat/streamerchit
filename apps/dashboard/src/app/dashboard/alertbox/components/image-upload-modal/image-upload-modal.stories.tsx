import { Meta, StoryObj } from '@storybook/react';
import { ImageUploadModal } from '.';
const meta: Meta<typeof ImageUploadModal> = {
  title: 'components/ImageUploadModal',
  component: ImageUploadModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageUploadModal>;
export const Default: Story = {
  args: {
    onFileChosen: (file) => console.log(file),
    image_url: 'https://media.giphy.com/media/7kn27lnYSAE9O/giphy.gif',
  },
};
