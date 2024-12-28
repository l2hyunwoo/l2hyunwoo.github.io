import fs from 'fs/promises'
import path from 'path'
import { TagSelect } from "@/components/tag-select"
import { PostList } from "@/components/post-list"

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const files = await fs.readdir(postsDirectory)
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename)
      const content = await fs.readFile(filePath, 'utf8')
      
      // Parse frontmatter
      const frontmatterRegex = /---\n([\s\S]*?)\n---/
      const frontmatterMatch = content.match(frontmatterRegex)
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

      // Get excerpt
      const contentWithoutFrontmatter = content.replace(frontmatterRegex, '').trim()
      const excerpt = contentWithoutFrontmatter
        .split('\n')
        .find(line => line.length > 0 && !line.startsWith('#'))
        ?.slice(0, 200) || ''

      return {
        slug: filename.replace('.md', ''),
        excerpt,
        tags: (frontmatter.tags as string[]) || [],
        title: frontmatter.title as string,
        date: frontmatter.date as string,
      }
    })
  )

  // Sort posts by date
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export default async function Home({
  searchParams,
}: {
  searchParams: { tags?: string }
}) {
  const posts = await getPosts()
  const selectedTags = searchParams.tags ? searchParams.tags.split(',') : []
  
  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort()

  // Filter posts by selected tags
  const filteredPosts = selectedTags.length > 0
    ? posts.filter((post) => 
        selectedTags.every((tag) => post.tags.includes(tag))
      )
    : posts

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <TagSelect
          tags={allTags}
          selectedTags={selectedTags}
        />
      </div>
      <PostList posts={filteredPosts} />
    </div>
  )
}

