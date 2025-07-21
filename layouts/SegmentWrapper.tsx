import { ReactNode } from 'react';

interface ComponentProps {
  children: ReactNode;
}

export function SegmentWrapper({ children }: ComponentProps) {
  return <div className="">{children}</div>;
}
