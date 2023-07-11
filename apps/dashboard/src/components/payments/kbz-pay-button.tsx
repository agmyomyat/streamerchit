import { cn } from '@/utils';
import { Button, ButtonProps } from '../ui/button';

export function KbzPayButton(props: ButtonProps) {
  return (
    <Button {...props} className={cn('bg-[#075cab]', props.className)}>
      <div className="flex gap-3 items-center">
        <img
          className="w-6 h-6"
          src="https://www.kbzpay.com/wp-content/uploads/sites/9/2020/04/blue-L.png"
          alt=""
        />
        Kbz Pay
      </div>
    </Button>
  );
}
