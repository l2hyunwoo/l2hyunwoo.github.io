'use client'

import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { MDXImage } from "@/components/mdx-image"

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const images = containerRef.current.querySelectorAll('[data-mdx-image]')
      images.forEach((img) => {
        const src = img.getAttribute('data-src') || ''
        const alt = img.getAttribute('data-alt') || ''
        const root = createRoot(img)
        root.render(<MDXImage src={src} alt={alt} />)
      })
    }
  }, [content])

  return (
    <div 
      ref={containerRef}
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

