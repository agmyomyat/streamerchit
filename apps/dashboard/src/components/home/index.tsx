import Link from 'next/link';
import { Button } from '../ui/button';

export default function HomeSectionOne() {
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-5xl pt-52 pb-24 mx-auto">
        <h1 className="text-3xl text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          Tip Alerts For Streamer
        </h1>
        <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          StreamerChit is a service for streamers to receive tip alerts.
          <br />
          {
            'The platform is still in beta, so the landing page is not yet complete :('
          }
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
