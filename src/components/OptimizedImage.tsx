/* eslint-disable @next/next/no-img-element -- lazy placeholder pattern; migrar a next/image si se unifica */
'use client';

import { useState, useRef, useEffect } from 'react';
import type { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

function resolveSrc(src: string | StaticImageData): string {
  return typeof src === 'string' ? src : src.src;
}

interface OptimizedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | StaticImageData;
  alt: string;
  eager?: boolean;
}

export function OptimizedImage({ src, alt, className, eager = false, ...props }: OptimizedImageProps) {
  const srcUrl = resolveSrc(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager) return;
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={imgRef} className="relative w-full h-full">
      {/* Blur placeholder */}
      <div
        className={cn(
          'absolute inset-0 bg-muted transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
        aria-hidden
      >
        <div className="w-full h-full animate-pulse bg-gradient-to-br from-muted to-muted-foreground/10" />
      </div>

      {isInView && (
        <img
          src={srcUrl}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}
