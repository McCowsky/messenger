import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/libs/email";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword: string = await bcrypt.hash(password, 12);
  const EMAIL_VERIFICATION_SECRET = "EMAIL_VERIFICATION_SECRET";

  const user: User = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  const { id, email: returnedEmail } = user;
  const payload = { id, returnedEmail };

  const token: string = jwt.sign({ payload }, EMAIL_VERIFICATION_SECRET + email, {
    expiresIn: "1d",
  });

  await sendEmail({
    to: email,
    subject: "Messemger account verification",
    html: `<a href="http://localhost:3000/api/verifyemail?token=${token}&email=${email}">Verification link</a>`,
  });

  return NextResponse.json(user);
}
