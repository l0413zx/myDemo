import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "缺少必要参数" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "邮箱已被注册" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "注册失败" }, { status: 500 });
    }
}
