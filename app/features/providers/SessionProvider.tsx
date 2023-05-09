"use client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

interface NextSessionProviderProps {
  children?: React.ReactNode;
  appProps?: AppProps;
}

function NextSessionProvider({ children, appProps }: NextSessionProviderProps) {
  return (
    <SessionProvider session={appProps?.pageProps.session}>{children}</SessionProvider>
  );
}

export default NextSessionProvider;
