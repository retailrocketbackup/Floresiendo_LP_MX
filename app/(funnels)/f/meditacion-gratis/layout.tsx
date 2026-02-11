import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meditación Guiada en Vivo | Sesión Gratuita",
  description:
    "Sesión gratuita de meditación guiada en vivo. 30 minutos para calmar tu mente y reconectar contigo. Martes 3 de marzo 2026 a las 8:00 PM.",
  openGraph: {
    title: "Meditación Guiada en Vivo | Sesión Gratuita",
    description:
      "30 minutos para calmar tu mente y reconectar contigo. Martes 3 de marzo 2026, 8:00 PM.",
    type: "website",
    locale: "es_MX",
    siteName: "FloreSiendo",
  },
};

export default function MeditacionGratisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
