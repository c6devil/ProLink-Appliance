import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea } from "@/components/ui/Field";
import { saveServiceArea, deleteServiceArea } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminServiceAreasPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const areas = await prisma.serviceArea.findMany({ orderBy: { order: "asc" } });
  const editing = edit ? areas.find((a) => a.id === edit) : null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Service Areas</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ul className="divide-y divide-slate-100">
              {areas.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-900">{a.city}, {a.state}</p>
                    <p className="truncate text-xs text-slate-500">/{a.slug} · order {a.order}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/service-areas?edit=${a.id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-700"
                      aria-label={`Edit ${a.city}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={deleteServiceArea}>
                      <input type="hidden" name="id" value={a.id} />
                      <button type="submit" className="rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-brand-900">{editing ? "Edit area" : "Add area"}</h2>
              {editing && (
                <Link href="/admin/service-areas" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  <Plus className="h-4 w-4" /> New
                </Link>
              )}
            </div>
            <form action={saveServiceArea} className="mt-4 space-y-3">
              {editing && <input type="hidden" name="id" value={editing.id} />}
              <div>
                <Label htmlFor="city" required>City</Label>
                <Input id="city" name="city" required defaultValue={editing?.city ?? ""} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="state" required>State</Label>
                  <Input id="state" name="state" required defaultValue={editing?.state ?? ""} />
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" name="order" type="number" defaultValue={editing?.order ?? 0} />
                </div>
              </div>
              <div>
                <Label htmlFor="slug">Slug (auto from city if blank)</Label>
                <Input id="slug" name="slug" defaultValue={editing?.slug ?? ""} />
              </div>
              <div>
                <Label htmlFor="blurb" required>Blurb</Label>
                <Textarea id="blurb" name="blurb" required defaultValue={editing?.blurb ?? ""} />
              </div>
              <Button type="submit" variant="accent" size="md" className="w-full">
                {editing ? "Save changes" : "Add area"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
