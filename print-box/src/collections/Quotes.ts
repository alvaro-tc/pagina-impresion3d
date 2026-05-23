import type { CollectionConfig } from 'payload'

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'email', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Describí tu idea o pieza',
    },
    {
      name: 'referenceFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Archivo .STL/.OBJ/imagen de referencia',
    },
    {
      name: 'material',
      type: 'select',
      defaultValue: 'A definir',
      options: [
        { label: 'PLA', value: 'PLA' },
        { label: 'ABS', value: 'ABS' },
        { label: 'PETG', value: 'PETG' },
        { label: 'Resina', value: 'Resina' },
        { label: 'TPU', value: 'TPU' },
        { label: 'Nylon', value: 'Nylon' },
        { label: 'A definir', value: 'A definir' },
      ],
    },
    {
      name: 'quantity',
      type: 'number',
      defaultValue: 1,
      min: 1,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Reviewing', value: 'reviewing' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
