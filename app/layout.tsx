import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Suspense } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper";

export const metadata: Metadata = {
  title: "ProLayout - 专业后台管理系统",
  description: "基于Next.js 15.5.3构建的专业后台管理布局",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
              <LayoutWrapper>{children}</LayoutWrapper>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
