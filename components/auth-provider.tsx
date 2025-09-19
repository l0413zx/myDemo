"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
    id: string
    email: string
    name: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (email === "admin@example.com" && password === "password") {
            const userData = {
                id: "1",
                email: email,
                name: "Admin User",
            }
            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
            return true
        }
        return false
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        return {
            user: null,
            login: async () => false,
            logout: () => {},
            isLoading: false,
        }
    }
    return context
}
