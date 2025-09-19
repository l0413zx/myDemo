"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail, Shield, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { encryptAES } from "@/utils/encrypt";
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [loginStatus, setLoginStatus] = useState<"idle" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginStatus("idle")
        setErrorMessage("")

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email, password: encryptAES(formData.password) }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/dashboard");
        } else {
            setLoginStatus('error')
            setErrorMessage(data.error)
        }

        setIsLoading(false);
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
            <div className="w-full max-w-md space-y-6">
                {/* Logo and Brand */}
                <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">欢迎回来</h1>
                    <p className="text-muted-foreground">登录您的账户以继续</p>
                </div>

                {/* Login Form */}
                <Card className="border-border/50 shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl text-center">登录</CardTitle>
                    </CardHeader>
                    {loginStatus === "success" && (
                        <Alert className="mb-4 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertDescription className="text-green-800 dark:text-green-200">
                                登录成功！正在跳转到主页面...
                            </AlertDescription>
                        </Alert>
                    )}

                    {loginStatus === "error" && (
                        <Alert className="mb-4 text-center border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            <AlertDescription className="text-red-800 dark:text-red-200">{errorMessage}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">邮箱地址</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">密码</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="输入您的密码"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formData.rememberMe}
                                        onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                                    />
                                    <Label htmlFor="remember" className="text-sm font-normal">
                                        记住我
                                    </Label>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "登录中..." : "登录"}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                还没有账户？{" "}
                                <Link href="/register" className="text-primary hover:underline">
                                    立即注册
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                {/* Additional Options */}
                {/*<div className="text-center">*/}
                {/*    <div className="relative">*/}
                {/*        <div className="absolute inset-0 flex items-center">*/}
                {/*            <span className="w-full border-t border-border" />*/}
                {/*        </div>*/}
                {/*        <div className="relative flex justify-center text-xs uppercase">*/}
                {/*            <span className="bg-background px-2 text-muted-foreground">或者</span>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="mt-4 grid grid-cols-2 gap-3">*/}
                {/*        <Button variant="outline" className="w-full bg-transparent">*/}
                {/*            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">*/}
                {/*                <path*/}
                {/*                    fill="currentColor"*/}
                {/*                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"*/}
                {/*                />*/}
                {/*                <path*/}
                {/*                    fill="currentColor"*/}
                {/*                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"*/}
                {/*                />*/}
                {/*                <path*/}
                {/*                    fill="currentColor"*/}
                {/*                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"*/}
                {/*                />*/}
                {/*                <path*/}
                {/*                    fill="currentColor"*/}
                {/*                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"*/}
                {/*                />*/}
                {/*            </svg>*/}
                {/*            Google*/}
                {/*        </Button>*/}
                {/*        <Button variant="outline" className="w-full bg-transparent">*/}
                {/*            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">*/}
                {/*                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />*/}
                {/*            </svg>*/}
                {/*            GitHub*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Footer */}
                <div className="text-center text-xs text-muted-foreground">
                    <p>
                        登录即表示您同意我们的{" "}
                        <Link href="/terms" className="hover:underline">
                            服务条款
                        </Link>{" "}
                        和{" "}
                        <Link href="/privacy" className="hover:underline">
                            隐私政策
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
