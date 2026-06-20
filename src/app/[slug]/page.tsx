import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getContentFiles, getContentBySlug, markdownToHtml } from "@/lib/content"
import Breadcrumb from "@/components/Breadcrumb"
import JsonLd from "@/components/JsonLd"
import { CONTENT_CATEGORIES, SITE_URL } from "@/lib/constants"
import { ContentType } from "@/types/content"

// This page handles guides and policies (root-level slugs)

type Props = {
  params: Promise<{ slug: string }>
}

function detectCategory(slug: string): ContentType | null {
  // Check all non-school categories for this slug
  const categories: ContentType[] = ["guides", "policies"]
  for (const cat of categories) {
    const items = getContentFiles(cat)
    if (items.find((i) => i.slug === slug)) return cat
  }
  return null
}

export async function generateStaticParams() {
  const categories: ContentType[] = ["guides", "policies"]
  const slugs = categories.flatMap((cat) => getContentFiles(cat).map((i) => i.slug))
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = detectCategory(slug)
  if (!category) return {}

  const article = getContentBySlug(category, slug)
  if (!article) return {}

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      publishedTime: article.frontmatter.publishedAt,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const category = detectCategory(slug)
  if (!category) notFound()

  const article = getContentBySlug(category, slug)
  if (!article) notFound()

  const htmlContent = await markdownToHtml(article.content)
  const { frontmatter } = article
  const categoryInfo = CONTENT_CATEGORIES.find((c) => c.slug === category)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    author: { "@type": "Organization", name: "北京升学指南" },
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={articleJsonLd} />

      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: categoryInfo?.name || category, href: `/category/${category}` },
          { label: frontmatter.title },
        ]}
      />

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {categoryInfo?.name || category}
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
