import type { Metadata } from "next";
import "./globals.css";
import { DemoSwitcher } from "@/components/demo-switcher";

export const metadata: Metadata = {
  title: "Riva CRM — Demo",
  description: "Riva Strategies CRM & Client Portal — Demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DemoSwitcher />
        {children}
      </body>
    </html>
  );
}
