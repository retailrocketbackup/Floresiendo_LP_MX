// lib/practicas-data.ts
// Shared data for all practices (ancestral and complementary)

export interface Practica {
  slug: string;
  name: string;
  nameEn: string;
  subtitle?: string;
  subtitleEn?: string;
  description: string; // Short description for cards
  descriptionEn: string;
  details: string; // Full description for modal/page
  detailsEn: string;
  image: string; // Image path (placeholder for now)
  optional?: boolean; // Whether the practice is optional in retreats
  sessions?: string; // e.g., "2-3 sesiones"
  sessionsEn?: string;
  // Styling
  bgColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
}

export const practicas: Practica[] = [
  {
    slug: "ceremonia-bienestar",
    name: "Planta Amazónica",
    nameEn: "Amazonian Plant",
    sessions: "2-3 sesiones",
    sessionsEn: "2-3 sessions",
    description:
      "Experimenta un viaje que trasciende lo ordinario, abriendo caminos hacia una profunda introspección psicológica y bienestar emocional.",
    descriptionEn:
      "Experience a journey that transcends the ordinary, opening paths toward profound psychological introspection and emotional wellbeing.",
    details:
      "Esta preparación natural ancestral actúa como un poderoso catalizador para la conexión mente-cuerpo-espíritu, ayudando a liberar bloqueos mentales y fomentar el crecimiento interior. En un entorno seguro y amoroso, te guía a través de una exploración interna profunda, promoviendo la renovación y el bienestar duradero.",
    detailsEn:
      "This natural ancestral preparation acts as a powerful catalyst for the mind-body-spirit connection, helping to release mental blocks and foster inner growth. In a safe and loving environment, it guides you through a deep internal exploration, promoting renewal and lasting wellbeing.",
    image: "/images/ceremonia-bienestar.jpg",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
    textColor: "text-gold-dark",
    accentColor: "bg-gold",
  },
  {
    slug: "integracion-ceremonial",
    name: "El Sapo de Sonora",
    nameEn: "The Sonoran Toad",
    optional: true,
    description:
      "Embárcate en un encuentro breve pero profundo con uno de los regalos más potentes de la naturaleza.",
    descriptionEn:
      "Embark on a brief but profound encounter with one of nature's most potent gifts.",
    details:
      "Esta ceremonia única ofrece una intensa liberación emocional y claridad espiritual en un corto periodo de tiempo, apoyando avances personales y una consciencia expandida.",
    detailsEn:
      "This unique ceremony offers an intense emotional release and spiritual clarity in a short period of time, supporting personal breakthroughs and expanded consciousness.",
    image: "/images/integracion-ceremonial.jpg",
    bgColor: "bg-coral/10",
    borderColor: "border-coral/30",
    textColor: "text-coral-dark",
    accentColor: "bg-coral",
  },
  {
    slug: "purificacion-ancestral",
    name: "Rana Mono Gigante",
    nameEn: "Giant Monkey Frog",
    subtitle: "Práctica de Purificación",
    subtitleEn: "Purification Practice",
    optional: true,
    description:
      "Descubre un intenso ritual de purificación que aprovecha la secreción de un extraordinario anfibio.",
    descriptionEn:
      "Discover an intense purification ritual that harnesses the secretion of an extraordinary amphibian.",
    details:
      "Aplicada mediante técnicas tradicionales precisas, esta práctica activa los procesos naturales de limpieza del cuerpo, liberando toxinas y fortaleciendo el sistema inmunológico. La experiencia es breve pero poderosa, ayudando a restaurar la energía, claridad y equilibrio desde adentro.",
    detailsEn:
      "Applied through precise traditional techniques, this practice activates the body's natural cleansing processes, releasing toxins and strengthening the immune system. The experience is brief but powerful, helping to restore energy, clarity, and balance from within.",
    image: "/images/purificacion-ancestral.jpg",
    bgColor: "bg-burgundy/10",
    borderColor: "border-burgundy/30",
    textColor: "text-burgundy",
    accentColor: "bg-burgundy",
  },
  {
    slug: "tradicion-ceremonial",
    name: "El Rapé de los Dioses",
    nameEn: "Sacred Rapé",
    subtitle: "Tradición Ceremonial Ancestral",
    subtitleEn: "Ancestral Ceremonial Tradition",
    optional: true,
    description:
      "Adéntrate en una tradición ceremonial ancestral que utiliza un rapé sagrado natural derivado de una semilla poderosa.",
    descriptionEn:
      "Enter an ancestral ceremonial tradition that uses a sacred natural snuff derived from a powerful seed.",
    details:
      "Esta práctica abre la mente a nuevas perspectivas y estados elevados de consciencia, frecuentemente acompañados de una limpieza física y sutil. Enraizada en la sabiduría ancestral, sirve como puerta hacia una conexión más profunda con uno mismo y el cosmos.",
    detailsEn:
      "This practice opens the mind to new perspectives and elevated states of consciousness, often accompanied by physical and subtle cleansing. Rooted in ancestral wisdom, it serves as a gateway to a deeper connection with oneself and the cosmos.",
    image: "/images/tradicion-ceremonial.jpg",
    bgColor: "bg-warm-gray-100",
    borderColor: "border-warm-gray-200",
    textColor: "text-warm-gray-800",
    accentColor: "bg-warm-gray-600",
  },
  {
    slug: "meditacion",
    name: "Meditación",
    nameEn: "Meditation",
    subtitle: "Conexión Interior",
    subtitleEn: "Inner Connection",
    description:
      "Prácticas guiadas de meditación para cultivar la presencia, la calma mental y la conexión con tu ser interior.",
    descriptionEn:
      "Guided meditation practices to cultivate presence, mental calm, and connection with your inner being.",
    details:
      "A través de técnicas meditativas ancestrales y contemporáneas, facilitamos un espacio para el silencio interior y la observación consciente. Estas prácticas ayudan a reducir el estrés, aumentar la claridad mental y profundizar la conexión contigo mismo. Cada sesión está diseñada para acompañar tu proceso de integración y bienestar.",
    detailsEn:
      "Through ancestral and contemporary meditative techniques, we facilitate a space for inner silence and conscious observation. These practices help reduce stress, increase mental clarity, and deepen the connection with yourself. Each session is designed to accompany your integration and wellbeing process.",
    image: "/images/meditacion.jpg",
    bgColor: "bg-sage/10",
    borderColor: "border-sage/30",
    textColor: "text-sage-dark",
    accentColor: "bg-sage",
  },
  {
    slug: "integracion-terapeutica",
    name: "Integración Terapéutica",
    nameEn: "Therapeutic Integration",
    subtitle: "Círculos de Preparación e Integración",
    subtitleEn: "Preparation & Integration Circles",
    description:
      "Círculos grupales antes y después de cada ceremonia para preparar, compartir y procesar la experiencia.",
    descriptionEn:
      "Group circles before and after each ceremony to prepare, share, and process the experience.",
    details:
      "Nuestro equipo de facilitadores y psicoterapeutas guía círculos de preparación e integración alrededor de cada ceremonia. Estos espacios grupales permiten establecer intenciones, compartir experiencias, recibir retroalimentación y trabajar dinámicas de inteligencia emocional. Es una parte fundamental del proceso terapéutico del encuentro.",
    detailsEn:
      "Our team of facilitators and psychotherapists guides preparation and integration circles around each ceremony. These group spaces allow setting intentions, sharing experiences, receiving feedback, and working on emotional intelligence dynamics. It is a fundamental part of the therapeutic process of the retreat.",
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

// Default practices for encuentros (included first, then optional)
export const defaultEncuentroPracticas = [
  "meditacion",
  "ceremonia-bienestar",
  "integracion-terapeutica",
  "purificacion-ancestral",
  "integracion-ceremonial",
  "tradicion-ceremonial",
];
