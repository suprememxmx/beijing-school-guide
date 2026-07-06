import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WeChatContact from "@/components/WeChatContact"
import "./globals.css"
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants"

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  other: {
    "baidu-site-verification": "codeva-BJIOr6eAcA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <section className="max-w-5xl mx-auto px-4 py-8">
          <WeChatContact />
        </section>
        <Footer />
        {/* Baidu auto-push for SEO */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var bp = document.createElement('script');
                bp.src = '//push.zhanzhang.baidu.com/push.js';
                bp.async = true;
                document.head.appendChild(bp);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
