import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "¿El estrés te está consumiendo? | FloreSiendo",
  description:
    "Descubre cómo el estrés crónico afecta tu cuerpo y tu mente. Video gratuito + acceso al Mastermind interactivo sobre estrés laboral.",
  openGraph: {
    title: "¿El estrés te está consumiendo? | FloreSiendo",
    description:
      "Descubre cómo el estrés crónico afecta tu cuerpo y tu mente. Video gratuito de Rodrigo Roble.",
    type: "website",
  },
};

export default function EstresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
