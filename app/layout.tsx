import "./globals.css";
import { Nunito } from "next/font/google";
const font = Nunito({ subsets: ["latin"] });
import QueryProvider from "./features/providers/QueryProvider";
import ToasterProvider from "./features/providers/ToasterProvider";
import NextSessionProvider from "./features/providers/SessionProvider";
export const metadata = {
  title: "Messenger",
  description: "Messenger clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>
          <ToasterProvider />
          <NextSessionProvider>
            <div className=" min-h-screen max-w-[375px]  mx-auto my-0 flex flex-col items-center justify-center ">
              {children}
            </div>
          </NextSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
