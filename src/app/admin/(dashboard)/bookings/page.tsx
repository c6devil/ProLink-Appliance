import Link from "next/link";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate, formatDateTime, timeWindowLabels, statusLabels } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"] as const;

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const validStatus = STATUSES.includes(status as (typeof STATUSES)[number]) ? status : undefined;

  const bookings = await prisma.booking.findMany({
    where: {
      ...(validStatus ? { status: validStatus as never } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { ref: { contains: q, mode: "insensitive" } },
              { city: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Bookings</h1>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          href="/admin/bookings"
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-semibold",
            !validStatus ? "bg-brand-800 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200",
          )}
        >
          All
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/bookings?status=${s}`}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-semibold",
              validStatus === s ? "bg-brand-800 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200",
            )}
          >
            {statusLabels[s]}
          </Link>
        ))}
        <form className="ml-auto" action="/admin/bookings">
          {validStatus && <input type="hidden" name="status" value={validStatus} />}
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name, email, ref…"
            className="w-56 rounded-lg border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </form>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {bookings.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Ref</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Appliance</th>
                  <th className="px-4 py-3">Preferred</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link href={`/admin/bookings/${b.id}`} className="font-mono font-semibold text-brand-700 hover:underline">
                        {b.ref}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{b.name}</div>
                      <div className="text-xs text-slate-500">{b.city}, {b.state}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{b.appliance}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(b.preferredDate)}
                      <div className="text-xs text-slate-400">{timeWindowLabels[b.timeWindow]}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDateTime(b.createdAt)}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
