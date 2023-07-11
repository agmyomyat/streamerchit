import { Meta, StoryObj } from '@storybook/react';
import { PaymentModal } from './payment-modal';
import { QRCodeSVG } from 'qrcode.react';
function P(props) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <PaymentModal {...props} />
    </div>
  );
}
const meta: Meta<typeof PaymentModal> = {
  title: 'components/PaymentModal',
  component: P,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PaymentModal>;
export const Default: Story = {
  args: {
    children: (
      <div>
        <QRCodeSVG value={''} className="w-96 h-96 p-10 max-w-full" />
      </div>
    ),
    loading: true,
    open: true,
  },
};
