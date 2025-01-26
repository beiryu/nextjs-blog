import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import 'styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Component {...pageProps} />
      <Analytics />
    </QueryClientProvider>
  );
}
