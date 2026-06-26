import { Mail, MailOpen } from "lucide-react";
import { prisma } from "@/lib/db";
import { toggleMessageRead, deleteMessage } from "@/app/admin/actions";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Messages</h1>

      <div className="mt-6 space-y-3">
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
            No messages yet.
          </p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "rounded-2xl border bg-white p-5 shadow-sm",
                m.read ? "border-slate-200" : "border-brand-300 ring-1 ring-brand-100",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {m.read ? (
                      <MailOpen className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Mail className="h-4 w-4 text-brand-600" />
                    )}
                    <p className="font-bold text-brand-900">{m.subject}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {m.name} ·{" "}
                    <a href={`mailto:${m.email}`} className="text-brand-700 hover:underline">{m.email}</a>
                    {m.phone && ` · ${m.phone}`}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-slate-700">{m.message}</p>
                  <p className="mt-3 text-xs text-slate-400">{formatDateTime(m.createdAt)}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <form action={toggleMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="read" value={String(!m.read)} />
                    <button type="submit" className="rounded-lg px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50">
                      Mark {m.read ? "unread" : "read"}
                    </button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
