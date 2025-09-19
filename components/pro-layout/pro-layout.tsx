"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Breadcrumb } from "./breadcrumb"

interface ProLayoutProps {
  children: React.ReactNode
}

export function ProLayout({ children }: ProLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* 侧边栏 */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* 移动端遮罩 */}
      {isMobile && !sidebarCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarCollapsed(true)} />
      )}

      {/* 主内容区域 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 顶部导航 */}
        <Header />

        {/* 面包屑 */}
        <Breadcrumb />

        {/* 页面内容 */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
