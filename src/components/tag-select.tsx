"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Tag } from "@/components/ui/tag"

interface TagSelectProps {
  tags: string[]
  selectedTags: string[]
}

export function TagSelect({ tags, selectedTags }: TagSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams)
    const currentTag = params.get('tags')
    
    if (currentTag === tag) {
      // If clicking the same tag, remove it
      params.delete('tags')
    } else {
      // Replace current tag with new tag
      params.set('tags', tag)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Tag
        isSelected={selectedTags.length === 0}
        onClick={() => router.push('/')}
        className="cursor-pointer"
      >
        All
      </Tag>
      {tags.map((tag) => (
        <Tag
          key={tag}
          isSelected={selectedTags.includes(tag)}
          onClick={() => handleTagClick(tag)}
          className="cursor-pointer"
        >
          {tag}
        </Tag>
      ))}
    </div>
  )
}

