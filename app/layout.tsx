import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import TopProgress from "@/components/TopProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Womenica - Best Products for Women",
  description: "Discover handpicked products for modern women. Shop sarees, fashion, beauty, kitchen essentials and more at amazing prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${poppins.variable} antialiased`}
        style={{ colorScheme: 'light' }}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <TopProgress />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
