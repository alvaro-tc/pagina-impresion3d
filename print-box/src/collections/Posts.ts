import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Publicación', plural: 'Publicaciones' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
    description: 'Notas, tutoriales, casos de uso y novedades del blog de PRINT BOX.',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL: /publicaciones/<slug>' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'industria',
      options: [
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Industria', value: 'industria' },
        { label: 'Caso de uso', value: 'caso-de-uso' },
        { label: 'Materiales', value: 'materiales' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Resumen corto que aparece en la lista del blog.' },
    },
    { name: 'readTime', type: 'text', defaultValue: '5 min' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText', editor: lexicalEditor() },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
