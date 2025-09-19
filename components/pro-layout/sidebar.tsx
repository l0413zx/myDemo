"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  ShoppingCart,
  Calendar,
  Mail,
} from "lucide-react"

interface MenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "首页",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "数据分析",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "用户管理",
    href: "/users",
    icon: Users,
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo区域 */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">ProLayout</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0 hover:bg-sidebar-accent">
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
          )}
        </Button>
      </div>

      {/* 菜单区域 */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground",
                  collapsed && "justify-center",
                )}
              >
                <Icon className={cn("h-4 w-4 flex-shrink-0", collapsed && "h-5 w-5")} />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
