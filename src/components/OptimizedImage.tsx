'use client';

import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

export interface OptimizedImageProps {
  src: string | StaticImageData;
  alt: string;
  /** Responsive widths for `fill` (see next/image docs). */
  sizes: string;
  className?: string;
  /** LCP / above-the-fold: sets `priority` on next/image. */
  eager?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  sizes,
  className,
  eager = false,
}: OptimizedImageProps) {
  const isStatic = typeof src === 'object';

  return (
    <div className="relative size-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={eager}
        placeholder={isStatic ? 'blur' : 'empty'}
        className={cn('object-cover', className)}
      />
    </div>
  );
}
