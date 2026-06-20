import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { STAGES } from "@/lib/constants"
import { getContentByStage } from "@/lib/content"
import ArticleCard from "@/components/ArticleCard"
import SchoolCard from "@/components/SchoolCard"
import Breadcrumb from "@/components/Breadcrumb"
import type { Stage, SchoolFrontmatter } from "@/types/content"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return STAGES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const stage = STAGES.find((s) => s.slug === slug)
  if (!stage) return {}

  return {
    title: `北京${stage.name}`,
    description: `北京${stage.name}(${stage.description})一站式指南，${stage.active ? "涵盖入学政策、学校介绍、择校方法" : "敬请期待"}`,
  }
}

export default async function StagePage({ params }: Props) {
  const { slug } = await params
  const stage = STAGES.find((s) => s.slug === slug)
  if (!stage) notFound()

  // If stage is not active yet, show coming soon
  if (!stage.active) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首页", href: "/" },
            { label: stage.name },
          ]}
        />
        <div className="text-center py-20">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            北京{stage.name}
          </h1>
          <p className="text-lg text-text-secondary mb-2">
            该学段内容正在建设中
          </p>
          <p className="text-sm text-text-muted mb-8">
            目前主攻<Link href="/stage/preschool-to-primary" className="text-primary hover:text-primary-dark">幼升小</Link>阶段，敬请期待后续更新
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  // Active stage: show content
  const guides = getContentByStage(slug as Stage, "guides")
  const policies = getContentByStage(slug as Stage, "policies")
  const comparisons = getContentByStage(slug as Stage, "comparisons")
  const schools = getContentByStage(slug as Stage, "schools")

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: stage.name },
        ]}
      />

      {/* Stage Hero */}
      <section className="mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          北京{stage.name}
        </h1>
        <p className="text-lg text-text-secondary mb-6">
          {stage.description}阶段的入学政策、学校信息、择校方法
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/category/guides?stage=${stage.slug}`}
            className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            择校指南
          </Link>
          <Link
            href={`/category/policies?stage=${stage.slug}`}
            className="px-5 py-2.5 bg-white text-text-primary border border-border rounded-full text-sm font-medium hover:border-primary-light transition-colors"
          >
            政策解读
          </Link>
          <Link
            href={`/category/comparisons?stage=${stage.slug}`}
            className="px-5 py-2.5 bg-white text-text-primary border border-border rounded-full text-sm font-medium hover:border-primary-light transition-colors"
          >
            学校对比
          </Link>
          <Link
            href={`/schools?stage=${stage.slug}`}
            className="px-5 py-2.5 bg-white text-text-primary border border-border rounded-full text-sm font-medium hover:border-primary-light transition-colors"
          >
            学校档案
          </Link>
        </div>
      </section>

      {/* Guides */}
      {guides.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-text-primary mb-4">择校指南</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {guides.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Policies */}
      {policies.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-text-primary mb-4">政策解读</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {policies.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Comparisons */}
      {comparisons.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-text-primary mb-4">学校对比</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {comparisons.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Schools */}
      {schools.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-text-primary mb-4">学校档案</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((item) => (
              <SchoolCard key={item.slug} school={item.frontmatter as SchoolFrontmatter} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
