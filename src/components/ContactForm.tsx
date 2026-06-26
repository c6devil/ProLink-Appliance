"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea, FieldError } from "@/components/ui/Field";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-3 text-xl font-bold text-brand-900">Message sent!</h2>
        <p className="mt-2 text-slate-600">{state.message}</p>
      </div>
    );
  }

  const err = state.errors ?? {};

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="hp-field" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name" required>Name</Label>
          <Input id="c-name" name="name" required aria-invalid={!!err.name} />
          <FieldError>{err.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="c-phone">Phone</Label>
          <Input id="c-phone" name="phone" type="tel" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="c-email" required>Email</Label>
          <Input id="c-email" name="email" type="email" required aria-invalid={!!err.email} />
          <FieldError>{err.email}</FieldError>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="c-subject" required>Subject</Label>
          <Input id="c-subject" name="subject" required aria-invalid={!!err.subject} />
          <FieldError>{err.subject}</FieldError>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="c-message" required>Message</Label>
          <Textarea id="c-message" name="message" required aria-invalid={!!err.message} />
          <FieldError>{err.message}</FieldError>
        </div>
      </div>

      {state.message && state.status === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" className="mt-6 w-full" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
