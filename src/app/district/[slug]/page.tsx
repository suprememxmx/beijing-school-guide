import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { DISTRICTS, STAGES } from "@/lib/constants"
import { getContentByDistrict } from "@/lib/content"
import Breadcrumb from "@/components/Breadcrumb"
import SchoolCard from "@/components/SchoolCard"
import ArticleCard from "@/components/ArticleCard"
import JsonLd from "@/components/JsonLd"
import type { SchoolFrontmatter } from "@/types/content"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return DISTRICTS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const district = DISTRICTS.find((d) => d.slug === slug)
  if (!district) return {}

  return {
    title: `北京${district.name}幼升小指南｜学校、政策、择校方法`,
    description: `${district.name}幼升小一站式指南——${district.name}小学名单、入学政策、划片范围、择校方法，帮${district.name}家长做对幼升小决策`,
  }
}

export default async function DistrictPage({ params }: Props) {
  const { slug } = await params
  const district = DISTRICTS.find((d) => d.slug === slug)
  if (!district) notFound()

  const currentStage = STAGES.find((s) => s.active)!

  const schools = getContentByDistrict(slug, "schools")
  const guides = getContentByDistrict(slug, "guides")
  const policies = getContentByDistrict(slug, "policies")
  const comparisons = getContentByDistrict(slug, "comparisons")

  const districtJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${district.name}`,
    description: `北京${district.name}幼升小信息`,
  }

  return (
    <>
      <JsonLd data={districtJsonLd} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首页", href: "/" },
            { label: district.name },
          ]}
        />

        {/* Hero */}
        <section className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            {district.name}幼升小指南
          </h1>
          <p className="text-base text-text-secondary mb-6 leading-relaxed">
            {district.name}的幼儿园升小学指南——了解本区小学、入学政策、划片范围，帮{district.name}家长做出最合适的择校决策
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/schools?district=${slug}&stage=${currentStage.slug}`}
              className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              本区小学档案
            </Link>
            <Link
              href={`/category/guides?district=${slug}`}
              className="px-5 py-2.5 bg-white text-text-primary border border-border rounded-full text-sm font-medium hover:border-primary-light transition-colors"
            >
              本区择校指南
            </Link>
          </div>
        </section>

        {/* Schools */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              {district.name}小学
            </h2>
            <Link
              href={`/schools?district=${slug}`}
              className="text-sm text-primary hover:text-primary-dark"
            >
              查看全部 →
            </Link>
          </div>
          {schools.length === 0 ? (
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <p className="text-text-muted mb-3">暂无私立小学信息，敬请期待</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {schools.map((item) => (
                <SchoolCard key={item.slug} school={item.frontmatter as SchoolFrontmatter} />
              ))}
            </div>
          )}
        </section>

        {/* Guides */}
        {guides.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              {district.name}择校指南
            </h2>
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
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              {district.name}政策解读
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {policies.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Other districts navigation */}
        <section className="border-t border-border pt-8">
          <h2 className="text-base font-semibold text-text-primary mb-4">
            其他区域
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {DISTRICTS.filter((d) => d.slug !== slug).map((d) => (
              <Link
                key={d.slug}
                href={`/district/${d.slug}`}
                className="bg-white rounded-lg border border-border p-3 text-center hover:border-primary-light hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-text-primary">{d.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
