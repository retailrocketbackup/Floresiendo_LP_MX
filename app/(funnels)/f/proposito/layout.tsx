// Custom layout for purpose funnel - No footer, no floating WhatsApp
// WhatsApp CTA is embedded in the page itself

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encuentra Tu Proposito | FloreSiendo",
  description:
    "Si sientes que tu vida perdio sentido, que trabajas sin motivacion y el vacio te consume, te acompanamos a reconectar con tu proposito a traves de practicas ancestrales.",
  openGraph: {
    title: "Encuentra Tu Proposito | FloreSiendo",
    description:
      "Si sientes que tu vida perdio sentido y el vacio te consume, te acompanamos a reconectar con tu proposito.",
    type: "website",
    locale: "es_MX",
    siteName: "FloreSiendo",
  },
};

export default function PropositoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}