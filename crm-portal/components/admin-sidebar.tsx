"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Settings,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-8 bottom-0 w-60 bg-[#0f172a] flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-amber-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-slate-900" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">RIVA</div>
            <div className="text-amber-400 text-[10px] uppercase tracking-widest">Strategies</div>
          </div>
        </div>
        <p className="text-slate-500 text-[10px] mt-2 leading-tight">We Build Valuable Companies</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin/dashboard" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-amber-400 text-slate-900"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="text-slate-500 text-[10px]">Demo Mode · No Auth Required</div>
      </div>
    </aside>
  );
}
