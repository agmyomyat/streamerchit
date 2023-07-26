import { Meta, StoryObj } from '@storybook/react';
import PaymentCard from './payment-card';
import QR from '@/components/icons/qr-icon';
import APP from '@/components/icons/phone-icon';
import PaymentCardsContainer from './payment-card-container';
const meta: Meta<typeof PaymentCardsContainer> = {
  title: 'components/PaymentCardsContainer',
  component: PaymentCardsContainer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PaymentCardsContainer>;
export const Default: Story = {
  args: {
    children: (
      <div>
        {/* <PaymentCard
          label="Pay with QR"
          methodName="QR"
          selectedMethod="QR"
          setMethod={() => ''}
        >
          <QR />
        </PaymentCard>
        <PaymentCard
          label="Pay with App"
          methodName="APP"
          selectedMethod="QR"
          setMethod={() => ''}
        >
          <APP />
        </PaymentCard> */}
      </div>
    ),
    total: '10000',
  },
};
