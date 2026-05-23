import type { Block } from 'payload'

export const QuoteFormBlock: Block = {
  slug: 'quote-form',
  interfaceName: 'QuoteFormBlock',
  labels: {
    singular: 'Quote Form',
    plural: 'Quote Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Cotizá tu impresión 3D',
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
