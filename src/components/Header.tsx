import Link from "next/link"
import { SITE_NAME, STAGES, CONTENT_CATEGORIES } from "@/lib/constants"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold text-primary hover:text-primary-dark transition-colors shrink-0">
          {SITE_NAME}
        </Link>

        {/* Stage tabs */}
        <div className="hidden sm:flex items-center gap-1 bg-surface-secondary rounded-lg p-1">
          {STAGES.map((stage) => (
            <Link
              key={stage.slug}
              href={`/stage/${stage.slug}`}
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all ${
                stage.active
                  ? "bg-white text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {stage.name}
              {!stage.active && <span className="ml-1 text-xs opacity-50">─</span>}
            </Link>
          ))}
        </div>

        {/* Category links (desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {CONTENT_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "schools" ? "/schools" : `/category/${cat.slug}`}
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/search"
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label="搜索"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu */}
        <details className="sm:hidden">
          <summary className="list-none cursor-pointer p-2 text-text-secondary hover:text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-border shadow-lg p-4 flex flex-col gap-3">
            {/* Mobile stage links */}
            <div className="flex gap-2 pb-3 border-b border-border">
              {STAGES.map((stage) => (
                <Link
                  key={stage.slug}
                  href={`/stage/${stage.slug}`}
                  className={`text-sm font-medium px-3 py-1.5 rounded-md ${
                    stage.active
                      ? "bg-primary text-white"
                      : "bg-surface-secondary text-text-muted"
                  }`}
                >
                  {stage.name}
                </Link>
              ))}
            </div>
            {CONTENT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug === "schools" ? "/schools" : `/category/${cat.slug}`}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/search"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors border-t border-border pt-3 mt-1"
            >
              搜索 🔍
            </Link>
          </div>
        </details>
      </nav>
    </header>
  )
}
