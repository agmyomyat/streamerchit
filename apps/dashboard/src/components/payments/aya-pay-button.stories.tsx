import { Meta, StoryObj } from '@storybook/react';
import { cn } from '@/utils';
import { AyaPayButton } from './aya-pay-button';
function K() {
  return (
    <div className="w-[400px]">
      <AyaPayButton className={cn('w-full')} onClick={console.log} />
    </div>
  );
}
const meta: Meta<typeof K> = {
  title: 'components/AyaPayButton',
  component: K,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof K>;
export const Default: Story = { args: { onClick: console.log } };
