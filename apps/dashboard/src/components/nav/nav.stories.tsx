import { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '.';
const meta: Meta<typeof NavBar> = {
  title: 'components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavBar>;
export const Default: Story = { args: {} };
