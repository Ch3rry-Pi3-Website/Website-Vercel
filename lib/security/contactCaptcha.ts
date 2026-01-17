import { createHmac, randomInt, timingSafeEqual } from "crypto";

type CaptchaPayload = {
  a: number;
  b: number;
  exp: number;
};

export type ContactCaptchaChallenge = {
  question: string;
  token: string;
  expiresAt: number;
};

export type ContactCaptchaVerification = {
  ok: boolean;
  error?: string;
};

const tokenSeparator = ".";
const challengeTtlMs = 15 * 60 * 1000;
const minValue = 2;
const maxValue = 10;

const getSecret = () =>
  process.env.CONTACT_FORM_SECRET ?? process.env.RESEND_API_KEY ?? "";

const sign = (payload: string, secret: string) =>
  createHmac("sha256", secret).update(payload).digest("base64url");

export const createContactCaptcha = (): ContactCaptchaChallenge => {
  const secret = getSecret();
  if (!secret) {
    throw new Error("Human check unavailable.");
  }

  const a = randomInt(minValue, maxValue);
  const b = randomInt(minValue, maxValue);
  const expiresAt = Date.now() + challengeTtlMs;
  const payload: CaptchaPayload = { a, b, exp: expiresAt };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );
  const signature = sign(payloadBase64, secret);

  return {
    question: `What is ${a} + ${b}?`,
    token: `${payloadBase64}${tokenSeparator}${signature}`,
    expiresAt,
  };
};

export const verifyContactCaptcha = (
  token: string,
  answer: string
): ContactCaptchaVerification => {
  const secret = getSecret();
  if (!secret) {
    return { ok: false, error: "Human check unavailable." };
  }

  const [payloadBase64, signature] = token.split(tokenSeparator);
  if (!payloadBase64 || !signature) {
    return { ok: false, error: "Invalid human check." };
  }

  const expectedSignature = sign(payloadBase64, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return { ok: false, error: "Invalid human check." };
  }

  let payload: CaptchaPayload;
  try {
    payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf8")
    ) as CaptchaPayload;
  } catch {
    return { ok: false, error: "Invalid human check." };
  }

  if (payload.exp < Date.now()) {
    return { ok: false, error: "Human check expired. Please try again." };
  }

  const numericAnswer = Number(answer);
  if (!Number.isFinite(numericAnswer)) {
    return { ok: false, error: "Invalid human check." };
  }

  if (numericAnswer !== payload.a + payload.b) {
    return { ok: false, error: "Invalid human check." };
  }

  return { ok: true };
};
