import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer & Contacto',
  admin: {
    description: 'Información de contacto, redes sociales y datos legales mostrados en el sitio.',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Modelado e impresión 3D bajo pedido — desde La Paz, Bolivia.',
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Datos de contacto',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          defaultValue: 'Pasaje 27 de Noviembre, Adolfo Borda, 0000 El Alto, La Paz — Bolivia',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+591 65696932',
        },
        {
          name: 'whatsapp',
          type: 'text',
          defaultValue: '+59165696932',
          admin: { description: 'Número de WhatsApp en formato internacional (sin espacios). Usado para el enlace wa.me.' },
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'contacto@printbox.bo',
        },
        {
          name: 'referenceNumber',
          type: 'text',
          label: 'Número de referencia / NIT',
          defaultValue: 'NIT 0000000000',
          admin: { description: 'Número de identificación tributaria o referencia comercial.' },
        },
      ],
    },
    {
      type: 'group',
      name: 'socials',
      label: 'Redes sociales',
      admin: { description: 'Cada red puede habilitarse o deshabilitarse individualmente.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'facebookEnabled', type: 'checkbox', defaultValue: true, label: 'Facebook activo' },
            { name: 'facebookUrl', type: 'text', label: 'URL Facebook', defaultValue: 'https://facebook.com/printbox.bo' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'instagramEnabled', type: 'checkbox', defaultValue: true, label: 'Instagram activo' },
            { name: 'instagramUrl', type: 'text', label: 'URL Instagram', defaultValue: 'https://instagram.com/printbox.bo' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'tiktokEnabled', type: 'checkbox', defaultValue: true, label: 'TikTok activo' },
            { name: 'tiktokUrl', type: 'text', label: 'URL TikTok', defaultValue: 'https://tiktok.com/@printbox.bo' },
          ],
        },
      ],
    },
    {
      name: 'credit',
      type: 'text',
      defaultValue: 'Desarrollado por ndk_dev',
      admin: { description: 'Crédito del equipo de desarrollo — mostrado en el footer.' },
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Enlaces legales',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
