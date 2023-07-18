import { Meta, StoryObj } from '@storybook/react';
import { UrlBox } from './url-box';
const meta: Meta<typeof UrlBox> = {
  title: 'components/UrlBox',
  component: UrlBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UrlBox>;
export const Default: Story = {
  args: {
    url: 'https://ab.streamerchit.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiREJFZTAyQzJNNWpEMHR2MzNGWGciLCJpYXQiOjE2ODkzMzE2MTR9.7nmWG5uMFk3XMWpFCHAttukpxElq9BjNxcZWt2AEf3s',
  },
};
