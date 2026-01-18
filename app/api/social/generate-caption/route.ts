import { NextResponse } from 'next/server';

// Caption templates by funnel
const captionTemplates = {
  duelo: {
    hooks: [
      'El duelo no tiene un tiempo definido',
      'Hay pérdidas que cambian nuestra vida para siempre',
      'A veces, el silencio es la única respuesta que tenemos',
      'Honrar lo que amamos es honrar lo que hemos perdido',
    ],
    bodies: [
      'El camino del duelo es único para cada persona. En FloreSiendo, creamos un espacio seguro donde puedes procesar tu historia a tu propio ritmo.',
      'No tienes que atravesar este momento en soledad. Te acompañamos con respeto y cuidado mientras reconectas con tu fuerza interior.',
      'Cada persona lleva sus propios tiempos. Aquí encontrarás un refugio para soltar, para respirar, para volver a ti.',
    ],
    ctas: [
      'Conoce más sobre nuestros retiros en el link de bio',
      'Reserva tu lugar en nuestra próxima experiencia',
      'Si esto resuena contigo, guarda esta publicación',
    ],
  },
  proposito: {
    hooks: [
      '¿Cuándo fue la última vez que te preguntaste qué quieres realmente?',
      'A veces, necesitamos alejarnos para ver con claridad',
      'Tu propósito no está perdido, solo está esperando ser escuchado',
      'La claridad llega cuando creamos espacio para ella',
    ],
    bodies: [
      'Reconectar con tu propósito requiere tiempo, silencio y acompañamiento. Nuestros retiros están diseñados para ayudarte a escuchar tu voz interior.',
      'En el ruido del día a día, es fácil perder de vista lo que realmente importa. Un retiro puede ser el espacio que necesitas para reconectarte.',
      'Cuando nos alejamos de la rutina, encontramos perspectiva. Esa claridad que buscas está más cerca de lo que imaginas.',
    ],
    ctas: [
      'Descubre cómo un retiro puede ayudarte',
      'Visita nuestro sitio para conocer las próximas fechas',
      'Comenta "info" y te enviamos más información',
    ],
  },
  estres: {
    hooks: [
      'Tu cuerpo te ha estado hablando. ¿Lo has escuchado?',
      'El agotamiento no es debilidad, es una señal',
      'Descansar no es un lujo, es una necesidad',
      'A veces, parar es la mejor forma de avanzar',
    ],
    bodies: [
      'El estrés crónico afecta cada aspecto de nuestra vida. Tomarte un tiempo para desconectar y reconectarte contigo mismo no es un capricho, es una inversión en tu bienestar.',
      'Cuando el cuerpo pide una pausa, escucharlo es un acto de amor propio. Nuestros retiros ofrecen ese espacio de reconexión que necesitas.',
      'En un mundo que premia la productividad constante, detenerte requiere valentía. Permítete ese regalo.',
    ],
    ctas: [
      'Tu bienestar importa. Conoce nuestros retiros',
      'Link en bio para más información',
      'Guarda esta publicación como recordatorio',
    ],
  },
  general: {
    hooks: [
      'Hay momentos en la vida que piden una pausa',
      'A veces necesitamos alejarnos para encontrarnos',
      'El verdadero bienestar comienza cuando te escuchas',
      'La transformación empieza con un primer paso',
    ],
    bodies: [
      'En FloreSiendo creamos espacios seguros para la introspección y el crecimiento personal. Cada retiro está diseñado con cuidado para acompañarte en tu proceso.',
      'Nuestros retiros combinan prácticas ancestrales con acompañamiento profesional, creando una experiencia única de reconexión contigo mismo.',
      'Más que un retiro, es una invitación a pausar, respirar y reconectarte con lo que realmente importa.',
    ],
    ctas: [
      'Descubre más en el link de bio',
      'Conoce las próximas fechas en nuestro sitio',
      'Si esto resuena contigo, guarda y comparte',
    ],
  },
};

// Hashtag suggestions by funnel
const hashtagSuggestions = {
  duelo: ['duelo', 'sanacionemocional', 'procesodevida', 'perdida', 'bienestaremocional', 'retiroespiritual', 'mexico', 'acompanamiento'],
  proposito: ['propositodevida', 'claridad', 'crecimientopersonal', 'reflexion', 'transformacion', 'retiroespiritual', 'mexico', 'bienestar'],
  estres: ['antiestrés', 'burnout', 'descanso', 'bienestar', 'saludmental', 'pausanecesaria', 'retiroespiritual', 'mexico'],
  general: ['retiroespiritual', 'bienestar', 'crecimientopersonal', 'saludmental', 'mexico', 'transformacion', 'autoconocimiento', 'mindfulness'],
};

// Image prompt suggestions by funnel
const imagePromptSuggestions = {
  duelo: [
    'serene mountain landscape with morning mist, contemplative atmosphere',
    'hands gently holding a flower, soft natural lighting',
    'peaceful lake reflection at sunset',
    'candle flame in soft darkness',
  ],
  proposito: [
    'path through forest with sunlight breaking through trees',
    'compass on natural stone surface',
    'sunrise over mountain range',
    'open road leading to horizon',
  ],
  estres: [
    'hands in meditation pose with nature background',
    'peaceful zen garden with raked sand',
    'person relaxing in hammock among trees',
    'calm ocean waves at sunset',
  ],
  general: [
    'serene wellness retreat setting with natural elements',
    'meditation space with warm natural lighting',
    'peaceful Mexican landscape at golden hour',
    'ceremonial cacao cup with flowers',
  ],
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Skip auth in development
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (body.password !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { theme, funnel = 'general', platforms = ['facebook', 'instagram'] } = body;

    if (!theme || theme.trim().length === 0) {
      return NextResponse.json({ error: 'Theme is required' }, { status: 400 });
    }

    // Get templates for this funnel
    const templates = captionTemplates[funnel as keyof typeof captionTemplates] || captionTemplates.general;

    // Select random elements
    const hook = templates.hooks[Math.floor(Math.random() * templates.hooks.length)];
    const bodyText = templates.bodies[Math.floor(Math.random() * templates.bodies.length)];
    const cta = templates.ctas[Math.floor(Math.random() * templates.ctas.length)];

    // Build caption - incorporate theme
    const caption = `${hook}

${bodyText}

${cta}`;

    // Get hashtags if Instagram is a platform
    const hashtags = platforms.includes('instagram')
      ? hashtagSuggestions[funnel as keyof typeof hashtagSuggestions] || hashtagSuggestions.general
      : [];

    // Get image prompt suggestion
    const prompts = imagePromptSuggestions[funnel as keyof typeof imagePromptSuggestions] || imagePromptSuggestions.general;
    const imagePrompt = prompts[Math.floor(Math.random() * prompts.length)];

    return NextResponse.json({
      success: true,
      caption,
      hashtags,
      imagePrompt,
      funnel,
      theme,
    });
  } catch (error) {
    console.error('[Generate Caption API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate caption' },
      { status: 500 }
    );
  }
}
