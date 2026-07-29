import { AlertTriangle } from "lucide-react";

type ReviewFlagProps = {
  note: string;
  className?: string;
};

/** Amber on-page flag for anything pending client review or sign-off. Never used decoratively. */
export function ReviewFlag({ note, className = "" }: ReviewFlagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-warning-border bg-warning-bg px-2.5 py-1 text-sm font-semibold text-warning ${className}`}
    >
      <AlertTriangle className="h-4 w-4 shrink-0" />
      For client review: {note}
    </span>
  );
}
