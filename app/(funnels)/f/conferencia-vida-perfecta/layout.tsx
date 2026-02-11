import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cuando tu vida se ve perfecta pero se siente vacía | Conferencia Gratuita",
  description:
    "Conferencia gratuita con Ramón Henríquez. Una conversación honesta sobre el vacío que el éxito no llena. Miércoles 4 de marzo 2026.",
  openGraph: {
    title: "Cuando tu vida se ve perfecta pero se siente vacía",
    description:
      "Conferencia gratuita. Una conversación honesta sobre el vacío que el éxito no llena. 4 de marzo 2026.",
    type: "website",
    locale: "es_MX",
    siteName: "FloreSiendo",
  },
};

export default function ConferenciaVidaPerfectaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
