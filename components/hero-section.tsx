import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/cosmic-spiritual-background.jpg"
          alt="Cosmic spiritual background with person walking toward mandala galaxy"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance drop-shadow-2xl">
          Retiros FloreSiendo
          <span className="block text-3xl md:text-4xl font-normal mt-2 text-purple-200">en Morelos</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto text-pretty drop-shadow-lg">
          Liberate tu mente de patrones limitantes y conecta con tu esencia más profunda
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full shadow-2xl"
          >
            Más información del retiro
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm shadow-2xl"
          >
            Ver fechas disponibles
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
