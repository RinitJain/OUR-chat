module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        love: {
          light: '#ff7f7f',
          DEFAULT: '#ff4d4d',
          dark: '#ff1a1a',
        },
        fight: {
          light: '#ffcccc',
          DEFAULT: '#ff6666',
          dark: '#cc0000',
        },
        sorry: {
          light: '#b3c7e6',
          DEFAULT: '#7a9ec2',
          dark: '#4d7a9a',
        },
      },
      animation: {
        heart: 'heartbeat 1s infinite',
        shake: 'shake 0.5s',
        sad: 'sadface 1s infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        shake: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2px, 0)' },
          '50%': { transform: 'translate(2px, 0)' },
          '75%': { transform: 'translate(-2px, 0)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        sadface: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};