import Link from "next/link"
import type { ContentItem } from "@/types/content"
import { CONTENT_CATEGORIES } from "@/lib/constants"

export default function ArticleCard({ article }: { article: ContentItem }) {
  const { frontmatter, slug } = article
  const categoryInfo = CONTENT_CATEGORIES.find((c) => c.slug === frontmatter.category)

  const href =
    frontmatter.category === "comparisons"
      ? `/comparison/${slug}`
      : frontmatter.category === "schools"
        ? `/schools/${slug}`
        : `/${slug}`

  return (
    <Link
      href={href}
      className="block bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-primary-light transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
          {categoryInfo?.name || frontmatter.category}
        </span>
        {frontmatter.publishedAt && (
          <span className="text-xs text-text-muted">{frontmatter.publishedAt}</span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2 leading-snug">
        {frontmatter.title}
      </h3>

      <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
        {frontmatter.description}
      </p>

      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-text-muted bg-surface-secondary px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
