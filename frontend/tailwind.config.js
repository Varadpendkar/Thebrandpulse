/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Modern editorial palette. Components use these names, never raw hex.
      colors: {
        paper: '#F7F5F0',
        sand: '#EFEBE3',
        card: '#FFFFFF',
        ink: '#15181D',
        body: '#3D4249',
        muted: '#5A5F66',
        line: '#E6E2D8',
        'line-strong': '#D6D2C8',
        accent: {
          DEFAULT: '#1F5C4A',
          hover: '#174A3B',
          soft: '#E4EEE9',
          ink: '#163F33',
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
}
