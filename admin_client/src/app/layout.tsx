import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import env from "@/env";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from 'sonner'
import LayoutWithSidebar from "@/components/layout-with-sidebar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ShopYangu",
  description: "ShopYangu is an e-commerce platform connecting users with diverse shops and products, offering a seamless and secure shopping experience.",
};

export default function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{[key: string]: string}>
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWithSidebar params={params}>{children}</LayoutWithSidebar>
        <Toaster 
          position="bottom-right"
          richColors 
          expand={true}
          duration={4000}
          closeButton
        />
      </body>
      {env.NEXT_PUBLIC.ENABLE_VERCEL_SPEED_INSIGHTS && <SpeedInsights/>}
      {env.NEXT_PUBLIC.ENABLE_VERCEL_ANALYTICS && <Analytics/>}

    </html>
  );
}