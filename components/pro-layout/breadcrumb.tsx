"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  title: string
  href?: string
}

const pathMap: Record<string, string> = {
  "/dashboard": "首页",
  "/analytics": "数据分析",
  "/users": "用户管理",
  "/settings": "系统设置",
}

export function Breadcrumb() {
  const pathname = usePathname()

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ title: "首页", href: "/" }]

    if (pathname !== "/") {
      let currentPath = ""
      paths.forEach((path) => {
        currentPath += `/${path}`
        const title = pathMap[currentPath] || path
        breadcrumbs.push({
          title,
          href: currentPath,
        })
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground px-6 py-3 border-b border-border bg-muted/30">
      <Home className="h-4 w-4" />
      {breadcrumbs.map((item, index) => (
        <div key={item.href || item.title} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-foreground">{item.title}</span>
          ) : (
            <Link href={item.href!} className="hover:text-foreground transition-colors">
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
