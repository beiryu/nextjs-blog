'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessagesProvider } from 'context/messages';
import { FC, ReactNode } from 'react';

interface ComponentProps {
  children: ReactNode;
}

export default function ChatbotProvider({ children }: ComponentProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
  );
}
