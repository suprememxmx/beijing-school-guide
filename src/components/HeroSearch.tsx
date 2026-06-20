"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HeroSearch() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="search"
          placeholder="搜索学校名称、关键词…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 pl-5 pr-12 bg-white border border-border rounded-xl text-base text-text-primary placeholder:text-text-muted shadow-sm focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary/10 transition-all"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          搜索
        </button>
      </div>
    </form>
  )
}
