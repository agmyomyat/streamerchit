import { Button } from '../ui/button';

export function PaymentSetupWarning() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1>Set up payment to start accepting donations.</h1>
        <Button className="bg-[#FDBE34] h-8">Activate Payment</Button>
      </div>
    </div>
  );
}
