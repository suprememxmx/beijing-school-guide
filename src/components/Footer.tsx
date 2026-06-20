import { SITE_NAME } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            本站信息仅供参考，不构成任何择校建议。入学政策请以各区教委官方发布为准。
          </p>
        </div>
      </div>
    </footer>
  )
}
