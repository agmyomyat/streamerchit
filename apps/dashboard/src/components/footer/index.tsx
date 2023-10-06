import { Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="px-3 sm:px-48 bg-slate-900 mt-auto py-3 bg-dark">
      <div className="flex justify-between ">
        <p className="text-light">
          Made with ♥ by{' '}
          <a
            className="text-blue-300"
            href="https://facebook.com/urnotalone2"
            target="_blank"
            rel="noreferrer"
          >
            Aung Myo Myat
          </a>
        </p>
        <div className="flex gap-3">
          <Phone />
          <a href="tel:+959778711777">09778711777</a>
        </div>
      </div>
    </footer>
  );
}
