import { documents } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, BarChart2, BookOpen, Download } from "lucide-react";

const docIcon: Record<string, React.ReactNode> = {
  SOP: <BookOpen className="w-6 h-6 text-blue-500" />,
  Roadmap: <BarChart2 className="w-6 h-6 text-purple-500" />,
  Report: <FileText className="w-6 h-6 text-emerald-500" />,
};

const docBadge: Record<string, "blue" | "purple" | "success"> = {
  SOP: "blue",
  Roadmap: "purple",
  Report: "success",
};

export default function DocumentsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">Documents</h1>
        <p className="text-stone-400 text-sm mt-1">{documents.length} shared files from your Riva team</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.map((doc) => (
          <Card key={doc.id} className="border-stone-200 shadow-sm bg-white hover:shadow-md hover:border-red-200 transition-all">
            <CardContent className="p-6 flex flex-col gap-4">
              {/* Icon + Badge */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center border border-stone-100">
                  {docIcon[doc.category]}
                </div>
                <Badge variant={docBadge[doc.category]}>{doc.category}</Badge>
              </div>

              {/* Title + date */}
              <div className="flex-1">
                <h3 className="font-bold text-[#1c1917] leading-snug">{doc.title}</h3>
                <p className="text-xs text-stone-400 mt-1">Uploaded {doc.date}</p>
              </div>

              {/* Download button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 border-stone-200 text-stone-600 hover:border-[#b91c1c] hover:text-[#b91c1c] transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
