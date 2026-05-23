import type { Payload } from 'payload'

const NAV_DEFAULT = [
  { label: 'Inicio', href: '/' },
  { label: 'Publicaciones', href: '/publicaciones' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Productos', href: '/productos' },
  { label: 'Acerca de', href: '/acerca-de' },
  { label: 'Cotizar', href: '/cotizar' },
]

const POSTS_DEFAULT = [
  {
    title: 'Impresión 3D en El Alto: por qué Bolivia es un mercado en crecimiento',
    slug: 'impresion-3d-en-el-alto',
    category: 'industria',
    excerpt:
      'El parque industrial de El Alto y la cercanía con La Paz están convirtiendo a la región en un polo de manufactura aditiva.',
    readTime: '6 min',
  },
  {
    title: 'PLA vs PETG en el altiplano: cómo afecta la altitud a tus impresiones',
    slug: 'pla-vs-petg-altiplano',
    category: 'materiales',
    excerpt:
      'A 4.000 metros sobre el nivel del mar, la temperatura, humedad y presión hacen rendir distinto al filamento.',
    readTime: '8 min',
  },
  {
    title: 'Caso de uso: piezas de repuesto para una cooperativa minera de Oruro',
    slug: 'caso-cooperativa-minera',
    category: 'caso-de-uso',
    excerpt:
      'Diseñamos e imprimimos engranajes de reemplazo para maquinaria que ya no tiene repuestos de fábrica.',
    readTime: '5 min',
  },
  {
    title: 'Guía rápida: tu primer modelo 3D en Blender, listo para imprimir',
    slug: 'guia-modelado-blender-principiantes',
    category: 'tutorial',
    excerpt:
      'Un recorrido de 20 minutos por las herramientas que usás en nuestro estudio paceño para preparar archivos imprimibles.',
    readTime: '12 min',
  },
]

const PRODUCTS_DEFAULT = [
  { name: 'Cholita Paceña — Edición coleccionista', slug: 'cholita-pacena-coleccion', category: 'figuras', price: 220, stock: 8, materials: ['Resina'] },
  { name: 'Ekeko miniatura — souvenir', slug: 'ekeko-mini', category: 'figuras', price: 70, stock: 25, materials: ['PLA'] },
  { name: 'Llavero Wiphala', slug: 'llavero-wiphala', category: 'accesorios', price: 25, stock: 60, materials: ['PLA', 'PETG'] },
  { name: 'Soporte para celular — Illimani', slug: 'soporte-illimani', category: 'utilitarios', price: 90, stock: 30, materials: ['PLA'] },
  { name: 'Maceta geométrica andina', slug: 'maceta-andina', category: 'decoración', price: 110, stock: 18, materials: ['PLA', 'PETG'] },
  { name: 'Lámpara Voronoi — luz cálida', slug: 'lampara-voronoi', category: 'decoración', price: 180, stock: 10, materials: ['PLA'] },
]

const MODELS_DEFAULT = [
  { title: 'Maqueta institucional — Teleférico La Paz–El Alto', designer: 'PRINT BOX Studio', software: ['Blender', 'Fusion 360'] },
  { title: 'Réplica Puerta del Sol (Tiwanaku)', designer: 'PRINT BOX Studio', software: ['Blender'] },
  { title: 'Prototipo carcasa IoT agroindustrial', designer: 'PRINT BOX Studio', software: ['Fusion 360'] },
  { title: 'Línea de figuras culturales — Cholita & Ekeko', designer: 'PRINT BOX Studio', software: ['ZBrush', 'Blender'] },
]

const STATS_DEFAULT = [
  { value: '+450', label: 'Piezas impresas' },
  { value: '+80', label: 'Clientes en Bolivia' },
  { value: '4', label: 'Años en El Alto' },
  { value: '9', label: 'Departamentos atendidos' },
]

const PROCESS_DEFAULT = [
  { title: 'Briefing', body: 'Entendemos tu idea por WhatsApp, mail o en persona en nuestro taller paceño.' },
  { title: 'Modelado', body: 'Diseñamos en Blender, Fusion 360 o ZBrush según el tipo de pieza.' },
  { title: 'Validación', body: 'Te enviamos renders y, si aplica, una impresión de prueba para aprobar.' },
  { title: 'Impresión & envío', body: 'Producimos en PLA, PETG, ABS, resina o Nylon, y enviamos a toda Bolivia.' },
]

const TEAM_DEFAULT = [
  { name: 'Equipo ndk_dev', role: 'Desarrollo & plataforma', bio: 'Construye y mantiene esta plataforma web para PRINT BOX.' },
  { name: 'Estudio PRINT BOX', role: 'Modelado 3D', bio: 'Diseñadores industriales y artistas digitales basados en La Paz y El Alto.' },
  { name: 'Taller PRINT BOX', role: 'Producción & post-procesado', bio: 'Operan nuestras impresoras FDM y de resina las 24 horas, en El Alto.' },
]

export async function runSeed(payload: Payload): Promise<void> {
  // ---- Header global: seed navItems if empty ----
  try {
    const header = await payload.findGlobal({ slug: 'header', depth: 0 })
    const nav = (header as { navItems?: unknown[] })?.navItems
    if (!nav || nav.length === 0) {
      await payload.updateGlobal({ slug: 'header', data: { navItems: NAV_DEFAULT } })
      payload.logger.info('[seed] Header navItems seeded')
    }
  } catch (e) {
    payload.logger.warn({ err: e }, '[seed] Header seed failed')
  }

  // ---- About global: seed structured fields if empty ----
  try {
    const about = await payload.findGlobal({ slug: 'about', depth: 0 })
    const a = about as { stats?: unknown[]; process?: unknown[]; team?: unknown[] }
    const needSeed = !a.stats?.length || !a.process?.length || !a.team?.length
    if (needSeed) {
      await payload.updateGlobal({
        slug: 'about',
        data: {
          stats: STATS_DEFAULT,
          process: PROCESS_DEFAULT,
          team: TEAM_DEFAULT,
        },
      })
      payload.logger.info('[seed] About global seeded')
    }
  } catch (e) {
    payload.logger.warn({ err: e }, '[seed] About seed failed')
  }

  // ---- Posts collection ----
  try {
    const count = await payload.count({ collection: 'posts' })
    if (count.totalDocs === 0) {
      for (const p of POSTS_DEFAULT) {
        await payload.create({
          collection: 'posts',
          data: { ...p, publishedAt: new Date().toISOString() },
        })
      }
      payload.logger.info(`[seed] Seeded ${POSTS_DEFAULT.length} posts`)
    }
  } catch (e) {
    payload.logger.warn({ err: e }, '[seed] Posts seed failed')
  }

  // ---- Products collection ----
  try {
    const count = await payload.count({ collection: 'products' })
    if (count.totalDocs === 0) {
      for (const p of PRODUCTS_DEFAULT) {
        await payload.create({ collection: 'products', data: p })
      }
      payload.logger.info(`[seed] Seeded ${PRODUCTS_DEFAULT.length} products`)
    }
  } catch (e) {
    payload.logger.warn({ err: e }, '[seed] Products seed failed')
  }

  // ---- Models3D collection ----
  try {
    const count = await payload.count({ collection: 'models-3d' })
    if (count.totalDocs === 0) {
      for (const m of MODELS_DEFAULT) {
        await payload.create({ collection: 'models-3d', data: m })
      }
      payload.logger.info(`[seed] Seeded ${MODELS_DEFAULT.length} models`)
    }
  } catch (e) {
    payload.logger.warn({ err: e }, '[seed] Models seed failed')
  }
}
