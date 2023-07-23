import { Meta, StoryObj } from '@storybook/react';
import FileUploadField from '.';
const meta: Meta<typeof FileUploadField> = {
  title: 'components/FileUploadField',
  component: FileUploadField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileUploadField>;
export const Default: Story = {
  args: {
    onFileChosen: (values) => {
      console.log(values);
    },
    filetypes: ['image/png', 'image/jpeg'],
    placeholder: 'Drag and drop an image here, or click to select a file',
  },
};
