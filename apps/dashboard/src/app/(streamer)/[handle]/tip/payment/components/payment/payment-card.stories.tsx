import { Meta, StoryObj } from '@storybook/react';
import PaymentCard from './payment-card';
import QR from '@/components/icons/qr-icon';
import APP from '@/components/icons/phone-icon';
const meta: Meta<typeof PaymentCard> = {
  title: 'components/PaymentCard',
  component: PaymentCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PaymentCard>;
export const Selected: Story = {
  args: {
    label: 'Pay with QR',
    selectedMethod: 'QR',
    methodName: 'QR',
    Icon: <QR />,
  },
};

export const Unselected: Story = {
  args: {
    label: 'Pay with Mobile App',
    selectedMethod: 'AR',
    methodName: 'App',
    Icon: <APP />,
  },
};
