import Image from 'next/image';
import { useState } from 'react';

interface ComponentProps {
  imageSource: string;
  fallbackSource: string;
  alt: string;
}

export const ImageWithFallback = (props: ComponentProps) => {
  const { imageSource, fallbackSource, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState<string>(imageSource);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imageSource}
      onError={() => {
        setImgSrc(fallbackSource);
      }}
    />
  );
};
