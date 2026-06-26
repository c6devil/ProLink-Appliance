import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  updateBookingStatus,
  updateBookingNotes,
  deleteBooking,
} from "@/app/admin/actions";
import { formatDate, formatDateTime, timeWindowLabels, statusLabels } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"] as const;

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const b = await prisma.booking.findUnique({ where: { id } });
  if (!b) notFound();

  return (
    <div className="max-w-4xl">
      <Link href="/admin/bookings" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Back to bookings
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-mono text-2xl font-bold text-brand-900">{b.ref}</h1>
          <p className="text-sm text-slate-500">Created {formatDateTime(b.createdAt)}</p>
        </div>
        <StatusBadge status={b.status} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Details */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-brand-900">Repair details</h2>
            <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase text-slate-400">Appliance</dt>
                <dd className="font-medium text-slate-800">{b.appliance}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-400">Brand / Model</dt>
                <dd className="font-medium text-slate-800">
                  {[b.brand, b.modelNo].filter(Boolean).join(" · ") || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase text-slate-400">Problem</dt>
                <dd className="text-slate-700">{b.problem}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-400">Preferred date</dt>
                <dd className="font-medium text-slate-800">{formatDate(b.preferredDate)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-400">Time window</dt>
                <dd className="font-medium text-slate-800">{timeWindowLabels[b.timeWindow]}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-brand-900">Internal notes</h2>
            <form action={updateBookingNotes} className="mt-3">
              <input type="hidden" name="id" value={b.id} />
              <textarea
                name="notes"
                defaultValue={b.notes ?? ""}
                rows={4}
                placeholder="Add notes about this job…"
                className="w-full rounded-lg border border-slate-300 p-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
              <Button type="submit" variant="primary" size="sm" className="mt-3">
                Save notes
              </Button>
            </form>
          </section>
        </div>

        {/* Sidebar: contact + status + danger */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-brand-900">Customer</h2>
            <p className="mt-3 font-semibold text-slate-800">{b.name}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`tel:${b.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-brand-700">
                  <Phone className="h-4 w-4 text-brand-500" /> {b.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-slate-600 hover:text-brand-700">
                  <Mail className="h-4 w-4 text-brand-500" /> {b.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span>{b.addressLine}, {b.city}, {b.state} {b.zip}</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-brand-900">Update status</h2>
            <form action={updateBookingStatus} className="mt-3 flex gap-2">
              <input type="hidden" name="id" value={b.id} />
              <select
                name="status"
                defaultValue={b.status}
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
              </select>
              <Button type="submit" variant="primary" size="sm">Save</Button>
            </form>
          </section>

          <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-bold text-red-800">Danger zone</h2>
            <form action={deleteBooking} className="mt-3">
              <input type="hidden" name="id" value={b.id} />
              <button
                type="submit"
                className="rounded-lg border-2 border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
              >
                Delete booking
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
