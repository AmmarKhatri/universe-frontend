import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ReduxProvider } from "./redux/ReduxProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
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
          <PersistGate loading={null} persistor={persistor}>
          {children}
          <Toaster/>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  );
}
