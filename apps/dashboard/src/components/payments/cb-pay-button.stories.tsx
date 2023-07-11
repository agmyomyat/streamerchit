import { Meta, StoryObj } from '@storybook/react';
import { cn } from '@/utils';
import { CbPayButton } from './cb-pay-button';
function Cb() {
  return (
    <div className="w-[400px]">
      <CbPayButton className={cn('w-full')} onClick={console.log} />
    </div>
  );
}
const meta: Meta<typeof Cb> = {
  title: 'components/CbPayButton',
  component: Cb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Cb>;
export const Default: Story = { args: { onClick: console.log } };
