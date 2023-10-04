import Image from 'next/image';
import Link from 'next/link';
export function PaymentIntegrationSection() {
  return (
    <section className="bg-slate-900">
      <div className="relative isolate overflow-hidden mx-auto">
        <div className="py-24 lg:pt-32 w-full h-full px-8 md:px-12 lg:px-32">
          <div className="text-center">
            <div className="flex flex-col gap-5 mt-8  mb-20">
              <h1 className=" text-2xl font-semibold lg:text-4xl tracking-tighter ">
                Partnered With <span className="text-[#fdbe34]">Dinger</span>
              </h1>
              <p className="w-[500px] self-center max-w-full">
                {
                  "We've joined forces with Myanmar's lead payment company. This means you can now embrace all available payment methods in the country"
                }
              </p>
              <Link
                href={'https://dinger.asia'}
                target="_blank"
                className="font-medium  dark:text-[#fdbe34] hover:cursor-pointer hover:underline"
              >
                Check out Dinger
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 place-items-center ">
              {PAYMENT_LOGOS.map((logo, i) => {
                return (
                  <div
                    className="flex justify-center max-w-full w-[200px] h-auto sm:h-[50px] md:h-[100px]"
                    key={i}
                  >
                    <Image
                      unoptimized
                      width={750}
                      height={750}
                      className=""
                      src={generatePaymentLogosLink(logo.slug)}
                      alt={logo.alt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
type PaymentLogosDataType = { slug: string; alt: string }[];
const PAYMENT_LOGOS_CDN_LINK = 'https://cdn.streamerchit.com/bank_logos_mono';
function generatePaymentLogosLink(slug: string) {
  return `${PAYMENT_LOGOS_CDN_LINK}/${slug}`;
}
const PAYMENT_LOGOS: PaymentLogosDataType = [
  { slug: 'abank.png', alt: 'abank Logo' },
  { slug: 'ayapay.png', alt: 'Aya pay Logo' },
  { slug: 'kbz.png', alt: 'Kbz Bank Logo' },
  { slug: 'cbpay-inactive.png', alt: 'Cb pay logo' },
  { slug: 'mpu.png', alt: 'Mpu logo' },
  { slug: 'mab.png', alt: 'Mab logo' },
  { slug: 'mytelpay.png', alt: 'Mytelpay logo' },
  { slug: 'onepay.png', alt: 'Onepay logo' },
  { slug: 'wavepay.png', alt: 'Wavepay logo' },
  { slug: 'mpitesan.png', alt: 'mpitesan logo' },
  { slug: 'saisaipay.png', alt: 'saisaipay logo' },
  { slug: 'mastercard-inactive.png', alt: 'Mastercard logo' },
  { slug: 'uab.png', alt: 'Uab logo' },
  { slug: 'visa-inactive.png', alt: 'Visa logo' },
  { slug: 'jcb-inactive.png', alt: 'jcb logo' },
];
