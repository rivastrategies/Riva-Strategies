"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DemoSwitcher() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isPortal = pathname?.startsWith("/portal");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 bg-slate-900 text-white text-xs py-2 px-4 shadow-md">
      <span className="font-medium text-slate-300">👁 Demo Mode — Viewing as:</span>
      <Link
        href="/admin/dashboard"
        className={cn(
          "flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition-all",
          isAdmin
            ? "bg-amber-400 text-slate-900"
            : "bg-slate-700 text-slate-200 hover:bg-slate-600"
        )}
      >
        ⚙️ Riva Admin
      </Link>
      <Link
        href="/portal/dashboard"
        className={cn(
          "flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition-all",
          isPortal
            ? "bg-red-600 text-white"
            : "bg-slate-700 text-slate-200 hover:bg-slate-600"
        )}
      >
        🍖 Red River Portal
      </Link>
    </div>
  );
}
