"use client";
import { SessionProvider } from "next-auth/react";

function NextSessionProvider({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextSessionProvider;
