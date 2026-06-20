import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getContentFiles, getContentBySlug, markdownToHtml, getRelatedContent } from "@/lib/content"
import { DISTRICTS, SCHOOL_TYPES } from "@/lib/constants"
import Breadcrumb from "@/components/Breadcrumb"
import JsonLd from "@/components/JsonLd"
import ArticleCard from "@/components/ArticleCard"
import type { SchoolFrontmatter } from "@/types/content"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const schools = getContentFiles("schools")
  return schools.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const school = getContentBySlug("schools", slug)
  if (!school) return {}

  return {
    title: school.frontmatter.title,
    description: school.frontmatter.description,
    openGraph: {
      title: school.frontmatter.title,
      description: school.frontmatter.description,
      type: "article",
    },
  }
}

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params
  const school = getContentBySlug("schools", slug)
  if (!school) notFound()

  const fm = school.frontmatter as SchoolFrontmatter
  const districtName = DISTRICTS.find((d) => d.slug === fm.district)?.name || fm.district
  const schoolTypeName = SCHOOL_TYPES.find((t) => t.slug === fm.schoolType)?.name || fm.schoolType

  const htmlContent = await markdownToHtml(school.content)
  const keywords = [fm.title, ...(fm.tags || [])]
  const relatedContent = getRelatedContent(keywords, fm.district, slug)

  const schoolJsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    name: fm.title,
    description: fm.description,
    address: fm.address ? { "@type": "PostalAddress", addressLocality: districtName, addressRegion: "北京" } : undefined,
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={schoolJsonLd} />

      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "学校档案", href: "/schools" },
          { label: fm.title },
        ]}
      />

      {/* School header */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight mb-4">
          {fm.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
            {districtName}
          </span>
          <span className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent">
            {schoolTypeName}
          </span>
          {fm.features?.map((f) => (
            <span key={f} className="text-sm px-3 py-1 rounded-full bg-surface-secondary text-text-secondary">
              {f}
            </span>
          ))}
        </div>

        <p className="text-base text-text-secondary leading-relaxed">{fm.description}</p>
      </header>

      {/* Info grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-5 bg-white rounded-xl border border-border">
        <div>
          <p className="text-xs text-text-muted mb-1">所属区域</p>
          <p className="text-sm font-medium text-text-primary">{districtName}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted mb-1">学校类型</p>
          <p className="text-sm font-medium text-text-primary">{schoolTypeName}</p>
        </div>
        {fm.address && (
          <div>
            <p className="text-xs text-text-muted mb-1">地址</p>
            <p className="text-sm font-medium text-text-primary">{fm.address}</p>
          </div>
        )}
        {fm.website && (
          <div>
            <p className="text-xs text-text-muted mb-1">官方网站</p>
            <a
              href={fm.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary-dark underline underline-offset-2"
            >
              点击访问 →
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Related content */}
      {relatedContent.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            相关文章
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedContent.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
