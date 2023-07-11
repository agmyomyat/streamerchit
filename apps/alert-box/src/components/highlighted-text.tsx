import clsx from 'clsx';

export function HighlightedText({
  text,
  textColor,
}: {
  text: string;
  textColor: string;
}) {
  return (
    <div className="flex">
      {text.split('').map((s, idx) => {
        return (
          <div
            style={{ color: textColor }}
            key={idx}
            className={clsx(
              `text-5xl  animate-jump animate-infinite animate-delay-[10ms] animate-ease-linear animate-normal animate-fill-forwards  font-extrabold drop-shadow-donation whitespace-pre`
            )}
          >{`${s}`}</div>
        );
      })}
    </div>
  );
}
