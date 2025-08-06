import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Student Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'studentName',
      title: 'Student Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'studentImage',
      title: 'Student Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'courseMetadata' }]
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string'
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'dateSubmitted',
      title: 'Date Submitted',
      type: 'date'
    })
  ],
  preview: {
    select: {
      title: 'studentName',
      subtitle: 'course.courseTitle',
      media: 'studentImage'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? `Course: ${subtitle}` : 'Testimonial',
        media
      }
    }
  }
})
