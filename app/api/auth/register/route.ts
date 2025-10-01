import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password || password.length < 6)
    return NextResponse.json(
      { ok: false, error: "Invalid input" },
      { status: 400 }
    );

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (existing)
    return NextResponse.json(
      { ok: false, error: "Account exists" },
      { status: 409 }
    );

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email: email.toLowerCase(), passwordHash },
  });
  return NextResponse.json({ ok: true });
}
