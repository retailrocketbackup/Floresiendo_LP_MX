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
          Retiros FloreSiendo del 23 al 26 de Octubre
          <span className="block text-3xl md:text-4xl font-normal mt-2 text-purple-200">en Cocoyoc, Morelos</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto text-pretty drop-shadow-lg">
          Libera tu mente del estrés y encuentra la paz en tu vida
        </p>
      </div>
    </section>
  )
}
