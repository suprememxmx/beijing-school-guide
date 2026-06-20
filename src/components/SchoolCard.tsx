import Link from "next/link"
import type { SchoolFrontmatter } from "@/types/content"
import { DISTRICTS, SCHOOL_TYPES } from "@/lib/constants"

export default function SchoolCard({ school }: { school: SchoolFrontmatter }) {
  const districtName = DISTRICTS.find((d) => d.slug === school.district)?.name || school.district
  const schoolTypeName = SCHOOL_TYPES.find((t) => t.slug === school.schoolType)?.name || school.schoolType

  return (
    <Link
      href={`/schools/${school.slug}`}
      className="block bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-primary-light transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-text-primary leading-snug">
          {school.title}
        </h3>
        <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          {schoolTypeName}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs text-text-muted bg-surface-secondary px-2 py-0.5 rounded">
          {districtName}
        </span>
        {school.features?.slice(0, 3).map((f) => (
          <span key={f} className="text-xs text-text-muted bg-surface-secondary px-2 py-0.5 rounded">
            {f}
          </span>
        ))}
      </div>

      <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
        {school.description}
      </p>
    </Link>
  )
}
