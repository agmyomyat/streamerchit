import { Meta, StoryObj } from '@storybook/react';
import { ReactColorPicker } from './color-picker';
const meta: Meta<typeof ReactColorPicker> = {
  title: 'components/ReactColorPicker',
  component: ReactColorPicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ReactColorPicker>;
export const Default: Story = {
  args: { defaultValue: '#FFFFFF' },
};
