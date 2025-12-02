// Custom layout for stress funnel - No footer, no floating WhatsApp
// WhatsApp CTA is embedded in the page itself

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liberate del Estres y la Rutina | FloreSiendo",
  description:
    "Si sientes que tu rutina te consume, el trabajo te agota y la vida te pesa, te acompanamos a encontrar paz interior a traves de practicas ancestrales.",
  openGraph: {
    title: "Liberate del Estres y la Rutina | FloreSiendo",
    description:
      "Si sientes que tu rutina te consume y la vida te pesa, te acompanamos a encontrar paz interior.",
    type: "website",
    locale: "es_MX",
    siteName: "FloreSiendo",
  },
};

export default function EstresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}