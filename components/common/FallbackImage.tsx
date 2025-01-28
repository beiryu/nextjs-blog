import React, { useState } from 'react';
import Image from 'next/image';
import { ImageOffIcon } from 'lucide-react';

interface FallbackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const FallbackImage = ({ src, alt, width, height, className }: FallbackImageProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error)
    return (
      <div
        className={`bg-gray-200 ${className} w-full max-w-[350px] md:max-w-[600px] aspect-[2/1] flex items-center justify-center text-gray-500 text-xs p-4 text-center`}
      >
        <span className="flex items-center gap-1 line-clamp-2">
          <ImageOffIcon width={16} height={16} className="inline-block flex-shrink-0" />
          {alt || 'Image not available'}
        </span>
      </div>
    );

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={75}
        loading="lazy"
        className={`
          duration-700 ease-in-out
          ${
            loading
              ? 'scale-105 blur-2xl'
              : `scale-100 blur-0 aspect-video object-cover rounded-lg ${className}`
          }
        `}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default FallbackImage;
