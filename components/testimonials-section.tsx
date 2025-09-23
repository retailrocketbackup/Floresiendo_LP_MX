"use client"

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Testimonios de transformación</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Conoce las experiencias reales de quienes han vivido este proceso de sanación y crecimiento
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          {/* Video 1 */}
          <div className="w-full max-w-sm">
            <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" controls poster="/testimonio-video-1.jpg">
                <source src="/testimonial-video-1.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="text-center mt-4">
              <p className="font-semibold text-foreground">Testimonio 1</p>
              <p className="text-sm text-muted-foreground">Experiencia de transformación</p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="w-full max-w-sm">
            <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" controls poster="/testimonio-video-2.jpg">
                <source src="/testimonial-video-2.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="text-center mt-4">
              <p className="font-semibold text-foreground">Testimonio 2</p>
              <p className="text-sm text-muted-foreground">Proceso de sanación</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
