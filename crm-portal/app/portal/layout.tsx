import { PortalNav } from "@/components/portal-nav";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fdf6e3]">
      <PortalNav />
      <main className="pt-[calc(2rem+3.5rem)] min-h-screen">
        {children}
      </main>
    </div>
  );
}
