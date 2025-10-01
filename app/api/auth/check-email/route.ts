import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const email =
      new URL(req.url).searchParams.get("email")?.toLowerCase() || "";
    if (!email) return NextResponse.json({ exists: false });
    const user = await prisma.user.findUnique({ where: { email } });
    return NextResponse.json({
      exists: !!user,
      hasPassword: Boolean(user?.passwordHash && user?.passwordHash.length > 0),
    });
  } catch (error) {
    console.error("Error in check-email route:", error);
    return NextResponse.json(
      { exists: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
