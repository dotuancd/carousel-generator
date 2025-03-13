import "./globals.css";
import "./fonts.css";
// import type { Metadata } from "next";


import { Toaster } from "../components/ui/toaster";

import { SiteFooter } from "../components/site-footer";

export const metadata = {
  // ...(process.env.NEXT_PUBLIC_APP_URL && {
  //   metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  // }),
  title: "Carousel Generator",
  description: "An open source carousel maker for LinkedIn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen items-stretch justify-between antialiased`}
      >
        <div className="flex-1 h-full flex flex-col justify-stretch ">
          {children}
        </div>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
