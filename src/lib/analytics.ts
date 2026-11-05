type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event. Does nothing when Google Analytics isn't loaded (no
 * NEXT_PUBLIC_GA_ID, blocked by the browser, or not yet ready) and never
 * throws, so tracking can't break the page. Never put names, emails, phone
 * numbers or message text in params — Google's terms forbid personal data.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
  } catch {
    // Analytics must never affect the visitor.
  }
}
