import React, { useState } from 'react';
import Image from 'next/image';
import { ImageOffIcon } from 'lucide-react';

interface FallbackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean; // Add priority option for above-the-fold images
}

const FallbackImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false
}: FallbackImageProps) => {
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
        priority={priority} // Use priority for important above-the-fold images
        loading={priority ? undefined : 'lazy'} // Only use lazy loading when priority is false
        className={`
          duration-700 ease-in-out aspect-video object-contain 
          ${loading ? 'scale-110 blur-2xl ' : `scale-100 blur-0 ${className}`}
        `}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add responsive sizes
        placeholder="blur" // Enable blur placeholder
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" // Tiny transparent placeholder
      />
    </div>
  );
};

export default FallbackImage;
