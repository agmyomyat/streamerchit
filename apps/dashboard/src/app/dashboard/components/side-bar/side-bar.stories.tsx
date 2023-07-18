import { Meta, StoryObj } from '@storybook/react';
import { SidebarContent, SidebarContentProps } from './side-bar-content';
function Sidebar(props: SidebarContentProps) {
  return (
    <div>
      <SidebarContent {...props} />
    </div>
  );
}
const meta: Meta<typeof Sidebar> = {
  title: 'components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;
export const Default: Story = { args: { routePath: 'account' } };
