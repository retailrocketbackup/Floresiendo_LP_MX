"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: "es" | "en") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => switchLocale("es")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "es"
            ? "bg-coral text-white"
            : "text-warm-gray-500 hover:text-coral"
        }`}
        aria-label="Cambiar a Espa\u00f1ol"
      >
        ES
      </button>
      <span className="text-warm-gray-300">|</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "bg-coral text-white"
            : "text-warm-gray-500 hover:text-coral"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
