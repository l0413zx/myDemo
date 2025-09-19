"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, Search, Filter } from "lucide-react"
import { useEffect, useState } from "react";
async function getList(page: number, size: number) {
    const res = await fetch(`/api/user?page=${page}&size=${size}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    return res.json()
}
export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([])
    useEffect(() => {
        // 初始加载第一页，10条
        getList(1, 10).then((data) => {
            setUsers(data.data || [])
        })
    }, [])
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">用户管理</h1>
          <p className="text-muted-foreground mt-2">管理系统用户，查看用户信息和权限设置</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          添加用户
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>用户列表</span>
          </CardTitle>
          <CardDescription>系统中的所有用户信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索用户..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
          </div>

          <div className="space-y-4">
            {users.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{user.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/*<Badge variant="secondary">{user.role}</Badge>*/}
                  <Badge variant={user.status === "活跃" ? "default" : "destructive"}>{user.status }</Badge>
                  <Button variant="outline" size="sm">
                    编辑
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
