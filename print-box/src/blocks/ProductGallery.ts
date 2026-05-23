import type { Block } from 'payload'

export const ProductGallery: Block = {
  slug: 'product-gallery',
  interfaceName: 'ProductGalleryBlock',
  labels: {
    singular: 'Product Gallery',
    plural: 'Product Galleries',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
  ],
}
