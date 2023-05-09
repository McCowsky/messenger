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

  const user: User = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  const { id, email: returnedEmail } = user;
  if (id === null || returnedEmail === null)
    return NextResponse.json("Something went wrong");

  const payload: {
    id: string;
    returnedEmail: string;
  } = { id, returnedEmail };

  const token: string = jwt.sign(
    { payload },
    process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_SECRET + email,
    {
      expiresIn: "1d",
    }
  );

  await sendEmail({
    to: email,
    subject: "Messemger account verification",
    html: `<a href="http://localhost:3000/api/verifyemail?token=${token}&email=${email}">Verification link</a>`,
  });

  return NextResponse.json(user);
}
