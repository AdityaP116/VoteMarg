import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans"
});

export const metadata: Metadata = {
  title: "Maharashtra Election Assistant",
  description:
    "Check voting eligibility, registration status, and next steps for Maharashtra elections.",
  other: {
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' data: https://maps.googleapis.com https://*.google.com; frame-src https://*.google.com; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
  }
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
        {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
      </body>
    </html>
  );
}
