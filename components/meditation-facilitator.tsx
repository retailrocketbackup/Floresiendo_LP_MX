// components/meditation-facilitator.tsx
import Image from "next/image";
import { cn } from "@/lib/utils"; // <-- IMPORTANTE: Importamos la utilidad

// AÑADIDO: El componente ahora puede recibir una clase
interface MeditationFacilitatorProps {
  className?: string;
}

export function MeditationFacilitator({
  className,
}: MeditationFacilitatorProps) {
  return (
    // CAMBIO CLAVE: Usamos cn() para fusionar estilos
    <section className={cn("py-20 sm:py-24 px-4", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full max-w-sm mx-auto">
            <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/facilitador.jpg"
                alt="Foto del facilitador de la meditación"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              Conoce a tu Guía
            </h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Ramon Henriquez tiene más de 10 años de experiencia
                guiando a personas en procesos de sanación y autoconocimiento.
                Su enfoque combina la sabiduría ancestral con técnicas modernas,
                creando un espacio seguro y de profunda confianza para la
                transformación.
              </p>
              <p>
                Su misión es simple: darte las herramientas para que tú mismo
                encuentres la paz y la claridad que ya existen en tu interior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}