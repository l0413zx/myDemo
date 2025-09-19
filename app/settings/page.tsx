"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { User, Shield, Camera } from "lucide-react"

export default function SettingsPage() {
    const [profile, setProfile] = useState({
        name: "张三",
        email: "zhangsan@example.com",
        phone: "+86 138 0013 8000",
        bio: "产品经理，专注于用户体验设计和产品策略。",
        location: "北京, 中国",
        website: "https://zhangsan.dev",
    })

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        marketing: false,
        security: true,
    })

    const [security, setSecurity] = useState({
        twoFactor: true,
        loginAlerts: true,
        sessionTimeout: "30",
    })

    const handleSave = () => {
        // 这里处理保存逻辑
        console.log("Settings saved")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
                <p className="text-muted-foreground">管理您的账户设置</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        个人资料
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        安全设置
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>个人信息</CardTitle>
                            <CardDescription>更新您的个人资料信息，这些信息将在您的个人资料页面显示。</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/professional-headshot.png" />
                                    <AvatarFallback className="text-lg">张三</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                                        <Camera className="h-4 w-4" />
                                        更换头像
                                    </Button>
                                    <p className="text-sm text-muted-foreground">推荐使用 400x400 像素的正方形图片</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">姓名</Label>
                                    <Input
                                        id="name"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">邮箱</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">手机号</Label>
                                    <Input
                                        id="phone"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">所在地</Label>
                                    <Input
                                        id="location"
                                        value={profile.location}
                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">个人网站</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    value={profile.website}
                                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">个人简介</Label>
                                <Textarea
                                    id="bio"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    rows={3}
                                />
                                <p className="text-sm text-muted-foreground">简要介绍您的背景和专业领域</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>密码设置</CardTitle>
                            <CardDescription>定期更新密码以保护您的账户安全。</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">当前密码</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">新密码</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">确认新密码</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                            <Button>更新密码</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="space-y-4">
                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label>登录提醒</Label>
                                    <p className="text-sm text-muted-foreground">新设备登录时发送邮件通知</p>
                                </div>
                                <Switch
                                    checked={security.loginAlerts}
                                    onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
                <Button variant="outline">取消</Button>
                <Button onClick={handleSave}>保存设置</Button>
            </div>
        </div>
    )
}
