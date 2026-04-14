import { client } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminClientsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-500 text-sm mt-1">1 active client engagement</p>
        </div>
        <Button size="sm" className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs">
          + New Client
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <div className="col-span-4">Company</div>
          <div className="col-span-2">Industry</div>
          <div className="col-span-2">Service</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">MRR</div>
          <div className="col-span-1"></div>
        </div>

        {/* Single client row */}
        <CardContent className="p-0">
          <Link href="/admin/clients/red-river">
            <div className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-amber-50/40 transition-colors border-b border-slate-50 cursor-pointer group">
              {/* Company */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  RR
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{client.name}</div>
                  <div className="text-xs text-slate-400">{client.website}</div>
                </div>
              </div>

              {/* Industry */}
              <div className="col-span-2">
                <Badge variant="amber">{client.industry}</Badge>
              </div>

              {/* Service */}
              <div className="col-span-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  Revenue Systems
                </div>
              </div>

              {/* Status */}
              <div className="col-span-1">
                <Badge variant="success">{client.status}</Badge>
              </div>

              {/* MRR */}
              <div className="col-span-2">
                <span className="text-sm font-bold text-emerald-600">${client.mrr.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span></span>
              </div>

              {/* Action */}
              <div className="col-span-1 flex justify-end">
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
