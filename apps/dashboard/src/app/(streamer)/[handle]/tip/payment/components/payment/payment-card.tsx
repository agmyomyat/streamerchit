export interface IPaymentCard {
  setMethod: () => void;
  label: string;
  selectedMethod: string;
  methodName: string;
  Icon: React.ReactNode;
}
export default function PaymentCard(prop: IPaymentCard) {
  const { setMethod, selectedMethod, label, methodName } = prop;
  return (
    <div
      onClick={() => {
        setMethod();
      }}
      className={`flex justify-center p-6 rounded-lg  ${
        selectedMethod !== methodName
          ? 'shadow-sm shadow-white opacity-30'
          : 'shadow-xl'
      } bg-gray-100 h-14 sm:h-72 w-96 sm:w-52 max-w-full hover:cursor-pointer`}
    >
      <div className="flex justify-start items-center sm:justify-center sm:flex-col">
        {prop.Icon}
        <h2 className="text-gray-900 text-sm font-medium font-sans leading-tight text-center pl-3 mb-2 sm:mt-20">
          {label}
        </h2>
      </div>
    </div>
  );
}
