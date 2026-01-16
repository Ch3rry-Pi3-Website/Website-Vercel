"use client";

import { useState } from "react";
import {
  type ContactResponse,
  type ContactValidationErrors,
  validateContactPayload,
} from "@/lib/validators/contact";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const result = validateContactPayload(form);
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
        setStatusMessage("Something went wrong. Please try again.");
        return;
      }

      setForm(initialState);
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
        <label className="text-sm font-semibold text-slate-700">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            required
          />
          {errors.name ? (
            <span className="mt-2 block text-xs text-rose-600">
              {errors.name}
            </span>
          ) : null}
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            required
          />
          {errors.email ? (
            <span className="mt-2 block text-xs text-rose-600">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className="text-sm font-semibold text-slate-700">
        Company (optional)
        <input
          type="text"
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </label>

      <label className="text-sm font-semibold text-slate-700">
        Message
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          required
        />
        {errors.message ? (
          <span className="mt-2 block text-xs text-rose-600">
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

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-400"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {statusMessage ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-700" : "text-rose-600"
          }`}
          role="status"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
