import { client, engagement, documents, messages } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, BarChart2, BookOpen, Download, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

const docIcon: Record<string, React.ReactNode> = {
  SOP: <BookOpen className="w-5 h-5 text-blue-500" />,
  Roadmap: <BarChart2 className="w-5 h-5 text-purple-500" />,
  Report: <FileText className="w-5 h-5 text-emerald-500" />,
};

export default function PortalDashboard() {
  const completedMilestones = engagement.milestones.filter((m) => m.status === "complete").length;
  const progress = Math.round((completedMilestones / engagement.milestones.length) * 100);
  const nextMilestone = engagement.milestones.find((m) => m.status !== "complete");
  const unreadMessage = messages[0];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#1c1917] rounded-2xl px-8 py-7 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fdf6e3]">Welcome back, {client.name} 🤠</h1>
          <p className="text-stone-400 text-sm mt-1">{client.industry} · {client.concepts.join(" & ")}</p>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-stone-400 text-xs">Client since</div>
          <div className="text-[#fdf6e3] font-semibold text-sm">{engagement.startDate}</div>
        </div>
      </div>

      {/* Unread message banner */}
      <div className="bg-red-700 rounded-xl px-5 py-4 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-white shrink-0" />
          <span className="text-sm text-white font-medium">
            📬 New message from your Riva team
          </span>
          <span className="text-red-200 text-sm truncate hidden sm:block">&ldquo;{unreadMessage.body.slice(0, 60)}…&rdquo;</span>
        </div>
        <Link href="/portal/messages">
          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent text-xs shrink-0">
            View <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Active Engagement */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#1c1917]">Active Engagement</h2>
          <Link href="/portal/milestones">
            <Button variant="ghost" size="sm" className="text-xs text-stone-500 hover:text-[#b91c1c] gap-1">
              View milestones <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
        <Card className="border-stone-200 shadow-sm bg-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{engagement.pillarEmoji}</span>
              <div>
                <h3 className="font-bold text-[#1c1917]">{engagement.servicePillar}</h3>
                <p className="text-xs text-stone-400">Started {engagement.startDate}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-500">
                <span>{completedMilestones} of {engagement.milestones.length} milestones complete</span>
                <span className="font-semibold text-red-700">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2.5 bg-stone-100 [&>div]:bg-[#b91c1c]" />
            </div>
            {nextMilestone && (
              <div className="bg-stone-50 rounded-xl px-4 py-3 flex items-center gap-3 border border-stone-100">
                <span className="text-lg">🔄</span>
                <div>
                  <div className="text-sm font-semibold text-[#1c1917]">{nextMilestone.name}</div>
                  <div className="text-xs text-stone-400">Due {nextMilestone.dueDate}</div>
                </div>
                <Badge variant="blue" className="ml-auto text-[10px]">In Progress</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Documents */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#1c1917]">Recent Documents</h2>
          <Link href="/portal/documents">
            <Button variant="ghost" size="sm" className="text-xs text-stone-500 hover:text-[#b91c1c] gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="border-stone-200 shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-stone-50 flex items-center justify-center">
                    {docIcon[doc.category]}
                  </div>
                  <Badge variant={doc.category === "SOP" ? "blue" : doc.category === "Roadmap" ? "purple" : "success"} className="text-[10px]">
                    {doc.category}
                  </Badge>
                </div>
                <div>
                  <div className="font-semibold text-[#1c1917] text-sm leading-snug">{doc.title}</div>
                  <div className="text-xs text-stone-400 mt-0.5">{doc.date}</div>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2 text-xs border-stone-200 text-stone-600 hover:border-[#b91c1c] hover:text-[#b91c1c] mt-auto">
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
