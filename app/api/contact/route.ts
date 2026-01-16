import { NextResponse } from "next/server";
import {
  type ContactResponse,
  validateContactPayload,
} from "@/lib/validators/contact";

const invalidResponse: ContactResponse = {
  ok: false,
  error: "Invalid request.",
};

export async function POST(request: Request) {
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

  console.log("New contact request:", result.data);

  return NextResponse.json({ ok: true } satisfies ContactResponse);
}
