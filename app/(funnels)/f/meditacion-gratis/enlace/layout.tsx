import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enlace Meditación en Vivo | Jueves 19 Mar 8PM",
  description:
    "Accede a la meditación guiada en vivo con Ramón Henríquez. Jueves 19 de marzo 2026, 8:00 PM. Enlace de Google Meet incluido.",
  openGraph: {
    title: "Meditación Guiada en Vivo | Jueves 19 Mar 8PM",
    description:
      "Accede a la sesión gratuita de meditación guiada. Jueves 19 de marzo 2026, 8:00 PM vía Google Meet.",
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
