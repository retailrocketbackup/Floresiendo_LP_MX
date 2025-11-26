// components/meditation-faq.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={cn(
      "h-5 w-5 transition-transform duration-200",
      isOpen && "rotate-180"
    )}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-[#f78080]/20 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex justify-between items-center text-left hover:text-[#8b2a4a] transition-colors"
      >
        <span className="text-lg font-medium text-[#8b2a4a] pr-4">
          {question}
        </span>
        <span className="text-[#f78080] flex-shrink-0">
          <ChevronIcon isOpen={isOpen} />
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

interface MeditationFAQProps {
  className?: string;
}

export function MeditationFAQ({ className }: MeditationFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Qué pasa si nunca he meditado antes?",
      answer:
        "Esta sesión está diseñada especialmente para principiantes. No necesitas experiencia previa. La técnica de respiración que aprenderás es simple y guiada paso a paso. Muchos participantes nos dicen que fue su primera meditación exitosa después de años intentando.",
    },
    {
      question: "¿Y si mi mente no para de pensar durante la sesión?",
      answer:
        "Eso es completamente normal y esperado. No se trata de 'vaciar la mente' (eso es un mito). La técnica que usamos trabaja con tu sistema nervioso directamente a través de la respiración, no requiere que 'dejes de pensar'. Tu cuerpo se relajará aunque tu mente siga activa.",
    },
    {
      question: "¿Es realmente gratis? ¿Cuál es el truco?",
      answer:
        "Sí, es 100% gratis. No hay truco. Al final de la sesión, te compartiremos información sobre nuestros retiros de transformación para quienes quieran profundizar, pero no hay ninguna obligación. La sesión tiene valor completo por sí misma.",
    },
    {
      question: "No tengo 45 minutos... ¿puedo ver la grabación después?",
      answer:
        "La experiencia es en vivo precisamente porque la energía grupal potencia los resultados. Sin embargo, si no puedes asistir, regístrate de todos modos y te enviaremos un resumen con la técnica principal que puedes practicar en 5 minutos.",
    },
    {
      question: "¿Qué necesito para participar?",
      answer:
        "Solo necesitas: 1) Un dispositivo con cámara y audio (computadora, tablet o celular), 2) Una conexión a internet estable, 3) Un lugar tranquilo donde puedas estar sin interrupciones por 45 minutos. No necesitas ropa especial ni equipamiento.",
    },
    {
      question: "¿Esto es algo religioso o espiritual?",
      answer:
        "No. Las técnicas que enseñamos están basadas en neurociencia y fisiología. Trabajamos con tu sistema nervioso, no con creencias. Personas de todas las creencias (o sin ninguna) participan y obtienen resultados.",
    },
  ];

  return (
    <section className={cn("py-20 sm:py-24 px-4", className)}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#f78080] font-semibold mb-2 uppercase tracking-wide text-sm">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] mb-4">
            ¿Tienes Dudas?
          </h2>
          <p className="text-xl text-gray-600">
            Aquí respondemos las preguntas más comunes
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#f78080]/10 px-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
