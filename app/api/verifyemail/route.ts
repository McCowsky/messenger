import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../../libs/prismadb";

export async function GET(req: NextRequest) {
  const token: string | null = req.nextUrl.searchParams.get("token");
  const email: string | null = req.nextUrl.searchParams.get("email");
  if (email === null || token === null) return NextResponse.json("Wrong url");
  const EMAIL_VERIFICATION_SECRET = "EMAIL_VERIFICATION_SECRET";

  const isValid: boolean = await new Promise((resolve) => {
    jwt.verify(token, EMAIL_VERIFICATION_SECRET + email, (err) => {
      if (err) resolve(false);
      if (!err) resolve(true);
    });
  });

  if (!isValid) return NextResponse.json("Token not valid");

  await prisma.user.update({
    where: { email: email },
    data: { emailVerified: new Date() },
  });
  return NextResponse.json("Email verified");
}
