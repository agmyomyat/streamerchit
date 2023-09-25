import Image from 'next/image';

const CURIOUS_OWL =
  'https://media.tenor.com/EXevW7XQUc4AAAAj/timothy-winchester-littlest-friends.gif';
export function DonationShowCase() {
  return (
    <div className=" flex flex-col gap-2 items-center">
      <Image
        src={CURIOUS_OWL}
        width={200}
        height={300}
        alt={'Owl'}
        unoptimized
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
