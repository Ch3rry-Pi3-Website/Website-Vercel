export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
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

const normalizeString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeOptionalString = (value: unknown) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export function validateContactPayload(payload: unknown): ContactValidationResult {
  const data: ContactPayload = {
    name: normalizeString((payload as { name?: unknown })?.name),
    email: normalizeString((payload as { email?: unknown })?.email),
    company: normalizeOptionalString((payload as { company?: unknown })?.company),
    message: normalizeString((payload as { message?: unknown })?.message),
    website: normalizeOptionalString((payload as { website?: unknown })?.website),
  };

  const errors: ContactValidationErrors = {};

  if (!data.name) {
    errors.name = "Please enter your name.";
  }

  if (!data.email) {
    errors.email = "Please enter an email address.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message) {
    errors.message = "Please add a short message.";
  } else if (data.message.length < minMessageLength) {
    errors.message = `Message must be at least ${minMessageLength} characters.`;
  }

  if (data.website) {
    errors.website = "Spam detected.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data,
  };
}
