import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ModelingSection: Block = {
  slug: 'modeling-section',
  interfaceName: 'ModelingSectionBlock',
  labels: {
    singular: 'Modeling Section',
    plural: 'Modeling Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'featuredModels',
      type: 'relationship',
      relationTo: 'models-3d',
      hasMany: true,
    },
  ],
}
