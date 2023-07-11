import APP from '@/components/icons/phone-icon';

export function PinModalContent() {
  return (
    <div className="flex flex-col items-center pb-5">
      <h1 className="text-xl font-bold">Waiting for payment</h1>
      <APP className="sm:w-72 sm:h-72 !stroke-white" />
    </div>
  );
}
