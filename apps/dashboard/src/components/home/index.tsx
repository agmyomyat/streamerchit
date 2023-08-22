import Link from 'next/link';
import { Button } from '../ui/button';

export default function HomeSectionOne() {
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-5xl pt-30 pb-24 mx-auto">
        <h1 className="text-6xl text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          Enable viewers to support you
        </h1>
        <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          Elevate the enjoyment of your streaming experience by fostering a
          dynamic atmosphere where viewers actively contribute their support to
          you.
        </h2>
        <div className="ml-6 text-center">
          <Link href={'/sign-in'} passHref>
            <Button>Join Now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
