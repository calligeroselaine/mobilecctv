import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "inverse";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary:
    "border border-brand text-brand bg-white hover:bg-brand-soft",
  inverse: "bg-white text-brand hover:bg-brand-soft",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Reusable CTA button. Renders a Next.js Link when `href` is given, otherwise a <button>. */
export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const isExternal = /^https?:\/\//.test(props.href);
    if (isExternal) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
