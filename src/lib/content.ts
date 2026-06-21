import fs from "fs"
import path from "path"
import { remark } from "remark"
import remarkHtml from "remark-html"
import matter from "gray-matter"
import type { ContentItem, PageFrontmatter, ContentType, Stage } from "@/types/content"

const contentDir = path.join(process.cwd(), "content")

/** Sort content items by publishedAt descending (newest first) */
function sortByDate(items: ContentItem[]): ContentItem[] {
  return [...items].sort((a, b) => {
    const dateA = a.frontmatter.publishedAt ? new Date(a.frontmatter.publishedAt).getTime() : 0
    const dateB = b.frontmatter.publishedAt ? new Date(b.frontmatter.publishedAt).getTime() : 0
    return dateB - dateA
  })
}

/** Get all markdown files of a specific category, sorted newest first */
export function getContentFiles(category: ContentType): ContentItem[] {
  const dir = path.join(contentDir, category)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8")
    const { data, content } = matter(raw)
    const slug = data.slug || file.replace(/\.md$/, "")

    return {
      frontmatter: data as PageFrontmatter,
      content,
      slug,
    }
  })

  return sortByDate(items)
}

/** Get all content from all categories, sorted newest first */
export function getAllContent(): ContentItem[] {
  const categories: ContentType[] = ["guides", "policies", "comparisons", "schools"]
  return sortByDate(categories.flatMap(getContentFiles))
}

/** Get a single article by category and slug */
export function getContentBySlug(category: ContentType, slug: string): ContentItem | null {
  const dir = path.join(contentDir, category)
  if (!fs.existsSync(dir)) return null

  const file = fs.readdirSync(dir).find(
    (f) => f.endsWith(".md") && (f.replace(/\.md$/, "") === slug),
  )
  if (!file) return null

  const raw = fs.readFileSync(path.join(dir, file), "utf-8")
  const { data, content } = matter(raw)

  return {
    frontmatter: data as PageFrontmatter,
    content,
    slug,
  }
}

/** Get all unique slugs for sitemap generation */
export function getAllSlugs(): Array<{ category: ContentType; slug: string }> {
  const categories: ContentType[] = ["guides", "policies", "comparisons", "schools"]
  const result: Array<{ category: ContentType; slug: string }> = []

  for (const category of categories) {
    const items = getContentFiles(category)
    for (const item of items) {
      result.push({ category, slug: item.slug })
    }
  }

  return result
}

/** Convert markdown to HTML string */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown)
  return result.toString()
}

/** Get content files filtered by a predicate */
export function getFilteredContent(
  predicate: (item: ContentItem) => boolean,
): ContentItem[] {
  return getAllContent().filter(predicate)
}

/** Get content files by stage, optionally filtered by category */
export function getContentByStage(
  stage: Stage,
  category?: ContentType,
): ContentItem[] {
  const items = category ? getContentFiles(category) : getAllContent()
  return items.filter((item) => item.frontmatter.stage === stage)
}

/** Get content files by district, optionally filtered by category */
export function getContentByDistrict(
  district: string,
  category?: ContentType,
): ContentItem[] {
  const items = category ? getContentFiles(category) : getAllContent()
  return items.filter(
    (item) => item.frontmatter.district === district || item.frontmatter.city === district,
  )
}

/** Find content related to a school by matching tags/title/district */
export function getRelatedContent(
  keywords: string[],
  district: string,
  excludeSlug: string,
): ContentItem[] {
  return getAllContent().filter((item) => {
    if (item.slug === excludeSlug) return false
    if (item.frontmatter.category === "schools") return false

    const safeTags = (item.frontmatter.tags || []).filter(
      (t: unknown): t is string => typeof t === "string",
    )
    const safeKeywords = keywords.filter((k): k is string => typeof k === "string")

    const tagMatch = safeTags.some((tag) =>
      safeKeywords.some((k) => tag.includes(k) || k.includes(tag)),
    )
    const districtMatch = item.frontmatter.district === district
    const titleMatch = safeKeywords.some(
      (k) =>
        (typeof item.frontmatter.title === "string" && item.frontmatter.title.includes(k)) ||
        (typeof item.frontmatter.description === "string" && item.frontmatter.description.includes(k)),
    )

    return tagMatch || districtMatch || titleMatch
  }).slice(0, 4)
}
