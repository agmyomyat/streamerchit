import { Meta, StoryObj } from '@storybook/react';
import { KbzPayButton } from './kbz-pay-button';
import { cn } from '@/utils';
function K() {
  return (
    <div className="w-[400px]">
      <KbzPayButton className={cn('w-full')} onClick={console.log} />
    </div>
  );
}
const meta: Meta<typeof K> = {
  title: 'components/KbzPayButton',
  component: K,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof K>;
export const Default: Story = { args: { onClick: console.log } };
