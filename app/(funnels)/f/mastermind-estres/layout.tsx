import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mastermind Gratuito: Estrés Laboral y Burnout | FloreSiendo",
  description:
    "¿El trabajo te consume? 60 minutos de herramientas para recuperar tu energía y dejar de vivir en piloto automático. Workshop online gratuito e interactivo.",
  openGraph: {
    title: "Mastermind Gratuito: Estrés Laboral y Burnout | FloreSiendo",
    description:
      "60 minutos de herramientas para recuperar tu energía y dejar de vivir en piloto automático. Workshop online gratuito.",
    type: "website",
  },
};

export default function MastermindEstresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
