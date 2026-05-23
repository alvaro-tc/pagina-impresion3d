import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Acerca de (página)',
  admin: {
    description: 'Contenido editable de la página /acerca-de.',
  },
  fields: [
    {
      name: 'heroEyebrow',
      type: 'text',
      defaultValue: 'Quiénes somos',
    },
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'PRINT BOX — modelado e impresión 3D desde La Paz, Bolivia',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'Somos un estudio especializado en modelado 3D e impresión aditiva, con sede en Pasaje 27 de Noviembre, Adolfo Borda, El Alto. Producimos piezas únicas, prototipos funcionales y catálogos de productos para clientes en todo el país.',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats / KPIs',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'process',
      type: 'array',
      label: 'Proceso de trabajo',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'team',
      type: 'array',
      label: 'Equipo',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea', required: true },
      ],
    },
  ],
}
