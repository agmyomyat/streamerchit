import { Facebook, Github, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="text-sm sm:text-base px-3 lg:px-48 bg-slate-900 mt-auto py-3 bg-dark">
      <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between ">
        <p className="text-light">
          Made with ♥ by{' '}
          <a
            className="text-blue-300"
            href="https://facebook.com/agmmdotdev"
            target="_blank"
            rel="noreferrer"
          >
            Aung Myo Myat
          </a>
        </p>
        <div className="flex gap-3">
          <a
            href="https://facebook.com/agmmdotdev"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook />
          </a>
          <a
            href="https://github.com/agmyomyat"
            target="_blank"
            rel="noreferrer"
          >
            <Github />
          </a>
          <Phone />
          <a href="tel:+959778711777">+959778711777</a>
        </div>
      </div>
    </footer>
  );
}
