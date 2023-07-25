import './thank-you-message.css';
const gp1 = 'Thank ';
const gp2 = 'You ';
const gp3 = 'For ';
const gp4 = 'Donation ';
export function ThankYouMessage() {
  return (
    <>
      <div className="w-full flex justify-center flex-wrap ">
        <div className="text">
          {gp1.split('').map((letter, index) => {
            return (
              <div key={index} className="wrapper">
                <div id={letter} className="letter">
                  {letter}
                </div>
                <div className="shadow">{letter}</div>
              </div>
            );
          })}
        </div>
        <div className="text">
          {gp2.split('').map((letter, index) => {
            return (
              <div key={index} className="wrapper">
                <div id={letter} className="letter">
                  {letter}
                </div>
                <div className="shadow">{letter}</div>
              </div>
            );
          })}
        </div>
        <div className="text">
          {gp3.split('').map((letter, index) => {
            return (
              <div key={index} className="wrapper">
                <div id={letter} className="letter">
                  {letter}
                </div>
                <div className="shadow">{letter}</div>
              </div>
            );
          })}
        </div>
        <div className="text">
          {gp4.split('').map((letter, index) => {
            return (
              <div key={index} className="wrapper">
                <div id={letter} className="letter">
                  {letter}
                </div>
                <div className="shadow">{letter}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
