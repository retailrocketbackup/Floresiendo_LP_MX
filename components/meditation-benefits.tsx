// components/meditation-benefits.tsx
import { cn } from "@/lib/utils";

const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
    <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
    <path d="M6 18a4 4 0 0 1-1.967-.516"/>
    <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
  </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

interface MeditationBenefitsProps {
  className?: string;
}

export function MeditationBenefits({ className }: MeditationBenefitsProps) {
  const benefits = [
    {
      icon: BrainIcon,
      title: "Encuentra Calma Mental en Minutos",
      description: "La técnica que aprenderás te ayuda a reconectar con tu centro y soltar el ruido mental. Prácticas milenarias respaldadas por la ciencia moderna para tu bienestar diario.",
      science: "Técnicas ancestrales probadas"
    },
    {
      icon: HeartIcon,
      title: "Reduce el Ruido Mental",
      description: "La respiración consciente te ayuda a encontrar claridad y calma. Sentirás mayor ligereza y presencia desde la primera sesión.",
      science: "Bienestar integral"
    },
    {
      icon: MoonIcon,
      title: "Descansa Profundamente",
      description: "Muchos participantes reportan sentirse más relajados y descansar mejor después de la sesión. Aprende a soltar las tensiones del día.",
      science: "Resultado: Descanso reparador"
    }
  ];

  return (
    <section className={cn("py-20 sm:py-24 px-4 bg-gradient-to-b from-white to-[#f78080]/5", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#f78080] font-semibold mb-2 uppercase tracking-wide text-sm">
            Lo que la ciencia dice
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] mb-4">
            ¿Qué Pasa en tu Cerebro Durante la Sesión?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No es magia. Es neurociencia aplicada a través de técnicas milenarias.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-[#f78080]/10 hover:shadow-md transition-shadow">
              <div className="bg-[#8b2a4a] text-white rounded-full p-3 flex-shrink-0">
                <benefit.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#8b2a4a]">
                  {benefit.title}
                </h3>
                <p className="text-lg text-gray-600 mt-2">
                  {benefit.description}
                </p>
                <p className="text-sm text-[#d4a853] font-medium mt-2">
                  {benefit.science}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Más de <span className="font-bold text-[#8b2a4a]">500 personas</span> han experimentado esta técnica en sesiones anteriores
          </p>
        </div>
      </div>
    </section>
  );
}