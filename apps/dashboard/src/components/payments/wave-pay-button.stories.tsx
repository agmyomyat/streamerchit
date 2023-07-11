import { Meta, StoryObj } from '@storybook/react';
import { cn } from '@/utils';
import { WavePayButton } from './wave-pay-button';
function W() {
  return (
    <div className="w-[400px]">
      <WavePayButton className={cn('w-full')} onClick={console.log} />
    </div>
  );
}
const meta: Meta<typeof W> = {
  title: 'components/WavePayButton',
  component: W,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof W>;
export const Default: Story = { args: { onClick: console.log } };
