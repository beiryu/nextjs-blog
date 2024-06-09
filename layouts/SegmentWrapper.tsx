import { ReactNode } from 'react';

interface ComponentProps {
  children: ReactNode;
}

export function SegmentWrapper({ children }: ComponentProps) {
  return <div className="my-14 bg-white rounded-xl shadow-xl">{children}</div>;
}
