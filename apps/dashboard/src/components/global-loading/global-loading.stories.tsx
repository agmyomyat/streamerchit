import { Meta, StoryObj } from '@storybook/react';
import { GlobalLoading } from './global-loading';
const meta: Meta<typeof GlobalLoading> = {
  title: 'components/GlobalLoading',
  component: GlobalLoading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GlobalLoading>;
export const Default: Story = { args: { isLoading: true } };
