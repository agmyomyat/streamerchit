import Link from 'next/link';
import { Button } from '../ui/button';

import Image from 'next/image';
export default function HomeSectionOne() {
  return (
    <section>
      <div className="relative isolate overflow-hidden mx-auto">
        <Image
          src="https://cdn.streamerchit.com/hero-section-one.webp"
          alt=""
          unoptimized
          fill={true}
          className="absolute inset-0 -z-10 w-full object-cover opacity-60"
        />
        <div className="py-64 lg:pt-32 w-full h-full px-8 md:px-12 lg:px-32">
          <div className="text-left">
            <p className="mt-8 text-4xl font-semibold lg:text-6xl tracking-tighter ">
              Enable viewers to support you
              <span className="md:block ">
                and connect with your supporters
              </span>
            </p>
            <p className="max-w-md mt-4 text-xl text-slate-400">
              Empower your viewers with StreamerChit, a platform that helps you
              accept various payment methods in Myanmar.
            </p>
            <div className="flex flex-col items-center gap-3 mt-10 md:flex-row">
              <Link href={'/sign-in'}>
                <Button className=" w-full h-12 px-4 py-2 text-sm font-semibold  rounded-lg bg-gradient-to-b  md:w-auto">
                  JOIN NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
