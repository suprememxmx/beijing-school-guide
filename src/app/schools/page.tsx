import type { Metadata } from "next"
import Link from "next/link"
import { getContentFiles } from "@/lib/content"
import { DISTRICTS, SCHOOL_TYPES } from "@/lib/constants"
import SchoolCard from "@/components/SchoolCard"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "北京小学学校档案",
  description: "北京各区公立、私立、国际小学详细介绍，帮助家长全面了解学校情况",
}

type Props = {
  searchParams: Promise<{ district?: string; type?: string }>
}

export default async function SchoolsPage({ searchParams }: Props) {
  const params = await searchParams
  let schools = getContentFiles("schools")

  // Filter by district if provided
  if (params.district) {
    schools = schools.filter((s) => s.frontmatter.district === params.district)
  }

  // Filter by school type if provided
  if (params.type) {
    schools = schools.filter((s) => s.frontmatter.schoolType === params.type)
  }

  const selectedDistrictName = DISTRICTS.find((d) => d.slug === params.district)?.name
  const selectedTypeName = SCHOOL_TYPES.find((t) => t.slug === params.type)?.name

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "学校档案" },
        ]}
      />

      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">北京小学学校档案</h1>
      <p className="text-text-secondary mb-8">
        {selectedDistrictName
          ? `${selectedDistrictName}的小学`
          : selectedTypeName
            ? `北京${selectedTypeName}`
            : "按区域和类型浏览北京各小学"}
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-xl border border-border">
        <div>
          <p className="text-xs text-text-muted mb-2 font-medium">按区域</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/schools"
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                !params.district
                  ? "bg-primary text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-primary/10 hover:text-primary"
              }`}
            >
              全部
            </Link>
            {DISTRICTS.map((d) => (
              <Link
                key={d.slug}
                href={`/schools?district=${d.slug}${params.type ? `&type=${params.type}` : ""}`}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  params.district === d.slug
                    ? "bg-primary text-white"
                    : "bg-surface-secondary text-text-secondary hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-text-muted mb-2 font-medium">按类型</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/schools${params.district ? `?district=${params.district}` : ""}`}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                !params.type
                  ? "bg-primary text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-primary/10 hover:text-primary"
              }`}
            >
              全部
            </Link>
            {SCHOOL_TYPES.map((t) => (
              <Link
                key={t.slug}
                href={`/schools?type=${t.slug}${params.district ? `&district=${params.district}` : ""}`}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  params.type === t.slug
                    ? "bg-primary text-white"
                    : "bg-surface-secondary text-text-secondary hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* School list */}
      {schools.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          <p>暂无私立小学信息，敬请期待</p>
          <Link href="/schools" className="text-primary hover:text-primary-dark text-sm mt-2 inline-block">
            查看全部学校
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schools.map((item) => (
            <SchoolCard key={item.slug} school={item.frontmatter as any} />
          ))}
        </div>
      )}
    </div>
  )
}
