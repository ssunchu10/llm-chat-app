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

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (!user)
    return NextResponse.json(
      { ok: false, error: "No account" },
      { status: 404 }
    );

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { email: email.toLowerCase() },
    data: { passwordHash },
  });
  return NextResponse.json({ ok: true });
}
