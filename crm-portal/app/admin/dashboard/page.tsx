import { client, tasks, activityFeed, engagement } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, CheckSquare, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active Clients", value: "1", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "MRR", value: "$3,200/mo", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Open Tasks", value: "3", icon: CheckSquare, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Unread Messages", value: "1", icon: MessageSquare, color: "text-rose-600", bg: "bg-rose-50" },
];

const priorityColor: Record<string, string> = {
  High: "destructive",
  Medium: "warning",
  Low: "secondary",
};

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back — here&apos;s what&apos;s happening at Riva.</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pipeline Board */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800">Client Pipeline</h2>
            <Link href="/admin/clients">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {/* Board column */}
          <div className="bg-slate-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active</span>
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">1</span>
            </div>
            {/* Pipeline Card */}
            <Link href="/admin/clients/red-river">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-amber-200 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{client.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="amber">{client.industry}</Badge>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">${client.mrr.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs text-slate-500">{engagement.pillarEmoji} {engagement.servicePillar}</span>
                  <span className="text-xs text-slate-300 mx-1">·</span>
                  <span className="text-xs text-slate-500">{client.locations.length} locations</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Tasks */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-800">Open Tasks</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border-2 border-slate-200 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-slate-800">{task.title}</div>
                      <div className="text-xs text-slate-400">{task.client} · Due {task.dueDate}</div>
                    </div>
                  </div>
                  <Badge variant={priorityColor[task.priority] as "destructive" | "warning" | "secondary"} className="text-[10px]">
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-800">Recent Activity</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {activityFeed.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 px-5 py-4 ${idx < activityFeed.length - 1 ? "border-b border-slate-50" : ""}`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">{item.text}</p>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">{item.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
