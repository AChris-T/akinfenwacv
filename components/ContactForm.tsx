"use client";

import { useActionState } from "react";
import { HiArrowRight, HiCheck } from "react-icons/hi2";
import { sendContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 w-full rounded-2xl border bg-white/[0.03] px-4 py-3.5 text-base text-white placeholder:text-neutral-600 transition-colors focus:bg-white/[0.05] focus:outline-none";

function fieldBorder(error?: string) {
  return error ? "border-red-400/60 focus:border-red-400" : "border-white/10 focus:border-accent/60";
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-3xl border border-accent/30 bg-accent/[0.04] p-8 sm:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-neutral-950">
          <HiCheck className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl font-medium tracking-tight text-white">Message sent</h3>
        <p className="mt-2 leading-relaxed text-neutral-400">{state.message}</p>
      </div>
    );
  }

  const { errors = {}, values = {} } = state;

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-neutral-300">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={values.name}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${inputClass} ${fieldBorder(errors.name)}`}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-2 text-sm text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-neutral-300">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values.email}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`${inputClass} ${fieldBorder(errors.email)}`}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-2 text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-medium text-neutral-300">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          defaultValue={values.message}
          placeholder="Tell me about your project, role or idea"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y ${fieldBorder(errors.message)}`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-2 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and screen readers, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${state.status === "error" ? "text-red-400" : "text-neutral-500"}`}
        >
          {state.status === "error" ? state.message : "I'll reply to the email you provide."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group flex h-12 shrink-0 items-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-neutral-950 transition-colors hover:bg-accent/85 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
          {!pending && (
            <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </button>
      </div>
    </form>
  );
}
