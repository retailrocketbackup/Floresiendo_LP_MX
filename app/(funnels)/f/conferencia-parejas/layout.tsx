import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conferencia Gratuita: Relaciones de Pareja | FloreSiendo",
  description:
    "Lo amas pero ya no lo deseas. Conferencia presencial gratuita en CDMX basada en la ciencia de Gottman y Perel. Domingo 19 de abril, 4:00 PM. Cupo limitado a 60 personas.",
  openGraph: {
    title: "Conferencia Gratuita: Relaciones de Pareja | FloreSiendo",
    description:
      "Lo amas pero ya no lo deseas. Conferencia presencial gratuita en CDMX. Domingo 19 de abril, 4:00 PM.",
    type: "website",
  },
};

export default function ConferenciaParejasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
