"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter } from "next/navigation"
import { ProLayout } from "./pro-layout/pro-layout"

interface LayoutWrapperProps {
    children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (!user && pathname !== "/login" && pathname !== "/register") {
            router.replace("/login")
        } else {
            setIsAuthChecked(true)
        }
    }, [pathname, router])

    const isLoginPage = pathname === "/login" || pathname === "/register"

    if (!isAuthChecked && !isLoginPage) {
        // 等待 token 检查完成前显示全屏 loading
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }

    if (isLoginPage) {
        return <>{children}</>
    }

    return <ProLayout>{children}</ProLayout>
}
