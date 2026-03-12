import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meditación Guiada en Vivo Gratis | FloreSiendo",
  description:
    "Sesión gratuita de meditación guiada en vivo. 30 minutos para calmar tu mente y reconectar contigo. Jueves 3 de abril, 8:00 PM. Cupo limitado a 50 personas.",
  openGraph: {
    title: "Meditación Guiada en Vivo Gratis | FloreSiendo",
    description:
      "Sesión gratuita de meditación guiada en vivo. Jueves 3 de abril, 8:00 PM.",
    type: "website",
  },
};

export default function MeditacionGratisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
