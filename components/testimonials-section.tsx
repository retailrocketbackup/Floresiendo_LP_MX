"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "María González",
      location: "Ciudad de México",
      rating: 5,
      text: "Esta experiencia cambió mi vida completamente. Logré sanar traumas profundos que llevaba años cargando. El acompañamiento fue excepcional y me sentí segura en todo momento.",
      image: "/placeholder.svg?key=maria",
    },
    {
      name: "Carlos Hernández",
      location: "Guadalajara",
      rating: 5,
      text: "Nunca imaginé que podría conectar tan profundamente conmigo mismo. Las plantas maestras me mostraron aspectos de mi ser que desconocía. La integración posterior fue fundamental.",
      image: "/placeholder.svg?key=carlos",
    },
    {
      name: "Ana Rodríguez",
      location: "Monterrey",
      rating: 5,
      text: "El espacio sagrado en Morelos es perfecto para este tipo de trabajo interior. Los facilitadores son muy profesionales y crean un ambiente de confianza y respeto.",
      image: "/placeholder.svg?key=ana",
    },
    {
      name: "Roberto Silva",
      location: "Puebla",
      rating: 5,
      text: "Después del retiro, mi perspectiva sobre la vida cambió radicalmente. Encontré claridad en mis propósitos y sanación en heridas emocionales muy antiguas.",
      image: "/placeholder.svg?key=roberto",
    },
    {
      name: "Laura Martínez",
      location: "Querétaro",
      rating: 5,
      text: "La experiencia superó todas mis expectativas. El proceso de integración me ayudó a incorporar las enseñanzas en mi vida diaria de manera práctica y sostenible.",
      image: "/placeholder.svg?key=laura",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Testimonios de transformación</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Conoce las experiencias reales de quienes han vivido este proceso de sanación y crecimiento
          </p>
        </div>

        {/* Main testimonial carousel */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-blue-200">
                    <img
                      src={currentTestimonial.image || "/placeholder.svg"}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  {/* Rating stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed italic">
                    "{currentTestimonial.text}"
                  </blockquote>

                  <div>
                    <p className="font-semibold text-foreground text-lg">{currentTestimonial.name}</p>
                    <p className="text-muted-foreground">{currentTestimonial.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0 bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0 bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Grid of additional testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text.substring(0, 120)}..."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-blue-200">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
