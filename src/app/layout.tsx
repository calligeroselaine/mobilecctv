import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/lib/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | Security Specialists - ${business.phone.display}`,
    template: `%s | ${business.name}`,
  },
  description:
    "Mobile CCTV Solutions provide high-quality security services Australia-wide. Solar-powered CCTV trailers and pole cameras for sale or hire.",
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_AU",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
