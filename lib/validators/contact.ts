export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
  captchaAnswer?: string;
  captchaToken?: string;
};

export type ContactResponse =
  | { ok: true; id: string }
  | { ok: false; error: string };

export type ContactValidationErrors = Partial<
  Record<keyof ContactPayload, string>
>;

export type ContactValidationResult = {
  ok: boolean;
  errors: ContactValidationErrors;
  data: ContactPayload;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const minMessageLength = 10;
const disposableEmailDomains = new Set([
  "10minutemail.com",
  "10minutemail.net",
  "dispostable.com",
  "mailinator.com",
  "maildrop.cc",
  "guerrillamail.com",
  "guerrillamail.net",
  "tempmail.com",
  "temp-mail.org",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "trashmail.com",
  "trashmail.net",
  "getnada.com",
  "dropmail.me",
  "fakeinbox.com",
  "getairmail.com",
  "mohmal.com",
  "mintemail.com",
]);

const normalizeString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeOptionalString = (value: unknown) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const getEmailDomain = (email: string) => {
  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) {
    return "";
  }
  return email.slice(atIndex + 1).toLowerCase();
};

export function validateContactPayload(payload: unknown): ContactValidationResult {
  const data: ContactPayload = {
    name: normalizeString((payload as { name?: unknown })?.name),
    email: normalizeString((payload as { email?: unknown })?.email),
    company: normalizeOptionalString((payload as { company?: unknown })?.company),
    message: normalizeString((payload as { message?: unknown })?.message),
    website: normalizeOptionalString((payload as { website?: unknown })?.website),
    captchaAnswer: normalizeOptionalString(
      (payload as { captchaAnswer?: unknown })?.captchaAnswer
    ),
    captchaToken: normalizeOptionalString(
      (payload as { captchaToken?: unknown })?.captchaToken
    ),
  };

  const errors: ContactValidationErrors = {};

  if (!data.name) {
    errors.name = "Please enter your name.";
  }

  if (!data.email) {
    errors.email = "Please enter an email address.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  } else if (disposableEmailDomains.has(getEmailDomain(data.email))) {
    errors.email = "Please use a work email address.";
  }

  if (!data.message) {
    errors.message = "Please add a short message.";
  } else if (data.message.length < minMessageLength) {
    errors.message = `Message must be at least ${minMessageLength} characters.`;
  }

  if (data.website) {
    errors.website = "Spam detected.";
  }

  if (!data.captchaAnswer || !data.captchaToken) {
    errors.captchaAnswer = "Please complete the human check.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data,
  };
}
