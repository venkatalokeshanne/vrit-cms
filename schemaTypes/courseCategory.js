import { defineType, defineField } from 'sanity'

export const courseCategory = defineType({
  name: 'courseCategory',
  title: 'Course Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'icon',
      title: 'Category Icon',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'color',
      title: 'Theme Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: '#3B82F6' },
          { title: 'Green', value: '#10B981' },
          { title: 'Purple', value: '#8B5CF6' },
          { title: 'Red', value: '#EF4444' },
          { title: 'Orange', value: '#F59E0B' },
          { title: 'Indigo', value: '#6366F1' }
        ]
      }
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.integer().positive()
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    }
  ]
})
