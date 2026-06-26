import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { Logo } from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-screen-2xl flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between p-4 lg:block">
            <Link href="/admin">
              <Logo />
            </Link>
          </div>
          <div className="px-3 pb-3 lg:px-3">
            <AdminNav />
          </div>
          <div className="hidden border-t border-slate-200 p-3 lg:block">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
            >
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <span className="text-sm text-slate-500">
              Signed in as <strong className="text-slate-700">{session.email}</strong>
            </span>
            <form action={logoutAction} className="lg:hidden">
              <button type="submit" className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </form>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
