/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        retro: ['"VT323"', 'monospace'],
      },
      colors: {
        // Neo-Retro / Y2K Color Palette
        retro: {
          bg: '#fffbf0', // Warm cream background
          surface: '#ffffff',
          primary: '#ff0080', // Hot Pink
          secondary: '#7928ca', // Vivid Purple
          success: '#00af54', // Green
          warning: '#ffc800', // Yellow
          error: '#ff124f', // Red
          blue: '#0070f3',
          cyan: '#50e3c2',
          black: '#000000',
          gray: '#888888',
          'gray-light': '#f4f4f4',
        },
        // Bond level colors (updated to be more vivid)
        bond: {
          low: '#ff124f',
          mid: '#ffc800',
          high: '#00af54',
          max: '#ff0080',
        },
      },
      boxShadow: {
        'neo-brutal': '4px 4px 0 0 #000000',
        'neo-brutal-sm': '2px 2px 0 0 #000000',
        'neo-brutal-lg': '8px 8px 0 0 #000000',
        'neo-brutal-inset': 'inset 2px 2px 0 0 #000000',
      },
      keyframes: {
        'float-up': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-40px)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0px currentColor' },
          '50%': { boxShadow: '0 0 10px currentColor' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'marquee': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'float-up': 'float-up 1s ease-out forwards',
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'pixel-bounce': 'pixel-bounce 0.5s ease-in-out infinite',
        'pop-in': 'pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 15s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
