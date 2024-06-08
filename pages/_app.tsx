import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />;
      <Analytics />
    </>
  );
}
