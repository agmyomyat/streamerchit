import './thank-you-message.css';
const message = 'Thank You For Your Donation';
export function ThankYouMessage() {
  return (
    <>
      <div className="text">
        {message.split('').map((letter, index) => {
          return (
            <div className="wrapper">
              <div id={letter} className="letter">
                {letter}
              </div>
              <div className="shadow">{letter}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
