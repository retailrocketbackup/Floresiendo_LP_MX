// lib/encuentros-data.ts
// Data and types for Encuentros (Retreats)

// Activity categories for visual distinction
export type ActivityCategory =
  | "ceremony" // Main plant ceremonies
  | "optional" // Kambó, Bufo, Yopo
  | "integration" // Sharing circles
  | "workshop" // Talleres, breathwork
  | "meal" // Meals
  | "preparation" // Pre-ceremony prep
  | "admin"; // Registration, departure

export interface ScheduleItem {
  time: string;
  activity: string;
  description?: string;
  category?: ActivityCategory;
  isOptional?: boolean;
}

export interface DaySchedule {
  day: string; // "Día 1"
  weekday: string; // "Jueves"
  date: string; // "19 de Febrero"
  theme: string; // "Llegada y Apertura"
  tagline?: string; // "Cruzar el umbral hacia tu interior"
  items: ScheduleItem[];
}

// Category configuration for UI rendering
export const categoryConfig: Record<
  ActivityCategory,
  { icon: string; label: string; colorClass: string }
> = {
  ceremony: {
    icon: "moon",
    label: "Ceremonia",
    colorClass: "bg-purple-900 text-white",
  },
  optional: {
    icon: "star",
    label: "Opcional",
    colorClass: "bg-amber-100 text-amber-800",
  },
  integration: {
    icon: "heart",
    label: "Integración",
    colorClass: "bg-teal-100 text-teal-800",
  },
  workshop: {
    icon: "sparkles",
    label: "Taller",
    colorClass: "bg-indigo-100 text-indigo-800",
  },
  meal: {
    icon: "utensils",
    label: "Comida",
    colorClass: "bg-orange-100 text-orange-800",
  },
  preparation: {
    icon: "flame",
    label: "Preparación",
    colorClass: "bg-rose-100 text-rose-800",
  },
  admin: {
    icon: "clipboard",
    label: "Logística",
    colorClass: "bg-gray-100 text-gray-800",
  },
};

export interface Facilitator {
  name: string;
  role: string;
  bio: string;
  image?: string;
  imagePosition?: string; // CSS object-position for face centering
  imageScale?: number; // Scale factor for zooming into face
}

export interface Encuentro {
  slug: string;
  title: string;
  subtitle: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  displayDates: string; // "19-22 de Febrero, 2026"
  location: string;
  venue: string;
  spotsTotal: number;
  spotsRemaining: number;
  status: "upcoming" | "full" | "past";

  // Content
  description: string;
  medicines: string[];
  included: string[];
  notIncluded: string[];
  schedule: DaySchedule[];
  facilitators: Facilitator[];

  // Requirements
  preparation: string[];
  contraindications: string[];

  // CTA
  whatsappNumber: string;
  whatsappMessage: string;
}

