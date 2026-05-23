import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Figuras', value: 'figuras' },
        { label: 'Utilitarios', value: 'utilitarios' },
        { label: 'Decoración', value: 'decoración' },
        { label: 'Prototipos', value: 'prototipos' },
        { label: 'Accesorios', value: 'accesorios' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Precio en BOB (bolivianos)',
      },
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'materials',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'PLA', value: 'PLA' },
        { label: 'ABS', value: 'ABS' },
        { label: 'PETG', value: 'PETG' },
        { label: 'Resina', value: 'Resina' },
        { label: 'TPU', value: 'TPU' },
        { label: 'Nylon', value: 'Nylon' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'photos',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
