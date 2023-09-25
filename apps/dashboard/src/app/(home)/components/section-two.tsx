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
            <div className="flex flex-col justify-center items-center gap-10  md:gap-36  mt-10 md:flex-row">
              <DonationShowCase />
              <div className="max-w-full w-[500px] gap-5 flex flex-col">
                <div className="flex gap-3">
                  <h1 className="text-lg md:text-2xl font-semibold">
                    Accept Donations
                  </h1>
                </div>
                <p className=" whitespace-pre-wrap text-left">
                  Accept contributions from your viewers and showcase them
                  during your live broadcasts. Personalize the appearance of
                  alerts by configuring a wide range of available settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
