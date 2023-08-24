const GIF = 'https://media.giphy.com/media/YJjvTqoRFgZaM/giphy.gif';
const JUMPY_KELVIN =
  'https://cdn.streamlabs.com/library/giflibrary/jumpy-kevin.webm';
export function DonationShowCase() {
  return (
    <div className=" flex flex-col h-[200px] items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        src={JUMPY_KELVIN}
        width={200}
        height={300}
      />
      <HighlightedText
        text="Mg Mg Donated 10000 Kyats"
        textColor="#0276db"
        fontWeight={600}
        textSize="18px"
      />
      <p>Thanks For Streaming</p>
    </div>
  );
}

export function HighlightedText({
  text,
  textColor,
  textSize,
  fontWeight,
}: {
  fontWeight: number;
  text: string;
  textColor: string;
  textSize: string;
}) {
  return (
    <div className="flex">
      {text.split('').map((s, idx) => {
        return (
          <div
            style={{
              color: textColor,
              fontSize: textSize,
              fontWeight: fontWeight,
            }}
            key={idx}
            className={`text-lg whitespace-pre`}
          >{`${s}`}</div>
        );
      })}
    </div>
  );
}
