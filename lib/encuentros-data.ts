// lib/encuentros-data.ts
// Data and types for Encuentros (Retreats)

export interface ScheduleItem {
  time: string;
  activity: string;
  description?: string;
}

export interface DaySchedule {
  day: string; // "Día 1 - Jueves"
  date: string; // "19 de Febrero"
  items: ScheduleItem[];
}

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
  slug: "febrero-2026",
  title: "Encuentro de Febrero",
  subtitle: "4 días de crecimiento personal",
  startDate: "2026-02-19",
  endDate: "2026-02-22",
  displayDates: "19-22 de Febrero, 2026",
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
    "Alojamiento 2-3 noches",
    "Alimentación completa (dieta de preparación)",
    "2-3 ceremonias con Planta Amazónica",
    "Círculos de integración diarios",
    "Sesiones de breathwork",
    "Acompañamiento personalizado",
    "Integración post-retiro (1 sesión)",
  ],

  notIncluded: [
    "Transporte aéreo o terrestre a Morelos",
    "Prácticas opcionales",
  ],

  schedule: [
    {
      day: "Día 1 - Jueves",
      date: "19 de Febrero",
      items: [
        { time: "17:00", activity: "Registro", description: "Check-in y bienvenida" },
        { time: "18:00", activity: "Merienda", description: "Llegada y bienvenida" },
        { time: "20:30", activity: "Preparación", description: "Círculo de apertura e intenciones" },
        { time: "22:30", activity: "Sesión con Planta Amazónica", description: "Primera ceremonia nocturna" },
      ],
    },
    {
      day: "Día 2 - Viernes",
      date: "20 de Febrero",
      items: [
        { time: "09:00", activity: "Rana Mono Gigante (opcional)", description: "Práctica de purificación" },
        { time: "09:30", activity: "Desayuno" },
        { time: "11:00", activity: "Integración del grupo", description: "Compartir experiencias" },
        { time: "13:00", activity: "El Sapo de Sonora (opcional)", description: "Ceremonia breve e intensa" },
        { time: "14:00", activity: "Almuerzo" },
        { time: "17:00", activity: "Registro", description: "Check-in para nuevos participantes" },
        { time: "18:00", activity: "Merienda" },
        { time: "20:30", activity: "Preparación" },
        { time: "22:30", activity: "Sesión con Planta Amazónica", description: "Segunda ceremonia nocturna" },
      ],
    },
    {
      day: "Día 3 - Sábado",
      date: "21 de Febrero",
      items: [
        { time: "09:00", activity: "Rana Mono Gigante (opcional)", description: "Práctica de purificación" },
        { time: "09:30", activity: "Desayuno" },
        { time: "11:00", activity: "Integración del grupo", description: "Compartir experiencias" },
        { time: "13:00", activity: "El Sapo de Sonora (opcional)", description: "Ceremonia breve e intensa" },
        { time: "14:00", activity: "Almuerzo" },
        { time: "18:00", activity: "Merienda" },
        { time: "20:30", activity: "Preparación" },
        { time: "22:00", activity: "Sesión con Planta Amazónica", description: "Tercera ceremonia nocturna" },
      ],
    },
    {
      day: "Día 4 - Domingo",
      date: "22 de Febrero",
      items: [
        { time: "09:00", activity: "Rana Mono Gigante (opcional)", description: "Práctica de purificación" },
        { time: "09:30", activity: "Desayuno" },
        { time: "11:00", activity: "Integración del grupo", description: "Círculo de cierre" },
        { time: "13:00", activity: "El Sapo de Sonora (opcional)", description: "Ceremonia breve e intensa" },
        { time: "14:30", activity: "Almuerzo y despedida" },
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
      role: "Cofundador & Facilitador & Psicoterapeuta",
      bio: `Psicoterapeuta con formación en acompañamiento de procesos de expansión de consciencia.
      Aporta una perspectiva integrativa que combina la psicología moderna con la sabiduría ancestral,
      creando un espacio seguro para la exploración interior.`,
      image: "",
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

  whatsappNumber: "526182301481",
  whatsappMessage: "Hola, me interesa el Encuentro de Febrero 2026. Me gustaría recibir más información sobre el proceso de inversión personalizada.",
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
