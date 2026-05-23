import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Models3D: CollectionConfig = {
  slug: 'models-3d',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
      name: 'designer',
      type: 'text',
    },
    {
      name: 'software',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Blender', value: 'Blender' },
        { label: 'Fusion 360', value: 'Fusion 360' },
        { label: 'SolidWorks', value: 'SolidWorks' },
        { label: 'ZBrush', value: 'ZBrush' },
        { label: 'Tinkercad', value: 'Tinkercad' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      name: 'renders',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'sourceFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Archivo .STL u .OBJ opcional',
      },
    },
  ],
}
