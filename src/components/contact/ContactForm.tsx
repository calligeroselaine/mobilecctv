"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";
import { business } from "@/lib/business";

type Variant = "full" | "compact";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  solution: string;
  engagement: string;
  timing: string;
  message: string;
  privacyAccepted: boolean;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  solution: "",
  engagement: "",
  timing: "",
  message: "",
  privacyAccepted: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validate(state: FormState, variant: Variant): FieldErrors {
  const errors: FieldErrors = {};
  if (!state.name.trim()) errors.name = "Please enter your name.";
  if (!state.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_RE.test(state.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!state.message.trim()) {
    errors.message =
      variant === "compact"
        ? "Tell us a little about your site."
        : "Please enter a message.";
  }
  if (!state.privacyAccepted) {
    errors.privacyAccepted = "Please acknowledge the privacy policy.";
  }
  return errors;
}

const inputClasses =
  "rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40";
const errorInputClasses =
  "border-red-400 focus:border-red-500 focus:ring-red-500/30";

type ContactFormProps = {
  variant?: Variant;
};

export function ContactForm({ variant = "full" }: ContactFormProps) {
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formStartedAt = useRef<number | null>(null);
  const formId = useId();

  // Recording "when did this form mount" is inherently a side effect
  // (Date.now() is impure), so it happens in an effect rather than during
  // render — this ref feeds the time-trap spam check in the API route.
  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fieldErrors = validate(state, variant);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    // Honeypot / time-trap: if either trips, silently pretend it worked —
    // standard anti-bot practice, doesn't affect a genuine visitor.
    const isBot =
      Boolean(honeypotRef.current?.value) ||
      (formStartedAt.current !== null && Date.now() - formStartedAt.current < 1500);
    if (isBot) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    // STOPGAP: no email backend is connected yet (see README "Contact
    // form setup"), so this opens the visitor's own email client with
    // the enquiry pre-filled instead of silently failing. Once
    // RESEND_API_KEY is set, this should go back to POSTing to
    // /api/contact so it actually lands in an inbox without the visitor
    // needing to hit send themselves.
    const lines = [
      `Name: ${state.name}`,
      state.company && `Company: ${state.company}`,
      `Email: ${state.email}`,
      state.phone && `Phone: ${state.phone}`,
      state.location && `Location / project area: ${state.location}`,
      state.solution && `Solution required: ${state.solution}`,
      state.engagement && `Hire / purchase: ${state.engagement}`,
      state.timing && `Approximate timing: ${state.timing}`,
      "",
      "Message:",
      state.message,
    ].filter(Boolean);

    const subject = `Quote Request from ${state.name}${state.company ? ` (${state.company})` : ""}`;
    const mailtoUrl = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = mailtoUrl;
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-6 py-10 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
        <p className="text-h3 text-green-800">Almost there — check your email app</p>
        <p className="max-w-md text-steel-600">
          We&rsquo;ve opened a new email to us with your details filled in —
          just hit send. If nothing opened, call us on{" "}
          <a href="tel:1300996910" className="font-semibold text-brand hover:text-brand-dark">
            1300 99 69 10
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${business.email}`}
            className="font-semibold text-brand hover:text-brand-dark"
          >
            {business.email}
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Honeypot — visually hidden from sighted users, left in the DOM so
          most bots still fill it in. Never rely on display:none alone. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          ref={honeypotRef}
        />
      </div>

      <Field
        id={`${formId}-name`}
        label="Name"
        error={errors.name}
      >
        <input
          id={`${formId}-name`}
          type="text"
          required
          value={state.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className={`${inputClasses} ${errors.name ? errorInputClasses : ""}`}
        />
      </Field>

      {variant === "full" && (
        <Field id={`${formId}-company`} label="Company">
          <input
            id={`${formId}-company`}
            type="text"
            value={state.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClasses}
          />
        </Field>
      )}

      <Field id={`${formId}-email`} label="Email" error={errors.email}>
        <input
          id={`${formId}-email`}
          type="email"
          required
          value={state.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          className={`${inputClasses} ${errors.email ? errorInputClasses : ""}`}
        />
      </Field>

      <Field id={`${formId}-phone`} label="Phone">
        <input
          id={`${formId}-phone`}
          type="tel"
          value={state.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClasses}
        />
      </Field>

      {variant === "full" && (
        <>
          <Field id={`${formId}-location`} label="Location / Project Area">
            <input
              id={`${formId}-location`}
              type="text"
              placeholder="e.g. Frenchs Forest NSW, construction site"
              value={state.location}
              onChange={(e) => update("location", e.target.value)}
              className={inputClasses}
            />
          </Field>

          <Field id={`${formId}-solution`} label="Solution Required">
            <select
              id={`${formId}-solution`}
              value={state.solution}
              onChange={(e) => update("solution", e.target.value)}
              className={inputClasses}
            >
              <option value="">Not sure — please advise</option>
              <option value="Mobile CCTV Trailer">Mobile CCTV Trailer</option>
              <option value="Pole Camera">Pole Camera</option>
              <option value="Both / a mix">Both / a mix</option>
            </select>
          </Field>

          <Field id={`${formId}-engagement`} label="Hire, Purchase, Or Unsure?">
            <select
              id={`${formId}-engagement`}
              value={state.engagement}
              onChange={(e) => update("engagement", e.target.value)}
              className={inputClasses}
            >
              <option value="">Not sure yet</option>
              <option value="Hire">Hire</option>
              <option value="Purchase">Purchase</option>
            </select>
          </Field>

          <Field id={`${formId}-timing`} label="Approximate Deployment Timing">
            <select
              id={`${formId}-timing`}
              value={state.timing}
              onChange={(e) => update("timing", e.target.value)}
              className={inputClasses}
            >
              <option value="">Not sure yet</option>
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="1–3 months">1–3 months</option>
              <option value="Just researching">Just researching</option>
            </select>
          </Field>
        </>
      )}

      <Field
        id={`${formId}-message`}
        label="Message"
        error={errors.message}
        className="sm:col-span-2"
      >
        <textarea
          id={`${formId}-message`}
          required
          rows={variant === "full" ? 5 : 4}
          value={state.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={`${inputClasses} ${errors.message ? errorInputClasses : ""}`}
        />
      </Field>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="flex items-start gap-2.5 text-sm text-steel-600">
          <input
            type="checkbox"
            required
            checked={state.privacyAccepted}
            onChange={(e) => update("privacyAccepted", e.target.checked)}
            aria-invalid={Boolean(errors.privacyAccepted)}
            aria-describedby={
              errors.privacyAccepted ? `${formId}-privacy-error` : undefined
            }
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-steel-200 text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
          <span>
            I agree to Mobile CCTV Solutions&rsquo; handling of my details as
            described in the{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand hover:text-brand-dark">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.privacyAccepted && (
          <p id={`${formId}-privacy-error`} role="alert" className="text-sm text-red-600">
            {errors.privacyAccepted}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2 sm:w-fit"
      >
        {status === "submitting" && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {status === "submitting" ? "Sending…" : variant === "full" ? "Send Message" : "Request A Quote"}
      </button>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ id, label, error, className = "", children }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
