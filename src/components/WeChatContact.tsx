"use client"

import { useState } from "react"

export default function WeChatContact() {
  const [copied, setCopied] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const wechatId = "primaming"

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed right-4 bottom-24 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all flex items-center justify-center"
        aria-label="联系我"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Popup panel */}
      {showPanel && (
        <div className="fixed right-4 bottom-40 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-border p-5 animate-in slide-in-from-bottom-2">
          {/* Close button */}
          <button
            onClick={() => setShowPanel(false)}
            className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors"
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
              <h3 className="text-sm font-semibold text-text-primary">北京升学指南</h3>
              <p className="text-xs text-text-muted">择校问题一对一交流</p>
            </div>
          </div>

          <p className="text-sm text-text-secondary mb-4 leading-relaxed">
            每个家庭的情况都不一样。加我微信，帮你分析最适合的择校方案。
          </p>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-surface-secondary rounded-lg px-3 py-2 text-sm font-mono text-text-primary select-all text-center">
              {wechatId}
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {copied ? "✓" : "复制"}
            </button>
          </div>
          <p className="text-xs text-text-muted text-center">
            复制微信号 → 打开微信添加
          </p>
        </div>
      )}
    </>
  )
}
