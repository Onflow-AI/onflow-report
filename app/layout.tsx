import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Onflow - UX Testing Report",
  description: "Comprehensive user experience testing and analysis reports powered by AI",
  keywords: ["UX testing", "user experience", "AI testing", "usability analysis"],
  authors: [{ name: "Onflow" }],
  openGraph: {
    title: "Onflow - UX Testing Report",
    description: "Comprehensive user experience testing and analysis reports powered by AI",
    siteName: "Onflow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onflow - UX Testing Report",
    description: "Comprehensive user experience testing and analysis reports powered by AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
