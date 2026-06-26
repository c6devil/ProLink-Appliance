import Link from "next/link";
import { Pencil, Plus, Star } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea } from "@/components/ui/Field";
import { saveService, deleteService } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const ICON_KEYS = [
  "refrigerator",
  "washing-machine",
  "fan",
  "utensils",
  "cooking-pot",
  "microwave",
  "snowflake",
  "trash-2",
];

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  const editing = edit ? services.find((s) => s.id === edit) : null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Services</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* List */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ul className="divide-y divide-slate-100">
              {services.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-semibold text-brand-900">
                      {s.name}
                      {s.featured && <Star className="h-4 w-4 fill-accent-400 text-accent-400" />}
                    </p>
                    <p className="truncate text-xs text-slate-500">/{s.slug} · order {s.order}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/services?edit=${s.id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-700"
                      aria-label={`Edit ${s.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={s.id} />
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

        {/* Create / edit form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-brand-900">{editing ? "Edit service" : "Add service"}</h2>
              {editing && (
                <Link href="/admin/services" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  <Plus className="h-4 w-4" /> New
                </Link>
              )}
            </div>
            <form action={saveService} className="mt-4 space-y-3">
              {editing && <input type="hidden" name="id" value={editing.id} />}
              <div>
                <Label htmlFor="name" required>Name</Label>
                <Input id="name" name="name" required defaultValue={editing?.name ?? ""} />
              </div>
              <div>
                <Label htmlFor="slug">Slug (auto from name if blank)</Label>
                <Input id="slug" name="slug" defaultValue={editing?.slug ?? ""} />
              </div>
              <div>
                <Label htmlFor="icon">Icon key</Label>
                <Input id="icon" name="icon" list="icon-keys" defaultValue={editing?.icon ?? "refrigerator"} />
                <datalist id="icon-keys">
                  {ICON_KEYS.map((k) => <option key={k} value={k} />)}
                </datalist>
              </div>
              <div>
                <Label htmlFor="shortDesc" required>Short description</Label>
                <Input id="shortDesc" name="shortDesc" required defaultValue={editing?.shortDesc ?? ""} />
              </div>
              <div>
                <Label htmlFor="longDesc" required>Long description</Label>
                <Textarea id="longDesc" name="longDesc" required defaultValue={editing?.longDesc ?? ""} />
              </div>
              <div>
                <Label htmlFor="symptoms">Symptoms (one per line)</Label>
                <Textarea id="symptoms" name="symptoms" defaultValue={editing?.symptoms.join("\n") ?? ""} />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input type="checkbox" name="featured" defaultChecked={editing?.featured ?? false} /> Featured
                </label>
                <div className="flex items-center gap-2">
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" name="order" type="number" defaultValue={editing?.order ?? 0} className="w-20" />
                </div>
              </div>
              <Button type="submit" variant="accent" size="md" className="w-full">
                {editing ? "Save changes" : "Add service"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
