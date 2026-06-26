import { Resend } from "resend";
import { site } from "@/lib/site";
import { timeWindowLabels, formatDate } from "@/lib/utils";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM || `${site.name} <onboarding@resend.dev>`;
const ownerEmail = process.env.BOOKING_NOTIFICATION_EMAIL;

const resend = apiKey ? new Resend(apiKey) : null;

type SendArgs = { to: string; subject: string; html: string };

/** Sends an email via Resend, or logs to the console when no API key is set. */
async function send({ to, subject, html }: SendArgs) {
  if (!resend) {
    console.log("\n[email:dev] (set RESEND_API_KEY to actually send)");
    console.log(`  to: ${to}\n  subject: ${subject}`);
    return { delivered: false as const };
  }
  try {
    await resend.emails.send({ from, to, subject, html });
    return { delivered: true as const };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { delivered: false as const };
  }
}

type BookingEmail = {
  ref: string;
  appliance: string;
  brand?: string | null;
  problem: string;
  name: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  preferredDate: Date;
  timeWindow: string;
};

const wrap = (inner: string) => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#0f172a">
    <div style="background:#1e3a8a;padding:20px;border-radius:12px 12px 0 0">
      <span style="color:#fff;font-size:18px;font-weight:800">ProLink</span>
      <span style="color:#fdba74;font-size:11px;letter-spacing:2px;text-transform:uppercase"> Appliance Repair</span>
    </div>
    <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:24px">
      ${inner}
    </div>
  </div>`;

const detailRows = (b: BookingEmail) => `
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr><td style="padding:6px 0;color:#64748b">Reference</td><td style="padding:6px 0;font-weight:700">${b.ref}</td></tr>
    <tr><td style="padding:6px 0;color:#64748b">Appliance</td><td style="padding:6px 0">${b.appliance}${b.brand ? ` (${b.brand})` : ""}</td></tr>
    <tr><td style="padding:6px 0;color:#64748b">Problem</td><td style="padding:6px 0">${b.problem}</td></tr>
    <tr><td style="padding:6px 0;color:#64748b">Preferred</td><td style="padding:6px 0">${formatDate(b.preferredDate)} — ${timeWindowLabels[b.timeWindow] ?? b.timeWindow}</td></tr>
    <tr><td style="padding:6px 0;color:#64748b">Address</td><td style="padding:6px 0">${b.addressLine}, ${b.city}, ${b.state} ${b.zip}</td></tr>
  </table>`;

export async function sendBookingEmails(b: BookingEmail) {
  // Confirmation to the customer
  await send({
    to: b.email,
    subject: `Your repair request is received — ${b.ref}`,
    html: wrap(`
      <h2 style="margin:0 0 8px">Thanks, ${b.name}! 👋</h2>
      <p style="color:#475569">We've received your repair request and our team will contact you
      shortly to confirm your appointment.</p>
      ${detailRows(b)}
      <p style="color:#475569;margin-top:20px">Need to make a change? Just reply to this email or
      call us at <strong>${site.phone}</strong>.</p>
    `),
  });

  // Notification to the business owner
  if (ownerEmail) {
    await send({
      to: ownerEmail,
      subject: `New booking ${b.ref} — ${b.appliance} in ${b.city}`,
      html: wrap(`
        <h2 style="margin:0 0 8px">New repair request</h2>
        ${detailRows(b)}
        <p style="margin-top:16px;font-size:14px">
          <strong>Customer:</strong> ${b.name}<br/>
          <strong>Phone:</strong> ${b.phone}<br/>
          <strong>Email:</strong> ${b.email}
        </p>
      `),
    });
  }
}

export async function sendContactEmail(msg: {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}) {
  if (!ownerEmail) return;
  await send({
    to: ownerEmail,
    subject: `Contact form: ${msg.subject}`,
    html: wrap(`
      <h2 style="margin:0 0 8px">New contact message</h2>
      <p style="font-size:14px">
        <strong>From:</strong> ${msg.name} (${msg.email})<br/>
        ${msg.phone ? `<strong>Phone:</strong> ${msg.phone}<br/>` : ""}
        <strong>Subject:</strong> ${msg.subject}
      </p>
      <p style="color:#475569;white-space:pre-wrap">${msg.message}</p>
    `),
  });
}
