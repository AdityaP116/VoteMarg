import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans"
});

export const metadata: Metadata = {
  title: "Maharashtra Election Assistant",
  description:
    "Check voting eligibility, registration status, and next steps for Maharashtra elections."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
