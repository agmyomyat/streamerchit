import { StreamLabsSvg } from '@/components/icons/streamlabs-logo';
import { DonationShowCase } from './donation-showcase/donation-showcase';

export function HomeSectionTwo() {
  return (
    <section>
      <div className="relative isolate overflow-hidden mx-auto">
        <div className="py-24 lg:pt-32 w-full h-full px-8 md:px-12 lg:px-32">
          <div className="text-center">
            <p className="mt-8 text-2xl font-semibold lg:text-4xl tracking-tighter ">
              How It Works
            </p>
            <div className="flex flex-col justify-center items-center gap-20 md:gap-36  mt-10 md:flex-row">
              <DonationShowCase />
              <div className="max-w-full w-[500px] gap-5 flex flex-col">
                <div className="flex gap-3">
                  <h1 className="text-lg md:text-2xl font-semibold">
                    Connect With
                  </h1>
                  <StreamLabsSvg />
                </div>
                <p className=" whitespace-pre-wrap text-left">
                  We only focus on payments and donation page for viewers,
                  leaving the rest to Streamlabs for you to make the most of its
                  impressive features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
