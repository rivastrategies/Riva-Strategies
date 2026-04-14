"use client";
import { messages } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const [draft, setDraft] = useState("");

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">Messages</h1>
        <p className="text-stone-400 text-sm mt-1">Direct line to your Riva team</p>
      </div>

      {/* Chat thread */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0f172a] flex items-center justify-center">
              <span className="text-amber-400 font-bold text-xs">RS</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1c1917]">Riva Strategies</div>
              <div className="text-[11px] text-stone-400">Your dedicated growth team</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" title="Online" />
          </div>
        </div>

        {/* Messages */}
        <div className="px-6 py-6 space-y-6 min-h-[320px]">
          {messages.map((msg) => {
            const isRiva = msg.from === "riva";
            return (
              <div key={msg.id} className={`flex items-end gap-3 ${isRiva ? "" : "flex-row-reverse"}`}>
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className={`text-xs font-bold ${isRiva ? "bg-[#0f172a] text-amber-400" : "bg-[#b91c1c] text-white"}`}>
                    {isRiva ? "RS" : "RR"}
                  </AvatarFallback>
                </Avatar>
                <div className={`max-w-[75%] space-y-1 ${isRiva ? "" : "flex flex-col items-end"}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-stone-500">{msg.senderName}</span>
                    <span className="text-[10px] text-stone-300">{msg.timestamp}</span>
                  </div>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isRiva ? "bg-[#1c1917] text-[#fdf6e3] rounded-bl-sm" : "bg-[#b91c1c] text-white rounded-br-sm"}`}>
                    {msg.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDraft("");
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message to your Riva team…"
              className="flex-1 rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-[#1c1917] bg-white placeholder:text-stone-400 focus:outline-none focus:border-[#b91c1c] focus:ring-2 focus:ring-red-100 transition"
            />
            <Button type="submit" size="sm" className="bg-[#b91c1c] hover:bg-red-700 text-white gap-2 shrink-0">
              <Send className="w-3.5 h-3.5" /> Send
            </Button>
          </form>
          <p className="text-[10px] text-stone-400 mt-2">Demo mode — messages are not sent.</p>
        </div>
      </div>
    </div>
  );
}
