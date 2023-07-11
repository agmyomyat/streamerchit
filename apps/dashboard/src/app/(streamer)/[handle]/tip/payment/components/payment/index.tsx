import { Button } from '@/components/ui/button';
import PaymentCardsContainer, {
  PaymentCardsContainerProps,
} from './payment-card-container';
import PaymentCard, { IPaymentCard } from './payment-card';

type PaymentProps = {
  children: React.ReactNode;
  submit: () => void;
  submitting: boolean;
};
export const Payment: React.FC<PaymentProps> & {
  CardsContainer: React.FC<PaymentCardsContainerProps>;
  Card: React.FC<IPaymentCard>;
} = ({ children, submit, submitting }) => {
  return (
    <div className="flex flex-col items-center">
      {children}
      <div className="flex flex-row justify-center mt-6">
        <Button
          disabled={submitting}
          onClick={() => {
            submit();
          }}
          className="!w-56"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
Payment.CardsContainer = PaymentCardsContainer;
Payment.Card = PaymentCard;
