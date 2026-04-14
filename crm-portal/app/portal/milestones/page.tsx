import { engagement } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const statusConfig = {
  complete: { icon: "✅", label: "Complete", variant: "success" as const },
  "in-progress": { icon: "🔄", label: "In Progress", variant: "blue" as const },
  upcoming: { icon: "🔜", label: "Upcoming", variant: "secondary" as const },
};

export default function MilestonesPage() {
  const completed = engagement.milestones.filter((m) => m.status === "complete").length;
  const total = engagement.milestones.length;
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">Milestones</h1>
        <p className="text-stone-400 text-sm mt-1">{engagement.pillarEmoji} {engagement.servicePillar}</p>
      </div>

      {/* Progress Summary */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#1c1917]">Overall Progress</span>
            <span className="text-2xl font-bold text-red-700">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-stone-100 [&>div]:bg-[#b91c1c]" />
          <div className="flex items-center gap-6 text-xs text-stone-500">
            <span>{completed} milestone{completed !== 1 ? "s" : ""} complete</span>
            <span>{total - completed} remaining</span>
            <span className="ml-auto text-stone-400">Started {engagement.startDate}</span>
          </div>
        </CardContent>
      </Card>

      {/* Milestone List */}
      <div className="space-y-3">
        {engagement.milestones.map((m, idx) => {
          const { icon, label, variant } = statusConfig[m.status];
          return (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center gap-5 hover:border-red-200 transition-colors"
            >
              {/* Number */}
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-400 text-sm font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>

              {/* Status icon */}
              <span className="text-2xl shrink-0">{icon}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#1c1917] leading-snug">{m.name}</div>
                <div className="text-xs text-stone-400 mt-0.5">Due {m.dueDate}</div>
              </div>

              {/* Badge */}
              <Badge variant={variant} className="shrink-0">{label}</Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
