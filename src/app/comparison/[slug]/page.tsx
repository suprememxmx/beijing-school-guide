import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getContentFiles, getContentBySlug, markdownToHtml } from "@/lib/content"
import Breadcrumb from "@/components/Breadcrumb"
import JsonLd from "@/components/JsonLd"
import { CONTENT_CATEGORIES } from "@/lib/constants"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const comparisons = getContentFiles("comparisons")
  return comparisons.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = getContentBySlug("comparisons", slug)
  if (!comparison) return {}

  return {
    title: comparison.frontmatter.title,
    description: comparison.frontmatter.description,
    openGraph: {
      title: comparison.frontmatter.title,
      description: comparison.frontmatter.description,
      type: "article",
    },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const comparison = getContentBySlug("comparisons", slug)
  if (!comparison) notFound()

  const htmlContent = await markdownToHtml(comparison.content)
  const { frontmatter } = comparison
  const categoryInfo = CONTENT_CATEGORIES.find((c) => c.slug === "comparisons")

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={articleJsonLd} />

      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: categoryInfo?.name || "学校对比", href: "/category/comparisons" },
          { label: frontmatter.title },
        ]}
      />

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
            {categoryInfo?.name || "学校对比"}
          </span>
          {frontmatter.publishedAt && (
            <span className="text-sm text-text-muted">{frontmatter.publishedAt}</span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight mb-4">
          {frontmatter.title}
        </h1>

        <p className="text-base text-text-secondary leading-relaxed">
          {frontmatter.description}
        </p>
      </header>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}
