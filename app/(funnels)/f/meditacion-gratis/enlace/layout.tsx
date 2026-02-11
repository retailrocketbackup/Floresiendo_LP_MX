import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enlace Meditación en Vivo | Lunes 17 Feb 8PM",
  description:
    "Accede a la meditación guiada en vivo con Ramón Henríquez. Lunes 17 de febrero 2026, 8:00 PM. Enlace de Google Meet incluido.",
  openGraph: {
    title: "Meditación Guiada en Vivo | Lunes 17 Feb 8PM",
    description:
      "Accede a la sesión gratuita de meditación guiada. Lunes 17 de febrero 2026, 8:00 PM vía Google Meet.",
    type: "website",
    locale: "es_MX",
    siteName: "FloreSiendo",
  },
};

export default function EnlaceMeditacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
