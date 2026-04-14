import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="ml-60 pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
