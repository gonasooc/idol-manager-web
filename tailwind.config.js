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
        // Retro Color Palette
        retro: {
          cream: '#f5f5dc',
          beige: '#e8dcc4',
          teal: '#40e0d0',
          cyan: '#5bc0be',
          orange: '#f4a460',
          gold: '#ffd700',
          pink: '#ff69b4',
          red: '#ff6b6b',
          'blue-dark': '#1a1a4e',
          blue: '#4169e1',
          green: '#32cd32',
        },
        // Window 95 style borders
        win95: {
          light: '#ffffff',
          medium: '#c0c0c0',
          dark: '#808080',
          darker: '#404040',
          bg: '#c0c0c0',
          title: '#000080',
        },
        // Bond level colors
        bond: {
          low: '#ff6b6b',
          mid: '#f4a460',
          high: '#ffd700',
          max: '#ff69b4',
        },
      },
      boxShadow: {
        'retro-outset': 'inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff',
        'retro-inset': 'inset 2px 2px 0 #808080, inset -2px -2px 0 #ffffff',
        'pixel': '4px 4px 0 #333',
        'pixel-sm': '2px 2px 0 #333',
      },
      keyframes: {
        'float-up': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-40px)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
      },
      animation: {
        'float-up': 'float-up 1s ease-out forwards',
        'pulse-glow': 'pulse-glow 1s ease-in-out',
        'blink': 'blink 1s step-end infinite',
        'pixel-bounce': 'pixel-bounce 0.5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'typing': 'typing 2s steps(20) forwards',
      },
    },
  },
  plugins: [],
}
