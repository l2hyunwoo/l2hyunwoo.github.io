import fs from 'fs/promises'
import path from 'path'
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { markdownToHtml } from "@/lib/markdown"
import { BlogContent } from "@/components/blog-content"
import { Tag } from "@/components/ui/tag"
import Link from 'next/link';

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src/content/posts', `${slug}.md`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    
    // Parse frontmatter
    const frontmatterRegex = /---\n([\s\S]*?)\n---/
    const frontmatterMatch = fileContent.match(frontmatterRegex)
    const frontmatter: Record<string, string | string[]> = {}
    
    if (frontmatterMatch) {
      const frontmatterContent = frontmatterMatch[1]
      frontmatterContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(': ')
        if (key && valueParts.length > 0) {
          const value = valueParts.join(': ').replace(/^['"](.*)['"]$/, '$1')
          // Parse tags as array
          if (key.trim() === 'tags') {
            frontmatter[key.trim()] = value.split(',').map(tag => tag.trim())
          } else {
            frontmatter[key.trim()] = value.trim()
          }
        }
      })
    }

    // Get content without frontmatter
    const contentWithoutFrontmatter = fileContent.replace(frontmatterRegex, '').trim()
    const content = await markdownToHtml(contentWithoutFrontmatter)

    return {
      slug,
      content,
      tags: (frontmatter.tags as string[]) || [],
      title: frontmatter.title as string,
      date: frontmatter.date as string,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
export default async function BlogPost({ 
  params 
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const content = post.content.replace(
    /<custom-image([^>]*)>/g,
    (match, attributes) => {
      const src = attributes.match(/src="([^"]*)"/)?.[1] || ''
      const alt = attributes.match(/alt="([^"]*)"/)?.[1] || ''
      return `<div data-mdx-image data-src="${src}" data-alt="${alt}"></div>`
    }
  )

  return (
    <article className="max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/?tags=${tag}`}>
              <Tag className="cursor-pointer">{tag}</Tag>
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground">{formatDate(post.date)}</p>
      </header>
      <BlogContent content={content} />
    </article>
  )
}
