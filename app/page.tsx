"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (session.status === "unauthenticated") redirect("/account/login");
  if (session.status === "authenticated") redirect("/account/dashboard");
}
