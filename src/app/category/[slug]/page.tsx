import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getContentFiles } from "@/lib/content"
import { CONTENT_CATEGORIES } from "@/lib/constants"
import ArticleCard from "@/components/ArticleCard"
import Breadcrumb from "@/components/Breadcrumb"
import type { ContentType } from "@/types/content"

type Props = {
  params: Promise<{ slug: string }>
}

const VALID_CATEGORIES: ContentType[] = ["guides", "policies", "comparisons"]

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = CONTENT_CATEGORIES.find((c) => c.slug === slug)
  if (!cat) return {}

  return {
    title: cat.name,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const cat = CONTENT_CATEGORIES.find((c) => c.slug === slug)

  if (!cat || !VALID_CATEGORIES.includes(slug as ContentType)) {
    notFound()
  }

  const articles = getContentFiles(slug as ContentType)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: cat.name },
        ]}
      />

      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{cat.name}</h1>
      <p className="text-text-secondary mb-8">{cat.description}</p>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          <p>暂无内容，敬请期待</p>
          <Link href="/" className="text-primary hover:text-primary-dark text-sm mt-2 inline-block">
            返回首页
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
