import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea, Select } from "@/components/ui/Field";
import { Stars } from "@/components/ui/Stars";
import { saveTestimonial, deleteTestimonial } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  const editing = edit ? testimonials.find((t) => t.id === edit) : null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Testimonials</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="space-y-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Stars rating={t.rating} />
                    <p className="mt-2 text-sm text-slate-700">&ldquo;{t.body}&rdquo;</p>
                    <p className="mt-2 text-xs font-semibold text-brand-900">
                      {t.author} · {t.location}
                      {!t.published && <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-slate-500">Hidden</span>}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/admin/testimonials?edit=${t.id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-700"
                      aria-label={`Edit testimonial by ${t.author}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={deleteTestimonial}>
                      <input type="hidden" name="id" value={t.id} />
                      <button type="submit" className="rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-brand-900">{editing ? "Edit review" : "Add review"}</h2>
              {editing && (
                <Link href="/admin/testimonials" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  <Plus className="h-4 w-4" /> New
                </Link>
              )}
            </div>
            <form action={saveTestimonial} className="mt-4 space-y-3">
              {editing && <input type="hidden" name="id" value={editing.id} />}
              <div>
                <Label htmlFor="author" required>Author</Label>
                <Input id="author" name="author" required defaultValue={editing?.author ?? ""} />
              </div>
              <div>
                <Label htmlFor="location" required>Location</Label>
                <Input id="location" name="location" required defaultValue={editing?.location ?? ""} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Select id="rating" name="rating" defaultValue={String(editing?.rating ?? 5)}>
                    {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" name="order" type="number" defaultValue={editing?.order ?? 0} />
                </div>
              </div>
              <div>
                <Label htmlFor="body" required>Review</Label>
                <Textarea id="body" name="body" required defaultValue={editing?.body ?? ""} />
              </div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input type="checkbox" name="published" defaultChecked={editing?.published ?? true} /> Published
              </label>
              <Button type="submit" variant="accent" size="md" className="w-full">
                {editing ? "Save changes" : "Add review"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
