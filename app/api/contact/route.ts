import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  type ContactResponse,
  validateContactPayload,
} from "@/lib/validators/contact";
import { verifyContactCaptcha } from "@/lib/security/contactCaptcha";

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
  phone?: string;
  message: string;
}) => {
  const companyLine = payload.company
    ? escapeHtml(payload.company)
    : "Not provided";
  const phoneLine = payload.phone ? escapeHtml(payload.phone) : "Not provided";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New contact enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Company:</strong> ${companyLine}</p>
      <p><strong>Phone:</strong> ${phoneLine}</p>
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

const rateLimitStore = new Map<string, number[]>();
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const windowStart = now - rateLimitWindowMs;
  const timestamps = (rateLimitStore.get(key) ?? []).filter(
    (timestamp) => timestamp > windowStart
  );

  if (timestamps.length >= rateLimitMax) {
    rateLimitStore.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitStore.set(key, timestamps);
  return false;
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

  const captchaCheck = verifyContactCaptcha(
    result.data.captchaToken ?? "",
    result.data.captchaAnswer ?? ""
  );

  if (!captchaCheck.ok) {
    return NextResponse.json(
      { ok: false, error: captchaCheck.error ?? "Human check failed." },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  const emailKey = `email:${result.data.email.toLowerCase()}`;
  const ipKey = `ip:${ip}`;

  if (isRateLimited(emailKey) || isRateLimited(ipKey)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = getToEmail();
  const fromEmail = getFromEmail();
  const subject = `New enquiry from ${result.data.name} - Ch3rry Pi3`;
  const html = buildEmailHtml({
    name: result.data.name,
    email: result.data.email,
    company: result.data.company,
    phone: result.data.phone,
    message: result.data.message,
  });

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
