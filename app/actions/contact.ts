"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

type Field = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  // Echoed back on error so the visitor doesn't lose what they typed.
  values?: Partial<Record<Field, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see this field, bots usually fill it in.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success", message: "Thanks, your message has been sent." };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  else if (values.name.length > 100) errors.name = "Please keep your name under 100 characters.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.length < 10) errors.message = "Please write a little more (at least 10 characters).";
  else if (values.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; message not sent.");
    return {
      status: "error",
      message: `The form isn't connected yet. Please email me directly at ${site.email}.`,
      values,
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // onboarding@resend.dev works without a verified domain, but only delivers to your own Resend account email.
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: values.email,
    subject: `Portfolio enquiry from ${values.name}`,
    text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    html: `
      <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
        <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p style="margin:0 0 16px"><strong>Email:</strong> ${escapeHtml(values.email)}</p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(values.message)}</p>
      </div>`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again or email me at ${site.email}.`,
      values,
    };
  }

  return { status: "success", message: "Thanks, your message has been sent. I'll get back to you soon." };
}
