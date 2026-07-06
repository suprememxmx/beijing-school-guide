"use client"

import { useState } from "react"

export default function WeChatContact() {
  const [copied, setCopied] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const wechatId = "primaming"

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  const copyBtn = (
    <button
      onClick={handleCopy}
      className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
    >
      {copied ? "已复制 ✓" : "复制微信号"}
    </button>
  )

  return (
    <>
      {/* Desktop: fixed right sidebar - hidden on mobile */}
      <div className="hidden lg:block fixed right-[calc(50%-760px)] top-48 z-40 w-56">
        <div className="bg-white rounded-2xl border border-border shadow-lg p-5">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">北京升学指南</p>
              <p className="text-xs text-text-muted">择校咨询</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            每个家庭情况不同，加我微信帮你分析最适合的择校方案。
          </p>
          <div className="bg-surface-secondary rounded-xl p-3 text-center mb-3">
            <p className="text-xs text-text-muted mb-1">微信号</p>
            <p className="text-sm font-mono font-semibold text-primary select-all">{wechatId}</p>
          </div>
          {copyBtn}
          <p className="text-xs text-text-muted text-center mt-2">复制 → 打开微信添加</p>
        </div>
      </div>

      {/* Mobile: floating button + popup - only on small screens */}
      <div className="lg:hidden fixed right-4 bottom-6 z-50">
        {/* Popup panel */}
        {showPopup && (
          <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-border p-5">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-text-muted hover:text-text-primary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">北京升学指南</p>
                <p className="text-xs text-text-muted">择校咨询</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              每个家庭情况不同，加我微信帮你分析最适合的择校方案。
            </p>
            <div className="bg-surface-secondary rounded-xl p-3 text-center mb-3">
              <p className="text-xs text-text-muted mb-1">微信号</p>
              <p className="text-sm font-mono font-semibold text-primary select-all">{wechatId}</p>
            </div>
            {copyBtn}
            <p className="text-xs text-text-muted text-center mt-2">复制 → 打开微信添加</p>
          </div>
        )}

        {/* Floating button */}
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </>
  )
}
