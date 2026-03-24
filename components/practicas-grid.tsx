"use client";

import { useState } from "react";
import { Leaf } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { practicas, defaultEncuentroPracticas, type Practica } from "@/lib/practicas-data";
import { PracticaModal } from "./practica-modal";
import { useTranslations } from "next-intl";

interface PracticasGridProps {
  practicaSlugs?: string[];
  title?: string;
}

export function PracticasGrid({
  practicaSlugs = defaultEncuentroPracticas,
  title,
}: PracticasGridProps) {
  const [selectedPractica, setSelectedPractica] = useState<Practica | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("encounters");
  const locale = useLocale();
  const isEn = locale === "en";

  const displayTitle = title || t("detail_practices_title");

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

  const getName = (p: Practica) => isEn ? (p.nameEn || p.name) : p.name;
  const getSessions = (p: Practica) => isEn ? (p.sessionsEn || p.sessions) : p.sessions;

  return (
    <>
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#8b2a4a] text-center mb-8">
            {displayTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {practicasToShow.map((practica) => (
              <button
                key={practica.slug}
                onClick={() => openModal(practica)}
                className={`${practica.bgColor} p-4 md:p-6 rounded-xl text-center border ${practica.borderColor} hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer group`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  {practica.image ? (
                    <Image
                      src={practica.image}
                      alt={getName(practica)}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${practica.accentColor} flex items-center justify-center`}>
                      <Leaf className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  )}
                </div>
                <p className={`text-sm md:text-lg font-medium ${practica.textColor}`}>
                  {getName(practica)}
                </p>
                {practica.sessions && (
                  <p className="text-xs md:text-sm text-warm-gray-500 mt-1">
                    {getSessions(practica)}
                  </p>
                )}
                {practica.optional && (
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-warm-gray-200 text-warm-gray-600 rounded-full">
                    {t("detail_optional")}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="text-center text-warm-gray-500 text-sm mt-6">
            {t("detail_click_hint")}
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
