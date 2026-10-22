import Script from "next/script";

/**
 * Google Analytics 4. Loads only when NEXT_PUBLIC_GA_ID is set — in Vercel
 * that is set for the Production environment only, so local development and
 * preview deployments never send data to the live analytics property.
 * Unset (or not a valid "G-…" measurement ID) renders nothing.
 *
 * NEXT_PUBLIC_ variables are baked in at build time, so changing the value
 * needs a redeploy.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

export function GoogleAnalytics() {
  if (!/^G-[A-Z0-9]+$/.test(GA_ID)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
