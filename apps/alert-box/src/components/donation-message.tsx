export function DonationMessage({ message }: { message: string }) {
  return (
    <div className="text-[24px] text-slate-100 drop-shadow-donation-msg font-bold text-center ">
      {message}
    </div>
  );
}
