import type { Metadata } from "next"
import { Suspense } from "react"
import SearchClient from "./SearchClient"

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索北京升学指南站内的所有内容",
}

export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-2">搜索</h1>
      <p className="text-text-secondary mb-6">搜索站内的学校档案、择校指南、政策解读等所有内容</p>
      <Suspense fallback={<div className="text-center text-text-muted py-8">加载中…</div>}>
        <SearchClient />
      </Suspense>
    </div>
  )
}
