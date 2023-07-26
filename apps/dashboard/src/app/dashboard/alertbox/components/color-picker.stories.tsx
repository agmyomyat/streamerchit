import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './color-picker';
const meta: Meta<typeof ColorPicker> = {
  title: 'components/ReactColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;
export const Default: Story = {
  args: { defaultColor: '#FFFFFF' },
};
