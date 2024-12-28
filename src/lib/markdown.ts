/* eslint-disable @typescript-eslint/no-explicit-any */
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import { visit } from 'unist-util-visit'

function replaceImagesWithNextImage() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.tagName = 'custom-image'
        
        // Handle both relative and absolute paths
        if (node.properties.src && !node.properties.src.startsWith('http')) {
          // For local images, assume they're in the content/images directory
          node.properties.src = `/images/${node.properties.src}`
        }
      }
    })
  }
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(replaceImagesWithNextImage)
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}

