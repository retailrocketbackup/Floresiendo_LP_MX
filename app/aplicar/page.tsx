// app/aplicar/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
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

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--warm-white)]">
      <div className="animate-pulse text-[var(--burgundy)]">Cargando...</div>
    </div>
  );
}

export default function AplicarPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ScreeningWizard />
    </Suspense>
  );
}
