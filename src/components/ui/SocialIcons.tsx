import { SVGProps } from "react";

/**
 * Lucide's icon set no longer ships brand/logo glyphs, so social icons are
 * small inline SVGs here rather than pulling in an extra icon dependency.
 */

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.25-1.5 1.5-1.5h1.6V4.3C16.3 4.2 15.4 4 14.4 4c-2.1 0-3.4 1.28-3.4 3.6V10.5H8.5v3H11V21h2.5Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 5.82c-.9-.88-1.4-2.08-1.4-3.32h-3.13v13.06c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1-2.72-2.72 2.72 2.72 0 0 1 2.72-2.72c.28 0 .55.04.8.12v-3.19a5.94 5.94 0 0 0-.8-.06 5.86 5.86 0 0 0-5.86 5.86 5.86 5.86 0 0 0 5.86 5.86 5.86 5.86 0 0 0 5.86-5.86V9.03a7.36 7.36 0 0 0 4.3 1.38V7.28a4.03 4.03 0 0 1-2.91-1.46Z" />
    </svg>
  );
}
