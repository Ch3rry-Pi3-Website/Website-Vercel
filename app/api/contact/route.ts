import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  type ContactResponse,
  validateContactPayload,
} from "@/lib/validators/contact";

const fallbackFromEmail = "onboarding@resend.dev";
const allowedFromDomain = /@ch3rry-pi3\.com$/i;

const getFromEmail = () => {
  const preferred =
    process.env.CONTACT_FROM_EMAIL ?? process.env.BUSINESS_FROM_EMAIL;

  if (preferred && allowedFromDomain.test(preferred)) {
    return preferred;
  }

  console.warn(
    "Contact email fallback: using onboarding@resend.dev. Verify ch3rry-pi3.com and set CONTACT_FROM_EMAIL."
  );

  return fallbackFromEmail;
};

const getToEmail = () =>
  process.env.CONTACT_TO_EMAIL ?? "roger@ch3rry-pi3.com";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildEmailHtml = (payload: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) => {
  const companyLine = payload.company
    ? escapeHtml(payload.company)
    : "Not provided";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New contact enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Company:</strong> ${companyLine}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${escapeHtml(
        payload.message
      )}</pre>
    </div>
  `;
};

const invalidResponse: ContactResponse = {
  ok: false,
  error: "Invalid request.",
};

export async function POST(request: Request) {
  console.log("Contact request received");

  if (!process.env.RESEND_API_KEY) {
    console.error("Resend send failed: missing RESEND_API_KEY");
    return NextResponse.json(
      { ok: false, error: "Email service not configured." },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(invalidResponse, { status: 400 });
  }

  const result = validateContactPayload(body);

  if (!result.ok) {
    return NextResponse.json(invalidResponse, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = getToEmail();
  const fromEmail = getFromEmail();
  const subject = `New enquiry from ${result.data.name} - Ch3rry Pi3`;
  const html = buildEmailHtml(result.data);

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject,
    html,
    headers: {
      "Reply-To": result.data.email,
    },
  });

  if (error || !data?.id) {
    console.error("Resend send failed:", error?.message ?? "Unknown error");
    return NextResponse.json(
      { ok: false, error: "Unable to send message right now." },
      { status: 500 }
    );
  }

  console.log(`Resend send success: ${data.id}`);

  return NextResponse.json({ ok: true, id: data.id } satisfies ContactResponse);
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405 }
  );
}
