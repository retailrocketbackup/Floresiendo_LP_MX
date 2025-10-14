// components/meditation-benefits.tsx
import { cn } from "@/lib/utils"; // <-- IMPORTANTE: Importamos la utilidad

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// AÑADIDO: El componente ahora puede recibir una clase
interface MeditationBenefitsProps {
  className?: string;
}

export function MeditationBenefits({ className }: MeditationBenefitsProps) {
  return (
    // CAMBIO CLAVE: Usamos cn() para fusionar estilos
    <section className={cn("py-20 sm:py-24 px-4", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            ¿Qué Lograrás en esta Sesión Gratuita?
          </h2>
          <p className="text-xl text-muted-gray-600 max-w-2xl mx-auto">
            Una experiencia diseñada para darte herramientas prácticas y un
            momento de profunda conexión.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-300 text-yellow-900 rounded-full p-2">
              <CheckIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Reduce la Ansiedad en Minutos
              </h3>
              <p className="text-lg text-gray-600 mt-1">
                Aprenderás una técnica de respiración poderosa que podrás usar
                en cualquier momento para calmar tu sistema nervioso.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-yellow-300 text-yellow-900 rounded-full p-2">
              <CheckIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Reconecta con tu Propósito
              </h3>
              <p className="text-lg text-gray-600 mt-1">
                A través de una respiración guiada, crearás un espacio para
                silenciar el ruido exterior y escuchar la voz de tu intuición y
                claridad mental.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-yellow-300 text-yellow-900 rounded-full p-2">
              <CheckIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Forma Parte de una Comunidad
              </h3>
              <p className="text-lg text-gray-600 mt-1">
                Compartirás este espacio en vivo con cientos de personas que,
                como tú, están en la búsqueda de una vida con más sentido y
                bienestar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}