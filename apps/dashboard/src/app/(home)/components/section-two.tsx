export function SectionTwo() {
  return (
    <div>
      <h2>hello</h2>
    </div>
  );
}

type PaymentLogosDataType = { slug: string; alt: string }[];
const PAYMENT_LOGOS_CDN_LINK = 'https://cdn.streamerchit.com/bank_logos/';
function generatePaymentLogosLink(slug: string) {
  return `${PAYMENT_LOGOS_CDN_LINK}/${slug}`;
}
const PAYMENT_LOGOS: PaymentLogosDataType = [
  { slug: 'aya.png', alt: 'Aya Bank Logo' },
  { slug: 'kbz.png', alt: 'Kbz Bank Logo' },
  { slug: 'cbpay.png', alt: 'Cb pay logo' },
  { slug: 'mpu.png', alt: 'Mpu logo' },
  { slug: 'mab.png', alt: 'Mab logo' },
  { slug: 'mytelpay.png', alt: 'Mytelpay logo' },
  { slug: 'onepay.png', alt: 'Onepay logo' },
  { slug: 'wavepay.png', alt: 'Wavepay logo' },
  { slug: 'mastercard.png', alt: 'Mastercard logo' },
  { slug: 'uab.png', alt: 'Uab logo' },
  { slug: 'visa.png', alt: 'Visa logo' },
];
