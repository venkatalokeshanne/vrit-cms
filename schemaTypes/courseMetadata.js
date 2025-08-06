import { defineType, defineField } from 'sanity'

export const courseMetadata = defineType({
  name: 'courseMetadata',
  title: 'Course Metadata',
  type: 'document',
  fields: [
    // Basic Course Information
    defineField({
      name: 'courseTitle',
      title: 'Course Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'courseSubtitle',
      title: 'Course Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'courseDescription',
      title: 'Course Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'courseTitle',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),

    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url'
        },
        {
          name: 'ogTitle',
          title: 'Open Graph Title',
          type: 'string'
        },
        {
          name: 'ogDescription',
          title: 'Open Graph Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    // Course Details
    defineField({
      name: 'duration',
      title: 'Course Duration',
      type: 'string',
      placeholder: 'e.g., 40 Hours, 6 Weeks'
    }),
    defineField({
      name: 'mode',
      title: 'Training Mode',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Online', value: 'online' },
          { title: 'Classroom', value: 'classroom' },
          { title: 'Corporate', value: 'corporate' },
          { title: 'Weekend', value: 'weekend' }
        ]
      }
    }),
    defineField({
      name: 'level',
      title: 'Course Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' }
        ]
      }
    }),

    // Pricing
    defineField({
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'INR'
        },
        {
          name: 'price',
          title: 'Course Price',
          type: 'number'
        },
        {
          name: 'originalPrice',
          title: 'Original Price (for discounts)',
          type: 'number'
        },
        {
          name: 'priceValidUntil',
          title: 'Price Valid Until',
          type: 'date'
        }
      ]
    }),

    // Course Features
    defineField({
      name: 'courseFeatures',
      title: 'Course Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key course features and benefits'
    }),

    // Prerequisites
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    // Learning Objectives
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    // Course Syllabus
    defineField({
      name: 'syllabus',
      title: 'Course Syllabus',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'module',
            title: 'Module Name',
            type: 'string'
          },
          {
            name: 'topics',
            title: 'Topics Covered',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'duration',
            title: 'Module Duration',
            type: 'string'
          }
        ]
      }]
    }),

    // Instructor Information
    defineField({
      name: 'instructor',
      title: 'Course Instructor',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Instructor Name',
          type: 'string'
        },
        {
          name: 'bio',
          title: 'Instructor Bio',
          type: 'text',
          rows: 3
        },
        {
          name: 'experience',
          title: 'Years of Experience',
          type: 'number'
        },
        {
          name: 'image',
          title: 'Instructor Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),

    // FAQ Section
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string'
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 3
          }
        ]
      }]
    }),

    // Location/City Information
    defineField({
      name: 'locations',
      title: 'Training Locations',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hyderabad', value: 'hyderabad' },
          { title: 'Bangalore', value: 'bangalore' },
          { title: 'Chennai', value: 'chennai' },
          { title: 'Pune', value: 'pune' },
          { title: 'Noida', value: 'noida' },
          { title: 'Online', value: 'online' }
        ]
      }
    }),

    // Course Status
    defineField({
      name: 'status',
      title: 'Course Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Draft', value: 'draft' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'active'
    }),

    // Structured Data for Rich Snippets
    defineField({
      name: 'structuredData',
      title: 'Structured Data Settings',
      type: 'object',
      fields: [
        {
          name: 'provider',
          title: 'Course Provider',
          type: 'string',
          initialValue: 'VR IT Solutions'
        },
        {
          name: 'providerUrl',
          title: 'Provider URL',
          type: 'url',
          initialValue: 'https://vritsolutions.com'
        },
        {
          name: 'courseType',
          title: 'Course Type',
          type: 'string',
          options: {
            list: [
              { title: 'Professional Certificate', value: 'professional-certificate' },
              { title: 'Technical Training', value: 'technical-training' },
              { title: 'Skill Development', value: 'skill-development' }
            ]
          }
        }
      ]
    }),

    // Call to Action
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'primaryText',
          title: 'Primary CTA Text',
          type: 'string',
          initialValue: 'Enroll Now'
        },
        {
          name: 'secondaryText',
          title: 'Secondary CTA Text',
          type: 'string',
          initialValue: 'Download Syllabus'
        },
        {
          name: 'contactNumber',
          title: 'Contact Number',
          type: 'string'
        },
        {
          name: 'whatsappNumber',
          title: 'WhatsApp Number',
          type: 'string'
        }
      ]
    }),

    // Timestamps
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    })
  ],

  preview: {
    select: {
      title: 'courseTitle',
      subtitle: 'courseSubtitle',
      media: 'seo.ogImage'
    }
  },

  orderings: [
    {
      title: 'Course Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'courseTitle', direction: 'asc' }]
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{ field: 'updatedAt', direction: 'desc' }]
    }
  ]
})
