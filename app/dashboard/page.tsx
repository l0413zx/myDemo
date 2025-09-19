import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, ShoppingCart, TrendingUp, Activity, DollarSign } from "lucide-react"

export default function HomePage() {
    return (
        <div className="space-y-6">
            {/* 页面标题 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-balance">欢迎回来</h1>
                    <p className="text-muted-foreground mt-2">这里是您的工作台概览，查看最新的业务数据和系统状态</p>
                </div>
                <Badge variant="secondary" className="text-sm">
                    系统运行正常
                </Badge>
            </div>

            {/* 数据卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">总收入</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">¥45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+20.1%</span> 较上月
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">用户数量</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2,350</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+180.1%</span> 较上月
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">订单数量</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+19%</span> 较上月
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+201</span> 较昨日
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* 功能区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5" />
                            <span>数据分析</span>
                        </CardTitle>
                        <CardDescription>查看详细的业务数据分析和趋势报告</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">销售额增长</span>
                                <span className="text-sm font-medium text-green-600">+12.5%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">用户增长</span>
                                <span className="text-sm font-medium text-green-600">+8.2%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">转化率</span>
                                <span className="text-sm font-medium text-blue-600">3.2%</span>
                            </div>
                            <Button className="w-full mt-4">查看详细报告</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <TrendingUp className="h-5 w-5" />
                            <span>快速操作</span>
                        </CardTitle>
                        <CardDescription>常用功能的快速入口</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                                <Users className="h-5 w-5" />
                                <span className="text-sm">用户管理</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="text-sm">订单管理</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                                <BarChart3 className="h-5 w-5" />
                                <span className="text-sm">数据分析</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                                <Activity className="h-5 w-5" />
                                <span className="text-sm">系统监控</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
