// Custom layout for grief funnel - No footer, no floating WhatsApp
// WhatsApp CTA is embedded in the page itself

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acompañamiento en Duelo | FloreSiendo",
  description:
    "Si estás atravesando una pérdida, no tienes que hacerlo solo/a. Te ofrecemos un espacio seguro para procesar tu duelo con acompañamiento amoroso.",
  openGraph: {
    title: "Acompañamiento en Duelo | FloreSiendo",
    description:
      "Si estás atravesando una pérdida, no tienes que hacerlo solo/a. Te ofrecemos un espacio seguro para procesar tu duelo.",
    type: "website",
    locale: "es_MX",
    siteName: "FloreSiendo",
  },
};

export default function DueloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
