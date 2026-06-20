import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-lg text-text-secondary mb-8">
        抱歉，这个页面不存在。可能链接已失效或页面已更新。
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}
