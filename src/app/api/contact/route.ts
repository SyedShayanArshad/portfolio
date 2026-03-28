import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(email: string): boolean {
  // Lightweight sanity check (not a full RFC validator)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const payload = body as Partial<ContactPayload>;

  const name = isNonEmptyString(payload.name) ? payload.name.trim() : "";
  const email = isNonEmptyString(payload.email) ? payload.email.trim() : "";
  const subject = isNonEmptyString(payload.subject)
    ? payload.subject.trim()
    : "";
  const message = isNonEmptyString(payload.message)
    ? payload.message.trim()
    : "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Server misconfigured (RESEND_API_KEY missing)" },
      { status: 500 }
    );
  }

  if (!toEmail || !fromEmail) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Server misconfigured (CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL missing)",
      },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to send message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
