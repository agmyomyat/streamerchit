export function DonationMessage({
  message,
  text_size,
  text_color,
}: {
  message: string;
  text_size: string;
  text_color: string;
}) {
  return (
    <div
      style={{
        color: text_color,
        textShadow:
          '0px 0px 1px #000, 0px 0px 2px #000, 0px 0px 3px #000, 0px 0px 4px #000, 0px 0px 5px #000',
        fontSize: text_size,
      }}
      className="text-slate-100  font-normal text-center "
    >
      {message}
    </div>
  );
}
