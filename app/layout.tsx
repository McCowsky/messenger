import "./globals.css";
import { Nunito } from "next/font/google";
import QueryProvider from "./features/providers/QueryProvider";
import ToasterProvider from "./features/providers/ToasterProvider";
import NextSessionProvider from "./features/providers/SessionProvider";
import { NextFont } from "next/dist/compiled/@next/font";
export const metadata = {
  title: "Messenger",
  description: "Messenger clone",
};

const font: NextFont = Nunito({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>
          <NextSessionProvider>
            <ToasterProvider />
            <div className=" min-h-screen max-w-[375px]  mx-auto my-0 flex flex-col items-center justify-center ">
              {children}
            </div>
          </NextSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
