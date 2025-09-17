"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "¿Es seguro participar en ceremonias con plantas amazónicas?",
      answer:
        "Sí, la seguridad es nuestra máxima prioridad. Contamos con facilitadores experimentados, protocolos médicos estrictos, y un entorno controlado. Realizamos evaluaciones previas de salud física y mental, y mantenemos supervisión médica durante todo el proceso.",
    },
    {
      question: "¿Qué debo traer al retiro?",
      answer:
        "Te proporcionaremos una lista detallada al confirmar tu participación. Generalmente incluye ropa cómoda, artículos de higiene personal, una botella de agua, y cualquier medicamento personal. No es necesario traer comida, ya que proporcionamos todas las comidas.",
    },
    {
      question: "¿Hay restricciones de edad para participar?",
      answer:
        "Los participantes deben ser mayores de 21 años. También evaluamos la madurez emocional y la preparación mental de cada persona durante el proceso de selección para asegurar que estén listos para esta experiencia.",
    },
    {
      question: "¿Qué pasa si tengo condiciones médicas preexistentes?",
      answer:
        "Es fundamental que nos informes sobre cualquier condición médica, medicamentos o tratamientos actuales. Algunas condiciones pueden ser contraindicaciones. Nuestro equipo médico evaluará cada caso individualmente para determinar la seguridad de tu participación.",
    },
    {
      question: "¿Cómo es el proceso de integración después del retiro?",
      answer:
        "La integración es tan importante como la ceremonia misma. Ofrecemos sesiones de seguimiento, círculos de integración grupales, y recursos para ayudarte a incorporar las enseñanzas en tu vida diaria. También proporcionamos herramientas prácticas y apoyo continuo.",
    },
    {
      question: "¿Qué incluye el precio del retiro?",
      answer:
        "El precio incluye todas las ceremonias, alojamiento, comidas vegetarianas, talleres, sesiones de integración, y acompañamiento profesional durante todo el fin de semana. No incluye transporte hasta el lugar del retiro.",
    },
    {
      question: "¿Puedo cancelar mi reservación?",
      answer:
        "Sí, entendemos que pueden surgir circunstancias imprevistas. Tenemos una política de cancelación flexible: reembolso completo hasta 30 días antes, 50% hasta 15 días antes. Consulta nuestros términos completos para más detalles.",
    },
    {
      question: "¿Es necesario tener experiencia previa con plantas medicinales?",
      answer:
        "No es necesario tener experiencia previa. Nuestros retiros están diseñados tanto para principiantes como para personas con experiencia. Proporcionamos toda la preparación y orientación necesaria para que te sientas seguro y preparado.",
    },
    {
      question: "¿Cómo puedo prepararme para el retiro?",
      answer:
        "Te enviaremos una guía completa de preparación que incluye recomendaciones dietéticas, prácticas de meditación, y preparación mental y emocional. También ofrecemos sesiones de preparación individuales si las necesitas.",
    },
    {
      question: "¿Qué medidas de privacidad y confidencialidad manejan?",
      answer:
        "Respetamos completamente tu privacidad. Todo lo compartido durante el retiro se mantiene confidencial. No tomamos fotos durante las ceremonias y pedimos a todos los participantes que respeten la privacidad de los demás.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Resolvemos las dudas más comunes sobre nuestros retiros de transformación
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-lg text-card-foreground pr-4">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
