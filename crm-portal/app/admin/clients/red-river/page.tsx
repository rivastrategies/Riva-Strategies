import { client, engagement, documents, messages } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Globe,
  Mail,
  Wrench,
  ArrowLeft,
  Download,
  FileText,
  BarChart2,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

const docIcon: Record<string, React.ReactNode> = {
  SOP: <BookOpen className="w-5 h-5 text-blue-500" />,
  Roadmap: <BarChart2 className="w-5 h-5 text-purple-500" />,
  Report: <FileText className="w-5 h-5 text-emerald-500" />,
};

const milestoneStatus = {
  complete: { icon: "✅", badge: "success" as const },
  "in-progress": { icon: "🔄", badge: "blue" as const },
  upcoming: { icon: "🔜", badge: "secondary" as const },
};

export default function RedRiverClientPage() {
  const completedMilestones = engagement.milestones.filter((m) => m.status === "complete").length;
  const progress = Math.round((completedMilestones / engagement.milestones.length) * 100);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/admin/clients" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Clients
      </Link>

      {/* Client Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white font-extrabold text-xl shrink-0">
              RR
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
                <Badge variant="amber">{client.industry}</Badge>
                <Badge variant="success">{client.status}</Badge>
              </div>
              {/* Contact row */}
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                  {client.contactName} — {client.contactEmail}
                </span>
                <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-blue-500 hover:underline">
                  <Globe className="w-3.5 h-3.5" />
                  {client.website}
                </a>
              </div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-3xl font-bold text-emerald-600">${client.mrr.toLocaleString()}<span className="text-sm font-normal text-slate-400">/mo</span></div>
            <div className="text-xs text-slate-400 mt-0.5">Monthly Retainer</div>
            <div className="text-xs text-slate-400 mt-1">Since {engagement.startDate}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="bg-white border border-slate-100 shadow-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagements">Engagements</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Locations */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" /> Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {client.locations.map((loc) => (
                  <div key={loc.name} className="flex items-center justify-between py-1.5 text-sm border-b border-slate-50 last:border-0">
                    <div>
                      <div className="font-medium text-slate-800">{loc.name}</div>
                    </div>
                    {loc.type === "flagship" && <Badge variant="amber" className="text-[10px]">Flagship</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tools */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-slate-400" /> Tools & Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {client.tools.map((tool) => (
                  <div key={tool} className="flex items-center gap-2 text-sm text-slate-600 py-1.5 border-b border-slate-50 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    {tool}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">Client Notes</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-slate-600 leading-relaxed">{client.notes}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ENGAGEMENTS */}
        <TabsContent value="engagements" className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-5">
              {/* Engagement Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{engagement.pillarEmoji}</span>
                    <h3 className="font-bold text-slate-900">{engagement.servicePillar}</h3>
                    <Badge variant="blue">Active</Badge>
                  </div>
                  <p className="text-xs text-slate-400">Started {engagement.startDate}</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  {completedMilestones} of {engagement.milestones.length} milestones
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Engagement Progress</span>
                  <span className="font-semibold text-emerald-600">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2.5" />
              </div>

              <Separator />

              {/* Milestones */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Milestones</h4>
                {engagement.milestones.map((m) => {
                  const { icon, badge } = milestoneStatus[m.status];
                  return (
                    <div key={m.id} className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-base">{icon}</span>
                        <div>
                          <div className="text-sm font-medium text-slate-800">{m.name}</div>
                          <div className="text-xs text-slate-400">Due {m.dueDate}</div>
                        </div>
                      </div>
                      <Badge variant={badge}>{m.status === "in-progress" ? "In Progress" : m.status === "complete" ? "Complete" : "Upcoming"}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DOCUMENTS */}
        <TabsContent value="documents" className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                      {docIcon[doc.category]}
                    </div>
                    <Badge variant={doc.category === "SOP" ? "blue" : doc.category === "Roadmap" ? "purple" : "success"} className="text-[10px]">
                      {doc.category}
                    </Badge>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm leading-snug">{doc.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{doc.date}</div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2 text-xs mt-auto">
                    <Download className="w-3.5 h-3.5" /> Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* MESSAGES */}
        <TabsContent value="messages" className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              {messages.map((msg) => {
                const isRiva = msg.from === "riva";
                return (
                  <div key={msg.id} className={`flex items-end gap-3 ${isRiva ? "" : "flex-row-reverse"}`}>
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className={`text-xs font-bold ${isRiva ? "bg-[#0f172a] text-amber-400" : "bg-red-600 text-white"}`}>
                        {isRiva ? "RS" : "RR"}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[70%] space-y-1 ${isRiva ? "" : "items-end flex flex-col"}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-500">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-300">{msg.timestamp}</span>
                      </div>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isRiva ? "bg-[#0f172a] text-white rounded-bl-sm" : "bg-red-600 text-white rounded-br-sm"}`}>
                        {msg.body}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
