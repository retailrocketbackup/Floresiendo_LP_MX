import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mastermind Gratuito: Estrés Laboral y Burnout | FloreSiendo",
  description:
    "Sesión interactiva gratuita para profesionales. Herramientas tácticas contra el estrés laboral, límites digitales y meditación de reseteo neurobiológico. Miércoles 19 de marzo, 8:00 PM.",
  openGraph: {
    title: "Mastermind Gratuito: Estrés Laboral y Burnout | FloreSiendo",
    description:
      "60 minutos de herramientas tácticas para recuperar tu energía y claridad mental. Miércoles 19 de marzo 2026, 8:00 PM.",
    type: "website",
    locale: "es_MX",
    siteName: "FloreSiendo",
  },
};

export default function MastermindEstresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
