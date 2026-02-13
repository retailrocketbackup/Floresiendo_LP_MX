import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enlace Meditación en Vivo | Martes 17 Feb 8PM",
  description:
    "Accede a la meditación guiada en vivo con Ramón Henríquez. Martes 17 de febrero 2026, 8:00 PM. Enlace de Google Meet incluido.",
  openGraph: {
    title: "Meditación Guiada en Vivo | Martes 17 Feb 8PM",
    description:
      "Accede a la sesión gratuita de meditación guiada. Martes 17 de febrero 2026, 8:00 PM vía Google Meet.",
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
