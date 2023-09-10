/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1049px',
      },
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: 'var(--blue)',
          subtle: 'var(--blue-subtle)',
        },
        indigo: {
          DEFAULT: 'var(--indigo)',
          subtle: 'var(--indigo-subtle)',
        },
        purple: {
          DEFAULT: 'var(--purple)',
          subtle: 'var(--purple-subtle)',
        },
        pink: {
          DEFAULT: 'var(--pink)',
          subtle: 'var(--pink-subtle)',
        },
        red: {
          DEFAULT: 'var(--red)',
          subtle: 'var(--red-subtle)',
        },
        yellow: {
          DEFAULT: 'var(--yellow)',
          subtle: 'var(--yellow-subtle)',
        },
        green: {
          DEFAULT: 'var(--green)',
          subtle: 'var(--green-subtle)',
        },
        teal: {
          DEFAULT: 'var(--teal)',
          subtle: 'var(--teal-subtle)',
        },
        cyan: {
          DEFAULT: 'var(--cyan)',
          subtle: 'var(--cyan-subtle)',
        },
        white: 'var(--white)',
        gray: {
          DEFAULT: 'var(--gray)',
          dark: 'var(--gray-dark)',
        },
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        info: 'var(--info)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        light: 'var(--light)',
        dark: 'var(--dark)',
        orange: 'var(--orange)',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'hsl(var(--success-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translate3d(0, -25%, 0)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeInDown: 'fadeInDown .5s linear .4s forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};