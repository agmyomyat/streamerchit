import Link from 'next/link';
import { Button } from '../ui/button';

export default function HomeSectionOne() {
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-5xl pt-30 pb-24 mx-auto">
        <h1 className="text-6xl text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          Accepts Myanmar Payment Methods on Streamlabs
        </h1>
        <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          Payments Integration with Streamlabs
        </h2>
        <div className="ml-6 text-center">
          <Link href={'/sign-in'} passHref>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
