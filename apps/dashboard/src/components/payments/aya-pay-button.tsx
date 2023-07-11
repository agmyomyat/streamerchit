import { cn } from '@/utils';
import { Button, ButtonProps } from '../ui/button';

export function AyaPayButton(props: ButtonProps) {
  return (
    <Button {...props} className={cn('bg-[#b60003b2]', props.className)}>
      <div className="flex gap-3 items-center">
        <img
          className="w-28 h-9"
          src="https://www.ayapay.com/wp-content/uploads/2019/12/ayapaylogo2.png"
          alt=""
        />
      </div>
    </Button>
  );
}
