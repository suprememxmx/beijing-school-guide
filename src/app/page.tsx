import Link from "next/link"
import { STAGES, CONTENT_CATEGORIES, DISTRICTS } from "@/lib/constants"
import { getContentByStage } from "@/lib/content"
import ArticleCard from "@/components/ArticleCard"
import SchoolCard from "@/components/SchoolCard"
import JsonLd from "@/components/JsonLd"
import HeroSearch from "@/components/HeroSearch"
import type { SchoolFrontmatter } from "@/types/content"

export default function HomePage() {
  const currentStage = STAGES.find((s) => s.active)!
  const guides = getContentByStage(currentStage.slug, "guides").slice(0, 4)
  const policies = getContentByStage(currentStage.slug, "policies").slice(0, 4)
  const schools = getContentByStage(currentStage.slug, "schools").slice(0, 6)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "北京升学指南",
    description: "北京升学一站式信息站，覆盖幼升小、小升初、初升高（中考）等阶段，帮助家长了解入学政策、学校信息、择校方法",
    url: process.env.NEXT_PUBLIC_SITE_URL || "",
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 leading-tight">
            北京升学，从迷茫到清晰
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            政策解读、学校档案、择校方法——覆盖幼升小、小升初、初升高全阶段，帮北京家长做对每一次升学选择
          </p>

          {/* Stage selector buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {STAGES.map((stage) => (
              <Link
                key={stage.slug}
                href={`/stage/${stage.slug}`}
                className={`inline-flex flex-col items-center px-8 py-5 rounded-2xl font-medium transition-all min-w-[160px] ${
                  stage.active
                    ? "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 scale-105"
                    : "bg-white text-text-secondary border-2 border-dashed border-border hover:border-primary-light hover:text-text-primary"
                }`}
              >
                <span className="text-lg font-semibold">{stage.name}</span>
                <span className="text-xs mt-1 opacity-80">{stage.description}</span>
              </Link>
            ))}
          </div>

          {/* Hero search */}
          <div className="mt-8">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Current stage content */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">
            北京<span className="text-primary">{currentStage.name}</span>最新内容
          </h2>
          <Link
            href={`/stage/${currentStage.slug}`}
            className="text-sm text-primary hover:text-primary-dark"
          >
            查看全部 {currentStage.name}内容 →
          </Link>
        </div>

        {/* Quick category links within stage */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {CONTENT_CATEGORIES.map((cat) => {
            const href = cat.slug === "schools"
              ? `/schools?stage=${currentStage.slug}`
              : `/category/${cat.slug}?stage=${currentStage.slug}`
            return (
              <Link
                key={cat.slug}
                href={href}
                className="bg-white rounded-xl border border-border p-4 hover:shadow-md hover:border-primary-light transition-all text-center"
              >
                <span className="font-medium text-text-primary">{cat.name}</span>
                <span className="text-xs text-text-muted block mt-0.5">{cat.description}</span>
              </Link>
            )
          })}
        </div>

        {/* District quick links */}
        <section className="mb-10">
          <h3 className="text-base font-semibold text-text-primary mb-4">按区域浏览学校</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {DISTRICTS.map((district) => (
              <Link
                key={district.slug}
                href={`/district/${district.slug}`}
                className="bg-white rounded-lg border border-border p-4 text-center hover:border-primary-light hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-text-primary">{district.name}</span>
                <span className="text-xs text-text-muted block mt-0.5">幼升小指南</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Guides */}
        {guides.length > 0 && (
          <div className="mb-10">
            <h3 className="text-base font-semibold text-text-primary mb-4">最新择校指南</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {guides.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* Policies */}
        {policies.length > 0 && (
          <div className="mb-10">
            <h3 className="text-base font-semibold text-text-primary mb-4">最新政策解读</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {policies.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* Schools */}
        {schools.length > 0 && (
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-4">学校档案</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {schools.map((item) => (
                <SchoolCard key={item.slug} school={item.frontmatter as SchoolFrontmatter} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
