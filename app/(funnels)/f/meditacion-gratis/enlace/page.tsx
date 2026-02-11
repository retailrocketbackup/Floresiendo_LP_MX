"use client";

import { useState } from "react";
import Link from "next/link";
import { Video, Copy, Check, Calendar, Clock } from "lucide-react";

const MEET_URL = "https://meet.google.com/vom-orye-woa";

export default function EnlaceMeditacionPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MEET_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdf8f4] to-white px-4 pt-16 sm:pt-24">
      <div className="max-w-md w-full text-center mx-auto">
        <div className="w-16 h-16 bg-[#8b2a4a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Video className="w-8 h-8 text-[#8b2a4a]" />
        </div>

        <h1 className="text-2xl font-bold text-[#8b2a4a] mb-2">
          Meditación Guiada en Vivo
        </h1>

        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Lun 17 Feb
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            8:00 PM
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <a
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#8b2a4a] hover:bg-[#722240] text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg mb-4"
          >
            Entrar a Google Meet
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#8b2a4a] transition-colors py-3 px-4"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar enlace
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Conéctate 5 min antes para probar tu audio.
        </p>

        <div className="mt-8">
          <Link
            href="/f/meditacion-gratis"
            className="text-[#8b2a4a] hover:text-[#722240] text-sm transition-colors py-3 inline-block"
          >
            Ver detalles del evento →
          </Link>
        </div>
      </div>
    </main>
  );
}
