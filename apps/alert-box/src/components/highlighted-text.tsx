import clsx from 'clsx';

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
            className={clsx(
              `drop-shadow-donation animate-jump animate-infinite animate-delay-[10ms] animate-ease-linear animate-normal animate-fill-forwards whitespace-pre`
            )}
          >{`${s}`}</div>
        );
      })}
    </div>
  );
}
