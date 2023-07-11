import './App.css';
import { HighlightedText } from './components/highlighted-text';
import { DonationMessage } from './components/donation-message';
import { useDonationEvent } from './hooks/use-donation-event';
import { useDonationSetting } from './contexts/donation-settings-context';
function App() {
  const { data } = useDonationEvent(
    `${import.meta.env.VITE_BACKEND_URL}/v1/alertbox/sse/donation`
  );
  const { image_href, font_color } = useDonationSetting();

  if (!image_href)
    return <HighlightedText textColor="#FFFFFF" text="Loading" />;
  if (!data.length) return null;
  const donationData = data.slice(-1);
  return (
    <div className="absolute h-full w-full flex justify-center gap-1">
      <div className="flex flex-col w-full items-center gap-5 ">
        <img
          className=" relative object-contain h-full"
          // src={'https://media.giphy.com/media/rTIXh5JftLoic/giphy.gif'}
          src={image_href}
        />
        <div className="flex  flex-wrap justify-center gap-5 ">
          <HighlightedText
            textColor={font_color}
            text={donationData[0].name || ''}
          />
          <div className="flex flex-row gap-4">
            <div className="text-[40px] text-white drop-shadow-donation font-bold">
              donated
            </div>
            <div className="flex">
              <HighlightedText
                textColor={font_color}
                text={donationData[0].amount.toLocaleString() || ''}
              />
              <HighlightedText textColor={font_color} text=" Ks" />
            </div>
          </div>
        </div>
        <DonationMessage message={donationData[0].message || ''} />
      </div>
    </div>
  );
}

export default App;
