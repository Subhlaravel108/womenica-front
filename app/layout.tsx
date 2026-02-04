// import type { Metadata } from "next";
// import { Geist, Geist_Mono, Playfair_Display, Poppins } from "next/font/google";
// import { Suspense } from "react";
// import "./globals.css";
// import TopProgress from "@/components/TopProgress";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const playfairDisplay = Playfair_Display({
//   variable: "--font-display",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// const poppins = Poppins({
//   variable: "--font-body",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600"],
// });

// export const metadata: Metadata = {
//   title: "Womenica - Best Products for Women",
//   description: "Discover handpicked products for modern women. Shop sarees, fashion, beauty, kitchen essentials and more at amazing prices.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" style={{ colorScheme: 'light' }} suppressHydrationWarning>
//       <head>
//         <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-75XM89TQG8"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-75XM89TQG8');
// </script>
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${poppins.variable} antialiased`}
//         style={{ colorScheme: 'light' }}
//         suppressHydrationWarning
//       >
//         <Suspense fallback={null}>
//           <TopProgress />
//         </Suspense>
//         {children}
//       </body>
//     </html>
//   );
// }



import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Poppins } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
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
  description:
    "Discover handpicked products for modern women. Shop sarees, fashion, beauty, kitchen essentials and more at amazing prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-75XM89TQG8"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-75XM89TQG8');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${poppins.variable} antialiased`}
        style={{ colorScheme: "light" }}
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
