import { NextResponse } from "next/server";
import { createContactCaptcha } from "@/lib/security/contactCaptcha";

type ContactChallengeResponse =
  | { ok: true; question: string; token: string; expiresAt: number }
  | { ok: false; error: string };

export function GET() {
  try {
    const challenge = createContactCaptcha();
    const response: ContactChallengeResponse = {
      ok: true,
      question: challenge.question,
      token: challenge.token,
      expiresAt: challenge.expiresAt,
    };
    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create human check.";
    return NextResponse.json(
      { ok: false, error: message } satisfies ContactChallengeResponse,
      { status: 500 }
    );
  }
}
