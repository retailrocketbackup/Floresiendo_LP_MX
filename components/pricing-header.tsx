"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function PricingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-gray-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Back Link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-medium hidden sm:inline">Volver al inicio</span>
          </Link>

          {/* Logo - Centered */}
          <Link href="/" className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2">
            <Image
              src="/floresiendo-logo-boton.webp"
              alt="FloreSiendo Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full ring-2 ring-white/20 group-hover:ring-coral/50 transition-all"
            />
            <span className="text-lg font-bold text-white hidden sm:inline">
              FloreSiendo
            </span>
          </Link>

          {/* CTA - Right side */}
          <a
            href="#reservar"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('.max-w-2xl.mx-auto.group')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }}
            className="px-4 py-2 bg-coral hover:bg-coral-dark text-white text-sm font-semibold rounded-full transition-all hover:scale-105"
          >
            Reservar
          </a>
        </div>
      </div>
    </header>
  );
}
