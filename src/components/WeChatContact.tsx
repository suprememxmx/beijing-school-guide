"use client"

import { useState } from "react"

export default function WeChatContact() {
  const [copied, setCopied] = useState(false)

  const wechatId = "primaming"
  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border p-6">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-text-primary mb-1">
            需要个性化的择校建议？
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            每个家庭的情况都不一样——非京籍怎么办、海淀和西城怎么选、学区房值不值得买……加我微信一对一沟通，帮你分析最适合的择校方案。
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white border border-border rounded-lg px-3 py-2 text-sm font-mono text-text-primary select-all">
              {wechatId}
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {copied ? "已复制 ✓" : "复制微信号"}
            </button>
          </div>
          <p className="text-xs text-text-muted mt-2">
            复制微信号 → 打开微信 → 添加好友 → 粘贴搜索
          </p>
        </div>
      </div>
    </div>
  )
}
