// components/meditation-facilitator.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MeditationFacilitatorProps {
  className?: string;
}

export function MeditationFacilitator({
  className,
}: MeditationFacilitatorProps) {
  return (
    <section className={cn("py-20 sm:py-24 px-4 bg-[#8b2a4a]/5", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full max-w-sm mx-auto">
            <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl ring-4 ring-[#f78080]/30">
              <Image
                src="/facilitador.jpg"
                alt="Ramón Henríquez - Facilitador de meditación"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[#f78080] font-semibold mb-2 uppercase tracking-wide text-sm">
              Tu facilitador
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] mb-4">
              Ramón Henríquez
            </h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Con más de <span className="font-semibold text-[#8b2a4a]">10 años de experiencia</span> guiando
                procesos de transformación personal, Ramón ha acompañado a cientos de personas
                en su camino hacia la paz interior.
              </p>
              <p>
                Su enfoque combina <span className="text-[#d4a853] font-medium">técnicas de respiración respaldadas por neurociencia</span> con
                la sabiduría de tradiciones contemplativas, creando experiencias
                profundas pero accesibles.
              </p>
              <p className="text-[#8b2a4a] font-medium italic">
                "Mi trabajo es darte herramientas que funcionen. Sin misticismo innecesario.
                Solo práctica que transforma."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}