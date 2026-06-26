"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { createBooking, type BookingState } from "@/app/actions/booking";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea, Select, FieldError } from "@/components/ui/Field";
import { ServiceIcon } from "@/lib/icons";
import { site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Appliance = { name: string; icon: string };

const steps = ["Appliance", "Problem", "Contact", "Schedule"];
const initial: BookingState = { status: "idle" };

export function BookingForm({ appliances }: { appliances: Appliance[] }) {
  const [state, formAction, pending] = useActionState(createBooking, initial);
  const [step, setStep] = useState(0);
  const [appliance, setAppliance] = useState(appliances[0]?.name ?? "");

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
        <h2 className="mt-4 text-2xl font-bold text-brand-900">Request received!</h2>
        <p className="mt-2 text-slate-600">{state.message}</p>
        {state.ref && (
          <p className="mt-4 inline-block rounded-lg bg-brand-50 px-4 py-2 font-mono text-lg font-bold text-brand-800">
            {state.ref}
          </p>
        )}
        <p className="mt-4 text-sm text-slate-500">
          We&apos;ve emailed you a confirmation and our team will call shortly to lock in your
          appointment.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href={telHref} variant="outline" size="md">
            <Phone className="h-4 w-4" /> Call {site.phone}
          </Button>
        </div>
      </div>
    );
  }

  const err = state.errors ?? {};
  const last = steps.length - 1;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Step indicator */}
      <ol className="mb-8 flex items-center gap-2">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                i <= step ? "bg-brand-800 text-white" : "bg-slate-100 text-slate-400",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm font-semibold sm:block",
                i <= step ? "text-brand-900" : "text-slate-400",
              )}
            >
              {label}
            </span>
            {i < last && <span className="h-px flex-1 bg-slate-200" />}
          </li>
        ))}
      </ol>

      <form action={formAction}>
        {/* Honeypot */}
        <div className="hp-field" aria-hidden="true">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {/* Step 1 — Appliance */}
        <div className={cn(step !== 0 && "hidden")}>
          <h2 className="text-xl font-bold text-brand-900">What needs fixing?</h2>
          <p className="mt-1 text-sm text-slate-600">Select the appliance you&apos;d like repaired.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {appliances.map((a) => (
              <label
                key={a.name}
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-colors",
                  appliance === a.name
                    ? "border-brand-600 bg-brand-50"
                    : "border-slate-200 hover:border-brand-300",
                )}
              >
                <input
                  type="radio"
                  name="appliance"
                  value={a.name}
                  checked={appliance === a.name}
                  onChange={() => setAppliance(a.name)}
                  className="sr-only"
                />
                <ServiceIcon name={a.icon} className="h-7 w-7 text-brand-700" />
                <span className="text-sm font-semibold text-slate-800">{a.name.replace(" Repair", "")}</span>
              </label>
            ))}
          </div>
          <FieldError>{err.appliance}</FieldError>
        </div>

        {/* Step 2 — Problem */}
        <div className={cn(step !== 1 && "hidden")}>
          <h2 className="text-xl font-bold text-brand-900">Tell us about the problem</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" name="brand" placeholder="e.g. Whirlpool" />
            </div>
            <div>
              <Label htmlFor="modelNo">Model # (optional)</Label>
              <Input id="modelNo" name="modelNo" placeholder="e.g. WRX735SDHZ" />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="problem" required>
              What&apos;s going on?
            </Label>
            <Textarea
              id="problem"
              name="problem"
              required
              placeholder="Describe the symptoms — e.g. 'Fridge isn't cooling and makes a buzzing noise.'"
              aria-invalid={!!err.problem}
            />
            <FieldError>{err.problem}</FieldError>
          </div>
        </div>

        {/* Step 3 — Contact + address */}
        <div className={cn(step !== 2 && "hidden")}>
          <h2 className="text-xl font-bold text-brand-900">Your contact & address</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" required>Full name</Label>
              <Input id="name" name="name" required aria-invalid={!!err.name} />
              <FieldError>{err.name}</FieldError>
            </div>
            <div>
              <Label htmlFor="phone" required>Phone</Label>
              <Input id="phone" name="phone" type="tel" required aria-invalid={!!err.phone} />
              <FieldError>{err.phone}</FieldError>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email" required>Email</Label>
              <Input id="email" name="email" type="email" required aria-invalid={!!err.email} />
              <FieldError>{err.email}</FieldError>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="addressLine" required>Street address</Label>
              <Input id="addressLine" name="addressLine" required aria-invalid={!!err.addressLine} />
              <FieldError>{err.addressLine}</FieldError>
            </div>
            <div>
              <Label htmlFor="city" required>City</Label>
              <Input id="city" name="city" required aria-invalid={!!err.city} />
              <FieldError>{err.city}</FieldError>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state" required>State</Label>
                <Input id="state" name="state" required defaultValue={site.address.state} aria-invalid={!!err.state} />
                <FieldError>{err.state}</FieldError>
              </div>
              <div>
                <Label htmlFor="zip" required>ZIP</Label>
                <Input id="zip" name="zip" required aria-invalid={!!err.zip} />
                <FieldError>{err.zip}</FieldError>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 — Schedule */}
        <div className={cn(step !== 3 && "hidden")}>
          <h2 className="text-xl font-bold text-brand-900">When works best?</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="preferredDate" required>Preferred date</Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                aria-invalid={!!err.preferredDate}
              />
              <FieldError>{err.preferredDate}</FieldError>
            </div>
            <div>
              <Label htmlFor="timeWindow" required>Time window</Label>
              <Select id="timeWindow" name="timeWindow" required defaultValue="MORNING">
                <option value="MORNING">Morning (8am – 12pm)</option>
                <option value="AFTERNOON">Afternoon (12pm – 4pm)</option>
                <option value="EVENING">Evening (4pm – 7pm)</option>
              </Select>
            </div>
          </div>
          <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            This is a request — we&apos;ll call to confirm the exact time. For emergencies, call{" "}
            <a href={telHref} className="font-semibold text-brand-700">{site.phone}</a>.
          </p>
        </div>

        {state.message && state.status === "error" && (
          <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
            {state.message}
          </p>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="ghost" size="md" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <span />
          )}

          {step < last ? (
            <Button type="button" variant="primary" size="md" onClick={() => setStep((s) => s + 1)}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" variant="accent" size="lg" disabled={pending}>
              {pending ? "Submitting…" : "Submit Request"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
