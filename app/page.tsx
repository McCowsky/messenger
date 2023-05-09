"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      setTimeout(() => {
        router.push("/account/dashboard");
      }, 400);
    }
    if (session.status === "unauthenticated") {
      setTimeout(() => {
        router.push("/account/login");
      }, 400);
    }
  }, [session.status, router]);
}
