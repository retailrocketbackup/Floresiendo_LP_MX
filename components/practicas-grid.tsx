"use client";

import { useState } from "react";
import { Leaf } from "lucide-react";
import Image from "next/image";
import { practicas, defaultEncuentroPracticas, type Practica } from "@/lib/practicas-data";
import { PracticaModal } from "./practica-modal";

interface PracticasGridProps {
  practicaSlugs?: string[];
  title?: string;
}

export function PracticasGrid({
  practicaSlugs = defaultEncuentroPracticas,
  title = "Prácticas del Encuentro",
}: PracticasGridProps) {
  const [selectedPractica, setSelectedPractica] = useState<Practica | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get practices based on slugs
  const practicasToShow = practicaSlugs
    .map((slug) => practicas.find((p) => p.slug === slug))
    .filter((p): p is Practica => p !== undefined);

  const openModal = (practica: Practica) => {
    setSelectedPractica(practica);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPractica(null);
  };

  return (
    <>
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#8b2a4a] text-center mb-8">
            {title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {practicasToShow.map((practica) => (
              <button
                key={practica.slug}
                onClick={() => openModal(practica)}
                className={`${practica.bgColor} p-4 md:p-6 rounded-xl text-center border ${practica.borderColor} hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer group`}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 ${practica.accentColor} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                  {practica.image ? (
                    <Image
                      src={practica.image}
                      alt={practica.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  )}
                </div>
                <p className={`text-sm md:text-lg font-medium ${practica.textColor}`}>
                  {practica.name}
                </p>
                {practica.sessions && (
                  <p className="text-xs md:text-sm text-warm-gray-500 mt-1">
                    {practica.sessions}
                  </p>
                )}
                {practica.optional && (
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-warm-gray-200 text-warm-gray-600 rounded-full">
                    Opcional
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="text-center text-warm-gray-500 text-sm mt-6">
            Haz clic en cada práctica para conocer más detalles
          </p>
        </div>
      </section>

      <PracticaModal
        practica={selectedPractica}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
