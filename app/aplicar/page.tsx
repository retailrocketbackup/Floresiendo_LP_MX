// app/aplicar/page.tsx
import { Metadata } from "next";
import { ScreeningWizard } from "@/components/screening/ScreeningWizard";

export const metadata: Metadata = {
  title: "Solicitud de Participación | Retiro Floresiendo",
  description:
    "Completa el cuestionario de salud para participar en el retiro de bienestar y prácticas ancestrales de Floresiendo en Morelos, México.",
  robots: {
    index: false, // Don't index application form
    follow: true,
  },
};

export default function AplicarPage() {
  return <ScreeningWizard />;
}
