"use client";

import { useEffect, useCallback } from "react";
import { X, Leaf } from "lucide-react";
import Image from "next/image";
import type { Practica } from "@/lib/practicas-data";

interface PracticaModalProps {
  practica: Practica | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PracticaModal({ practica, isOpen, onClose }: PracticaModalProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || !practica) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-warm-gray-600 hover:text-burgundy hover:scale-110 transition-all"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {/* Image / Placeholder Header */}
        <div className={`relative h-48 ${practica.bgColor}`}>
          {practica.image ? (
            <Image
              src={practica.image}
              alt={practica.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-24 h-24 rounded-full ${practica.accentColor} flex items-center justify-center`}>
                <Leaf size={48} className="text-white" />
              </div>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <div className="mb-4">
            <h3 className={`text-2xl font-bold ${practica.textColor} mb-1`}>
              {practica.name}
            </h3>
            {practica.subtitle && (
              <p className="text-warm-gray-500 text-sm">{practica.subtitle}</p>
            )}
            {/* Tags */}
            <div className="flex gap-2 mt-3">
              {practica.sessions && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${practica.bgColor} ${practica.textColor}`}>
                  {practica.sessions}
                </span>
              )}
              {practica.optional && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-warm-gray-100 text-warm-gray-600">
                  Opcional
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-warm-gray-600 leading-relaxed mb-4">
            {practica.description}
          </p>

          {/* Details */}
          <p className="text-warm-gray-500 text-sm leading-relaxed">
            {practica.details}
          </p>

          {/* CTA */}
          <div className="mt-6 pt-4 border-t border-warm-gray-100">
            <a
              href="/practicas-ancestrales"
              className={`inline-flex items-center text-sm font-medium ${practica.textColor} hover:underline`}
            >
              Ver todas las prácticas
              <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
