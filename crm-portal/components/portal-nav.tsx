"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { href: "/portal/dashboard", label: "Dashboard" },
  { href: "/portal/milestones", label: "Milestones" },
  { href: "/portal/documents", label: "Documents" },
  { href: "/portal/messages", label: "Messages" },
];

export function PortalNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-8 left-0 right-0 z-40 bg-[#1c1917] border-b border-stone-700/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="https://rivastrategies.com/red-river-cadence/red-river-logo.png"
            alt="Red River Restaurants"
            width={36}
            height={36}
            className="rounded object-contain"
            unoptimized
          />
          <span className="text-[#fdf6e3] font-bold text-sm tracking-wide">Red River Restaurants</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1">
          {navItems.map(({ href, label }) => {
            const active = pathname === href || pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                  active
                    ? "bg-[#b91c1c] text-white"
                    : "text-stone-400 hover:text-[#fdf6e3] hover:bg-white/5"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
