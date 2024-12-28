'use client'

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { formatDate } from "@/lib/utils"
import { Tag } from "@/components/ui/tag"

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter()

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.slug} className="group">
          <Link href={`/blog/${post.slug}`}>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag
                    key={tag}
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(`/?tags=${tag}`)
                    }}
                    className="cursor-pointer"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
              <p className="text-muted-foreground">{post.excerpt}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

