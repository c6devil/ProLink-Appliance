import Link from "next/link";
import { CalendarClock, Inbox, CheckCircle2, Clock } from "lucide-react";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [total, newCount, scheduled, completed, thisWeek, unreadMsgs, recent] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "NEW" } }),
    prisma.booking.count({ where: { status: "SCHEDULED" } }),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    prisma.booking.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  const stats = [
    { label: "New requests", value: newCount, icon: Inbox, accent: "text-blue-600" },
    { label: "Scheduled", value: scheduled, icon: CalendarClock, accent: "text-purple-600" },
    { label: "Completed", value: completed, icon: CheckCircle2, accent: "text-green-600" },
    { label: "Bookings this week", value: thisWeek, icon: Clock, accent: "text-accent-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Dashboard</h1>
      <p className="mt-1 text-slate-500">
        {total} total bookings · {unreadMsgs} unread message{unreadMsgs === 1 ? "" : "s"}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.accent}`} />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-brand-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-brand-900">Recent bookings</h2>
          <Link href="/admin/bookings" className="text-sm font-semibold text-brand-700 hover:text-accent-600">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">No bookings yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/admin/bookings/${b.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-brand-900">
                      {b.name} · {b.appliance}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {b.city}, {b.state} · {formatDateTime(b.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={b.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
