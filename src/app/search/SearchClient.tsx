"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CONTENT_CATEGORIES, DISTRICTS } from "@/lib/constants"

interface SearchItem {
  title: string
  description: string
  slug: string
  category: string
  tags: string[]
  district: string
  schoolType: string
}

function getHref(item: SearchItem): string {
  switch (item.category) {
    case "comparisons":
      return `/comparison/${item.slug}`
    case "schools":
      return `/schools/${item.slug}`
    default:
      return `/${item.slug}`
  }
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-accent/20 text-text-primary rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

export default function SearchClient() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [index, setIndex] = useState<SearchItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/search-index")
      .then((res) => res.json())
      .then((data) => {
        setIndex(data)
        setLoaded(true)
      })
  }, [])

  const results = useMemo(() => {
    if (!query.trim() || !loaded) return []

    const q = query.toLowerCase()
    return index.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q)
      const descMatch = item.description.toLowerCase().includes(q)
      const tagMatch = item.tags.some((t) => t.toLowerCase().includes(q))
      const districtMatch = item.district.toLowerCase().includes(q)
      return titleMatch || descMatch || tagMatch || districtMatch
    })
  }, [query, index, loaded])

  const categoryName = (slug: string) =>
    CONTENT_CATEGORIES.find((c) => c.slug === slug)?.name || slug

  const districtName = (slug: string) =>
    DISTRICTS.find((d) => d.slug === slug)?.name || slug

  return (
    <div>
      <div className="relative mb-6">
        <input
          type="search"
          placeholder="搜索学校名称、关键词…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full h-12 pl-4 pr-10 bg-white border border-border rounded-xl text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary/10 transition-all"
        />
        <svg
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {!loaded && (
        <p className="text-center text-text-muted py-8">加载搜索索引中…</p>
      )}

      {loaded && !query.trim() && (
        <p className="text-center text-text-muted py-8">输入关键词开始搜索</p>
      )}

      {loaded && query.trim() && results.length === 0 && (
        <p className="text-center text-text-muted py-8">
          没有找到与「{query}」相关的内容
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-text-muted mb-4">
            找到 {results.length} 条结果
          </p>
          {results.map((item) => (
            <Link
              key={`${item.category}-${item.slug}`}
              href={getHref(item)}
              className="block bg-white rounded-xl border border-border p-4 hover:shadow-md hover:border-primary-light transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {categoryName(item.category)}
                </span>
                {item.district && (
                  <span className="text-xs text-text-muted">
                    {districtName(item.district)}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1">
                {highlightMatch(item.title, query)}
              </h3>
              <p className="text-sm text-text-secondary line-clamp-2">
                {highlightMatch(item.description, query)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
