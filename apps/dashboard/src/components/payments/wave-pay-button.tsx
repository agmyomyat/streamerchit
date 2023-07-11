import { cn } from '@/utils';
import { Button, ButtonProps } from '../ui/button';

export function WavePayButton(props: ButtonProps) {
  return (
    <Button {...props} className={cn('bg-[#fdd403]', props.className)}>
      <div className="flex gap-3 items-center">
        <img
          className="w-28 h-9"
          src="https://wavemoney.com.mm/assets/img/wavemoneyLogoSvg.svg"
          alt=""
        />
      </div>
    </Button>
  );
}
