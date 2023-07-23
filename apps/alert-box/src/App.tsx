import './App.css';
import { HighlightedText } from './components/highlighted-text';
import { DonationMessage } from './components/donation-message';
import { useDonationEvent } from './hooks/use-donation-event';
import { useDonationSetting } from './contexts/donation-settings-context';
function App() {
  const { data } = useDonationEvent(
    `${import.meta.env.VITE_BACKEND_URL}/v1/alertbox/sse/donation`
  );
  const { image_href, font_color, font_size, message_font_size, font_weight } =
    useDonationSetting();

  if (!image_href)
    return (
      <HighlightedText
        fontWeight={800}
        textSize="60px"
        textColor="#FFFFFF"
        text="Loading"
      />
    );
  if (!data.length) return null;
  const donationData = data.slice(-1);
  return (
    <div className="absolute h-[100vh] w-full flex justify-center gap-1">
      <div className="flex h-full flex-col w-full items-center gap-5 ">
        <div
          style={{
            backgroundImage: `url(${image_href})`,
            height: '100%',
            display: 'table-cell',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
          className="w-full"
        ></div>
        <div>
          <div className="flex  flex-wrap justify-center gap-5 ">
            <HighlightedText
              fontWeight={font_weight}
              textSize={font_size}
              textColor={font_color}
              text={donationData[0].name || ''}
            />
            <div className="flex flex-row gap-4">
              <div
                style={{ fontSize: font_size, fontWeight: font_weight }}
                className="drop-shadow-donation text-white  font-bold"
              >
                donated
              </div>
              <div className="flex">
                <HighlightedText
                  fontWeight={font_weight}
                  textSize={font_size}
                  textColor={font_color}
                  text={donationData[0].amount.toLocaleString() || ''}
                />
                <HighlightedText
                  fontWeight={font_weight}
                  textSize={font_size}
                  textColor={font_color}
                  text=" Ks"
                />
              </div>
            </div>
          </div>
          <DonationMessage
            text_size={message_font_size}
            message={
              donationData[0].message
              // 'မျက်စိတဆုံး သိပ်လှတဲ့ ရှုခင်းတွေကို မှတ်တမ်းတင်နိုင်ဖို့ သာမန်ထက် ပိုကျယ်ပြန့်တဲ့ ကင်မရာမြင်ကွင်းတွေနဲ့ iPhone 11 က ရွေးချယ်စရာတစ်ခုပါပဲ။'
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
