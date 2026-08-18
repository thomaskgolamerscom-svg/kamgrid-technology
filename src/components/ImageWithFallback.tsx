import React, { useState } from 'react';
import { KamgridLoader } from './BrandLoader';
import { KAMGRID_IMAGES } from '../assets/images';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-16/9',
  containerClassName = '',
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fallbackSrc = KAMGRID_IMAGES.fallback;

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${aspectRatio} ${containerClassName}`}>
      {/* Loading Placeholder with subtle brand calibration loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-10">
          <KamgridLoader size="sm" showRing={true} className="opacity-60" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
