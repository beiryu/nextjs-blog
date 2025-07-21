module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.tsx',
    './lib/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          background: '#ffffff',
          surface: '#f8f9fa',
          cardBackground: '#ffffff'
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#6b7280',
          muted: '#9ca3af'
        },
        accent: {
          green: '#10b981',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          orange: '#f59e0b',
          red: '#ef4444'
        },
        neutral: {
          border: '#e5e7eb',
          divider: '#f3f4f6',
          hover: '#f9fafb'
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        fallback: ['Arial', 'sans-serif']
      },
      fontSize: {
        h1: ['48px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        h2: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '1.4', fontWeight: '500' }]
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px'
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        card: '12px'
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding'
      },
      transitionDuration: {
        2000: '2000ms'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        sm: '20px',
        md: '20px',
        lg: '20px',
        xl: '20px'
      },
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1200px',
        xl: '1200px'
      }
    },
    screens: {
      mobile: '320px',
      sm: '320px',
      tablet: '768px',
      md: '768px',
      desktop: '1024px',
      lg: '1024px',
      large: '1440px',
      xl: '1440px'
    }
  },
  plugins: [require('@tailwindcss/line-clamp')],
  darkMode: 'class'
};
