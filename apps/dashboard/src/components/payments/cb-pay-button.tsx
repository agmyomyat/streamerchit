import { cn } from '@/utils';
import { Button, ButtonProps } from '../ui/button';

export function CbPayButton(props: ButtonProps) {
  return (
    <Button {...props} className={cn('bg-[#254fa2]', props.className)}>
      <div className="flex gap-3 items-center">
        <img
          className="w-16 h-9"
          src="https://www.cbbank.com.mm/sites/cbbank.com.mm/files/logo.png"
          alt=""
        />
      </div>
    </Button>
  );
}
