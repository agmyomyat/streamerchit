import { Meta, StoryObj } from '@storybook/react';
import APP from '@/components/icons/phone-icon';
import { PinModalContent as PinModal } from './pin-modal-content';
const meta: Meta<typeof PinModal> = {
  title: 'components/PinModalContent',
  component: PinModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PinModal>;

export const Default: Story = {
  args: {},
};
