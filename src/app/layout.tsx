import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ReduxProvider } from "./redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Universe",
  description: "Universe | Where students grow",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <Toaster/>
        </ReduxProvider>
      </body>
    </html>
  );
}
