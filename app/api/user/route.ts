import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const size = parseInt(searchParams.get("size") || "10", 10);
        const name = searchParams.get("name") || "";

        const skip = (page - 1) * size;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where: name ? { name: { contains: name } } : {},
                skip,
                take: size,
                orderBy: { id: "desc" }
            }).then(users => users.map(({ password, ...rest }) => rest)),
            prisma.user.count({
                where: name ? { name: { contains: name } } : {}
            })
        ]);
        return NextResponse.json({
            data: users,
            total,
            page,
            size
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "查询失败" }, { status: 500 });
    }
}