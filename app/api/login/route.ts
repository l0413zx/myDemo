import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { decryptAES } from "@/utils/encrypt"; // 引入封装方法

export async function POST(req: Request) {
    try {
        const { email, password: encryptedPassword } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ error: "用户不存在" }, { status: 401 });
        }

        const decryptedPassword = decryptAES(encryptedPassword);

        const isValid = await bcrypt.compare(decryptedPassword, user.password);

        if (!isValid) {
            return NextResponse.json({ error: "密码错误" }, { status: 401 });
        }

        return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error("登录接口错误：", err);
        return NextResponse.json({ error: "登录失败" }, { status: 500 });
    }
}