/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        donation: '1px 1px 1px rgba(0, 0, 0, 1)',
        'donation-msg': '0.5px 0px 1.5px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
};
