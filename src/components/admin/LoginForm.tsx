"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Label, Input } from "@/components/ui/Field";

const initial: LoginState = {};

export function LoginForm({ from }: { from: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="from" value={from} />
      <div>
        <Label htmlFor="email" required>Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="username" autoFocus />
      </div>
      <div>
        <Label htmlFor="password" required>Password</Label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{state.error}</p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={pending}>
        <LogIn className="h-5 w-5" />
        {pending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
