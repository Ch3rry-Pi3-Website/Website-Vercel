"use client";

import { useEffect, useState } from "react";
import {
  type ContactResponse,
  type ContactValidationErrors,
  validateContactPayload,
} from "@/lib/validators/contact";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  website: string;
  captchaAnswer: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
  website: "",
  captchaAnswer: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    setCaptchaError("");

    try {
      const response = await fetch("/api/contact/challenge", {
        method: "GET",
      });
      const data = (await response.json()) as
        | { ok: true; question: string; token: string }
        | { ok: false; error: string };

      if (!response.ok || !data.ok) {
        setCaptchaError(
          data.ok ? "Unable to load the human check." : data.error
        );
        return;
      }

      setCaptchaQuestion(data.question);
      setCaptchaToken(data.token);
    } catch {
      setCaptchaError("Unable to load the human check.");
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    void loadCaptcha();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (name === "captchaAnswer") {
      setCaptchaError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const result = validateContactPayload({ ...form, captchaToken });
    setErrors(result.errors);

    if (!result.ok) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = (await response.json()) as ContactResponse;

      if (!response.ok || !data.ok) {
        setStatus("error");
        setStatusMessage(
          data.ok ? "Something went wrong. Please try again." : data.error
        );
        return;
      }

      setForm(initialState);
      setCaptchaQuestion("");
      setCaptchaToken("");
      void loadCaptcha();
      setStatus("success");
      setStatusMessage("Thanks for reaching out. We will reply shortly.");
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-200">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
            required
          />
          {errors.name ? (
            <span className="mt-2 block text-xs text-rose-400">
              {errors.name}
            </span>
          ) : null}
        </label>
        <label className="text-sm font-semibold text-slate-200">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
            required
          />
          {errors.email ? (
            <span className="mt-2 block text-xs text-rose-400">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-200">
          Company (optional)
          <input
            type="text"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          />
        </label>
        <label className="text-sm font-semibold text-slate-200">
          Phone (optional)
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          />
          {errors.phone ? (
            <span className="mt-2 block text-xs text-rose-400">
              {errors.phone}
            </span>
          ) : null}
        </label>
      </div>

      <label className="text-sm font-semibold text-slate-200">
        Message
        <textarea
          name="message"
          rows={5}
          minLength={10}
          value={form.message}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          required
        />
        {errors.message ? (
          <span className="mt-2 block text-xs text-rose-400">
            {errors.message}
          </span>
        ) : null}
      </label>

      <label className="hidden">
        Website
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
        />
      </label>

      <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Human check
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-white">
            {captchaLoading
              ? "Loading..."
              : captchaQuestion || "Check unavailable"}
          </span>
          <button
            type="button"
            onClick={loadCaptcha}
            className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:border-white/30 hover:text-white"
          >
            Refresh
          </button>
        </div>
        <label className="mt-4 block text-sm font-semibold text-slate-200">
          Answer
          <input
            type="text"
            name="captchaAnswer"
            value={form.captchaAnswer}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
            required
          />
        </label>
        {errors.captchaAnswer || captchaError ? (
          <span className="mt-2 block text-xs text-rose-400">
            {captchaError || errors.captchaAnswer}
          </span>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {statusMessage ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-300" : "text-rose-400"
          }`}
          role="status"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
