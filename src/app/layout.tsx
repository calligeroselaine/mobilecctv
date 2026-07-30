import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/lib/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";

// LocalBusiness is the correct, verifiable schema.org type for this
// business (real address, phone, licence). "SecurityService" is not a
// defined schema.org type and would fail structured-data validation.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  image: `${business.siteUrl}/images/logo.png`,
  telephone: business.phone.display,
  email: business.email,
  url: business.siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.line1,
    addressLocality: business.address.suburb,
    addressRegion: business.address.state,
    postalCode: business.address.postcode,
    addressCountry: "AU",
  },
  sameAs: [business.social.facebook, business.social.instagram],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: business.name,
  url: business.siteUrl,
};

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | Mobile CCTV Trailers & Pole Cameras, Australia-Wide`,
    template: `%s | ${business.name}`,
  },
  description:
    "Solar-powered mobile CCTV trailers and pole-mounted surveillance cameras for temporary and remote site security across Australia. For sale or hire — call 1300 99 69 10.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_AU",
    url: business.siteUrl,
    title: `${business.name} | Mobile CCTV Trailers & Pole Cameras, Australia-Wide`,
    description:
      "Solar-powered mobile CCTV trailers and pole-mounted surveillance cameras for temporary and remote site security across Australia.",
    images: [
      {
        url: "/images/onsite-trailer-2018.jpg",
        width: 2560,
        height: 1920,
        alt: "Mobile CCTV security trailer deployed on site",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Mobile CCTV Trailers & Pole Cameras, Australia-Wide`,
    description:
      "Solar-powered mobile CCTV trailers and pole-mounted surveillance cameras for temporary and remote site security across Australia.",
    images: ["/images/onsite-trailer-2018.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Add a Google Search Console verification code here once the client
  // provides one, e.g.:
  //   verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
  // No code is set yet — none has been issued to this project.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
