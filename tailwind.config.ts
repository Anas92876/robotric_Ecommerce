import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rt-dark': '#001a00',
        'rt-primary': '#003300',
        'rt-surface': '#002200',
        'rt-accent': '#cccc99',
        'rt-dim': '#99996b',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'Share Tech Mono', 'monospace'],
        body: ['var(--font-body)', 'Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(204, 204, 153, 0.2)',
        'glow': '0 0 20px rgba(204, 204, 153, 0.3)',
        'glow-lg': '0 0 40px rgba(204, 204, 153, 0.4)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(200vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(204,204,153,0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(204,204,153,0.5)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
