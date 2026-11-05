"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Counts clicks on phone (tel:) and email (mailto:) links anywhere on the
 * site as GA4 events. One listener on the document covers every link,
 * including ones added later. The number and address are not sent — only
 * the page the click happened on.
 */
export function ContactClickTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href")?.trim().toLowerCase() ?? "";
      const pagePath = window.location.pathname;
      if (href.startsWith("tel:")) trackEvent("phone_click", { page_path: pagePath });
      else if (href.startsWith("mailto:")) trackEvent("email_click", { page_path: pagePath });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
