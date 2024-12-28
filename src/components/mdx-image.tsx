'use client'

import Image from 'next/image'
import { useState } from 'react'

interface MDXImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export function MDXImage({ src, alt, width, height }: MDXImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full my-6">
      <Image
        src={src}
        alt={alt}
        width={width || 1200}
        height={height || 630}
        className={`
          rounded-lg
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
    </div>
  )
}

