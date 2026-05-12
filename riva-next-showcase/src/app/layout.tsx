import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Riva Revenue Audit | Premium Experience",
  description: "Find exactly where your business is losing money with the Riva Revenue Audit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} antialiased selection:bg-riva-gold selection:text-riva-blue`}>
        {children}
      </body>
    </html>
  );
}