// February 2026 Encuentro Data
export const encuentroFebrero2026: Encuentro = {
  slug: "marzo-2026",
  title: "Encuentro de Marzo",
  subtitle: "4 días de crecimiento personal",
  startDate: "2026-03-05",
  endDate: "2026-03-08",
  displayDates: "5-8 de Marzo, 2026",
  location: "Morelos, México",
  venue: "Santuario FloreSiendo",
  spotsTotal: 15,
  spotsRemaining: 12,
  status: "upcoming",

  description: `Un retiro íntimo de 4 días diseñado para facilitar un proceso de bienestar integral
  y reconexión con tu esencia. En un entorno natural privilegiado, te acompañamos en un viaje
  de autodescubrimiento con prácticas ancestrales bajo la guía de facilitadores experimentados.`,

  medicines: [
    "Planta Amazónica (2 sesiones)",
    "Rana Mono Gigante (opcional)",
    "El Sapo de Sonora (opcional)",
  ],

  included: [
    "Alojamiento 3 noches (o 2 noches en opción corta)",
    "Alimentación completa (dieta de preparación)",
    "2-3 ceremonias con Planta Amazónica",
    "Círculos de integración terapéutica",
    "Taller 'Encuentra tu Propósito' (diario)",
    "Sesiones de breathwork y meditación",
    "Acompañamiento personalizado de facilitadores",
    "1 sesión de integración post-retiro",
    "Acceso a comunidad de participantes",
  ],

  notIncluded: [
    "Transporte aéreo/terrestre a Morelos",
    "Prácticas opcionales (Kambó, Bufo, Yopo)",
    "Gastos personales",
    "Materiales de escritura (traer libreta y pluma)",
  ],

  schedule: [
    {
      day: "Día 1",
      weekday: "Jueves",
      date: "5 de Marzo",
      theme: "Llegada y Apertura",
      tagline: "Cruzar el umbral hacia tu interior",
      items: [
        { time: "17:00", activity: "Bienvenida al Santuario", description: "Registro e instalación en tu espacio", category: "admin" },
        { time: "18:00", activity: "Merienda", description: "Primera conexión con el grupo", category: "meal" },
        { time: "20:30", activity: "Círculo de Apertura", description: "Intenciones y preparación ceremonial", category: "preparation" },
        { time: "22:30", activity: "Ceremonia Nocturna", description: "Primera sesión con Planta Amazónica", category: "ceremony" },
      ],
    },
    {
      day: "Día 2",
      weekday: "Viernes",
      date: "6 de Marzo",
      theme: "Inmersión Profunda",
      tagline: "Soltar lo que ya no sirve",
      items: [
        { time: "09:00", activity: "Kambó", description: "Práctica de purificación profunda", category: "optional", isOptional: true },
        { time: "09:30", activity: "Desayuno", category: "meal" },
        { time: "11:00", activity: "Círculo de Integración", description: "Compartir desde el corazón", category: "integration" },
        { time: "13:00", activity: "Bufo", description: "Ceremonia breve e intensa", category: "optional", isOptional: true },
        { time: "14:00", activity: "Almuerzo", category: "meal" },
        { time: "15:30", activity: "Taller: Encuentra tu Propósito", description: "Meditación guiada y reflexión", category: "workshop" },
        { time: "17:00", activity: "Registro", description: "Bienvenida a nuevos participantes", category: "admin" },
        { time: "18:00", activity: "Merienda", category: "meal" },
        { time: "20:30", activity: "Preparación Ceremonial", category: "preparation" },
        { time: "22:30", activity: "Ceremonia Nocturna", description: "Segunda sesión con Planta Amazónica", category: "ceremony" },
      ],
    },
    {
      day: "Día 3",
      weekday: "Sábado",
      date: "7 de Marzo",
      theme: "Expansión",
      tagline: "Encontrar tu centro y tu luz",
      items: [
        { time: "09:00", activity: "Kambó", description: "Práctica de purificación profunda", category: "optional", isOptional: true },
        { time: "09:30", activity: "Desayuno", category: "meal" },
        { time: "11:00", activity: "Círculo de Integración", description: "Compartir desde el corazón", category: "integration" },
        { time: "13:00", activity: "Bufo", description: "Ceremonia breve e intensa", category: "optional", isOptional: true },
        { time: "14:00", activity: "Almuerzo", category: "meal" },
        { time: "15:30", activity: "Breathwork y Meditación", description: "Trabajo de respiración consciente", category: "workshop" },
        { time: "18:00", activity: "Merienda", category: "meal" },
        { time: "20:30", activity: "Preparación Ceremonial", category: "preparation" },
        { time: "22:00", activity: "Ceremonia Nocturna", description: "Tercera sesión con Planta Amazónica", category: "ceremony" },
      ],
    },
    {
      day: "Día 4",
      weekday: "Domingo",
      date: "8 de Marzo",
      theme: "Integración y Cierre",
      tagline: "Renacer con claridad y propósito",
      items: [
        { time: "09:00", activity: "Kambó", description: "Práctica de purificación profunda", category: "optional", isOptional: true },
        { time: "09:30", activity: "Desayuno", category: "meal" },
        { time: "10:30", activity: "Taller: Tu Nueva Vida", description: "Integración y herramientas para el regreso", category: "workshop" },
        { time: "12:00", activity: "Círculo de Cierre", description: "Compartir final y compromisos", category: "integration" },
        { time: "13:00", activity: "Bufo", description: "Ceremonia breve e intensa", category: "optional", isOptional: true },
        { time: "14:30", activity: "Almuerzo de Despedida", description: "Celebración y nuevos comienzos", category: "meal" },
      ],
    },
  ],

  facilitators: [
    {
      name: "Rodrigo Roble",
      role: "Facilitador Egresado de Escuela FloreSiendo",
      bio: `Facilitador con amplia experiencia en acompañamiento de procesos de transformación.
      Su enfoque integra la conexión con la naturaleza y las prácticas ancestrales para guiar
      experiencias profundas de bienestar y autodescubrimiento.`,
      image: "/images/Roble.jpg",
    },
    {
      name: "Ramon Henriquez",
      role: "Terapeuta Holistico",
      bio: `Terapeuta psicoemocional con formación en programación neurlinguista (PNL) y psicoterapia integrativa, con más de 10 años de experiencia en acompañamiento de procesos de expansión de consciencia.
      Aporta una perspectiva integrativa que combina herramientas psicoterapeuticas modernas para trabajar la mente con la sabiduría ancestral, creando un espacio seguro para la exploración interior.`,
      image: "/images/ramon-henriquez.png",
    },
    {
      name: "Karla Nava",
      role: "Facilitadora en Formación",
      bio: `Facilitadora con experiencia en crear espacios seguros y amorosos para el trabajo interior.
      Su presencia cálida y su capacidad de escucha profunda acompañan a cada participante
      en su proceso único de reconexión.`,
      image: "",
    },
  ],

  preparation: [
    "Dieta de preparación 7 días antes (sin carnes rojas, alcohol, drogas recreativas)",
    "Suspender medicamentos indicados (consultar con facilitador)",
    "Evitar relaciones sexuales 3 días antes",
    "Llegar con intención clara para el trabajo",
    "Llenado de formulario de salud obligatorio",
  ],

  contraindications: [
    "Trastornos psicóticos o esquizofrenia",
    "Uso de antidepresivos ISRS/IMAO (requiere suspensión supervisada)",
    "Problemas cardíacos graves",
    "Embarazo o lactancia",
    "Hipertensión no controlada",
  ],

  whatsappNumber: "524427845308",
  whatsappMessage: "Hola, me interesa el Encuentro de Marzo 2026. Me gustaría recibir más información sobre el proceso de inversión personalizada.",
};

// All encuentros
export const encuentros: Encuentro[] = [encuentroFebrero2026];

// Helper function to get encuentro by slug
export function getEncuentroBySlug(slug: string): Encuentro | undefined {
  return encuentros.find((e) => e.slug === slug);
}

// Helper function to get all upcoming encuentros
export function getUpcomingEncuentros(): Encuentro[] {
  return encuentros.filter((e) => e.status === "upcoming");
}

// Generic retreat inclusions for use across all pages
export const retreatInclusions = {
  included: [
    "Alojamiento 3 noches (o 2 noches en opción corta)",
    "Alimentación completa (dieta de preparación)",
    "2-3 ceremonias con Planta Amazónica",
    "Círculos de integración terapéutica",
    "Taller 'Encuentra tu Propósito' (diario)",
    "Sesiones de breathwork y meditación",
    "Acompañamiento personalizado de facilitadores",
    "1 sesión de integración post-retiro",
    "Acceso a comunidad de participantes",
  ],
  notIncluded: [
    "Transporte aéreo/terrestre a Morelos",
    "Prácticas opcionales (Kambó, Bufo, Yopo)",
    "Gastos personales",
    "Materiales de escritura (traer libreta y pluma)",
  ],
};
