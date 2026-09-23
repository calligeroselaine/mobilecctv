import Image from "next/image";

type MocPlaceholderPhotoProps = {
  src: string | null;
  alt: string;
  /** Shown only when `src` is null, so it's obvious on the live preview
   * exactly which photo the client still needs to supply. */
  neededCaption: string;
  aspectClassName: string;
  sizes?: string;
  priority?: boolean;
  tone?: "dark" | "light";
};

/**
 * Renders a real photo when one has been confidently matched from the
 * existing asset library, or a clearly-labelled placeholder when it
 * hasn't — per the brief, unresolved image slots must never be filled
 * with a guess, a stock photo or an invented image.
 */
export function MocPlaceholderPhoto({
  src,
  alt,
  neededCaption,
  aspectClassName,
  sizes = "100vw",
  priority = false,
  tone = "dark",
}: MocPlaceholderPhotoProps) {
  if (src) {
    return (
      <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const isDark = tone === "dark";

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden border border-dashed ${aspectClassName} ${
        isDark ? "border-white/25 bg-[#0E1012] text-[#8A8E92]" : "border-[#9A9C9E] bg-[#E6E2DA] text-[#5B5F63]"
      }`}
    >
      <p className="max-w-[80%] px-4 text-center font-mono text-xs uppercase tracking-[0.08em]">
        Photo needed: {neededCaption}
      </p>
    </div>
  );
}
