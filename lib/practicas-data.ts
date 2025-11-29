// lib/practicas-data.ts
// Shared data for all practices (ancestral and complementary)

export interface Practica {
  slug: string;
  name: string;
  subtitle?: string;
  description: string; // Short description for cards
  details: string; // Full description for modal/page
  image: string; // Image path (placeholder for now)
  optional?: boolean; // Whether the practice is optional in retreats
  sessions?: string; // e.g., "2-3 sesiones"
  // Styling
  bgColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
}

export const practicas: Practica[] = [
  {
    slug: "planta-amazonica",
    name: "Planta Amazónica",
    sessions: "2-3 sesiones",
    description:
      "Experimenta un viaje que trasciende lo ordinario, abriendo caminos hacia una profunda introspección psicológica y bienestar emocional.",
    details:
      "Esta preparación natural ancestral actúa como un poderoso catalizador para la conexión mente-cuerpo-espíritu, ayudando a liberar bloqueos mentales y fomentar el crecimiento interior. En un entorno seguro y amoroso, te guía a través de una exploración interna profunda, promoviendo la renovación y el bienestar duradero.",
    image: "/images/planta-amazonica.jpg",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
    textColor: "text-gold-dark",
    accentColor: "bg-gold",
  },
  {
    slug: "sapo-sonora",
    name: "El Sapo de Sonora",
    optional: true,
    description:
      "Embárcate en un encuentro breve pero profundo con uno de los regalos más potentes de la naturaleza.",
    details:
      "Esta ceremonia única ofrece una intensa liberación emocional y claridad espiritual en un corto periodo de tiempo, apoyando avances personales y una consciencia expandida.",
    image: "/images/sapo-sonora.jpg",
    bgColor: "bg-coral/10",
    borderColor: "border-coral/30",
    textColor: "text-coral-dark",
    accentColor: "bg-coral",
  },
  {
    slug: "rana-mono-gigante",
    name: "Rana Mono Gigante",
    subtitle: "Práctica de Purificación",
    optional: true,
    description:
      "Descubre un intenso ritual de purificación que aprovecha la secreción de un extraordinario anfibio.",
    details:
      "Aplicada mediante técnicas tradicionales precisas, esta práctica activa los procesos naturales de limpieza del cuerpo, liberando toxinas y fortaleciendo el sistema inmunológico. La experiencia es breve pero poderosa, ayudando a restaurar la energía, claridad y equilibrio desde adentro.",
    image: "/images/rana-mono-gigante.jpg",
    bgColor: "bg-burgundy/10",
    borderColor: "border-burgundy/30",
    textColor: "text-burgundy",
    accentColor: "bg-burgundy",
  },
  {
    slug: "rape-dioses",
    name: "El Rapé de los Dioses",
    subtitle: "Tradición Ceremonial Ancestral",
    optional: true,
    description:
      "Adéntrate en una tradición ceremonial ancestral que utiliza un rapé sagrado natural derivado de una semilla poderosa.",
    details:
      "Esta práctica abre la mente a nuevas perspectivas y estados elevados de consciencia, frecuentemente acompañados de una limpieza física y sutil. Enraizada en la sabiduría ancestral, sirve como puerta hacia una conexión más profunda con uno mismo y el cosmos.",
    image: "/images/rape-dioses.jpg",
    bgColor: "bg-warm-gray-100",
    borderColor: "border-warm-gray-200",
    textColor: "text-warm-gray-800",
    accentColor: "bg-warm-gray-600",
  },
  {
    slug: "meditacion",
    name: "Meditación",
    subtitle: "Conexión Interior",
    description:
      "Prácticas guiadas de meditación para cultivar la presencia, la calma mental y la conexión con tu ser interior.",
    details:
      "A través de técnicas meditativas ancestrales y contemporáneas, facilitamos un espacio para el silencio interior y la observación consciente. Estas prácticas ayudan a reducir el estrés, aumentar la claridad mental y profundizar la conexión contigo mismo. Cada sesión está diseñada para acompañar tu proceso de integración y bienestar.",
    image: "/images/meditacion.jpg",
    bgColor: "bg-sage/10",
    borderColor: "border-sage/30",
    textColor: "text-sage-dark",
    accentColor: "bg-sage",
  },
  {
    slug: "psicoterapia-integrativa",
    name: "Psicoterapia Integrativa",
    subtitle: "Acompañamiento Terapéutico",
    description:
      "Sesiones de acompañamiento psicoterapéutico que integran diversas corrientes para tu proceso de bienestar.",
    details:
      "Nuestro equipo de psicoterapeutas ofrece un espacio seguro para explorar y procesar experiencias. Combinamos enfoques humanistas, transpersonales y somáticos para acompañar tu proceso de integración y crecimiento personal de manera holística. Cada sesión está adaptada a tus necesidades individuales.",
    image: "/images/psicoterapia.jpg",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-200",
    textColor: "text-purple-800",
    accentColor: "bg-purple-500",
  },
];

// Helper to get a practice by slug
export function getPracticaBySlug(slug: string): Practica | undefined {
  return practicas.find((p) => p.slug === slug);
}

// Helper to get practices for an encuentro (by slugs)
export function getPracticasForEncuentro(slugs: string[]): Practica[] {
  return slugs
    .map((slug) => getPracticaBySlug(slug))
    .filter((p): p is Practica => p !== undefined);
}

// Default practices for encuentros
export const defaultEncuentroPracticas = [
  "planta-amazonica",
  "rana-mono-gigante",
  "sapo-sonora",
  "meditacion",
  "rape-dioses",
  "psicoterapia-integrativa",
];
