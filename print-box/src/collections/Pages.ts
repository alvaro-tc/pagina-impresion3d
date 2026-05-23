import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { ModelingSection } from '../blocks/ModelingSection'
import { ProductGallery } from '../blocks/ProductGallery'
import { QuoteFormBlock } from '../blocks/QuoteFormBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path, ej: about, servicios',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, ModelingSection, ProductGallery, QuoteFormBlock],
    },
  ],
}
