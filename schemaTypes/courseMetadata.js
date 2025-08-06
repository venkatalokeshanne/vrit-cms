import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'courseMetadata',
  title: 'Course Metadata',
  type: 'document',
  fields: [
    // Basic Information
    defineField({
      name: 'slug',
      title: 'Course Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'URL slug for the course (e.g., "workday-training-in-hyderabad")'
    }),
    
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Main page title for SEO and display'
    }),
    
    defineField({
      name: 'description',
      title: 'Course Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
      description: 'Main description of the course'
    }),
    
    // SEO Settings
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'keywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          },
          description: 'Keywords for SEO optimization'
        },
        {
          name: 'ogTitle',
          title: 'Open Graph Title',
          type: 'string',
          description: 'Title for social media sharing'
        },
        {
          name: 'ogDescription',
          title: 'Open Graph Description',
          type: 'text',
          rows: 3,
          description: 'Description for social media sharing'
        },
        {
          name: 'ogUrl',
          title: 'Open Graph URL',
          type: 'string',
          description: 'Canonical URL for Open Graph'
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ],
          description: 'Image for social media sharing'
        },
        {
          name: 'ogImageUrl',
          title: 'Open Graph Image URL (Legacy)',
          type: 'string',
          description: 'Image URL path (for existing data compatibility)'
        },
        {
          name: 'twitterTitle',
          title: 'Twitter Title',
          type: 'string',
          description: 'Title for Twitter cards'
        },
        {
          name: 'twitterDescription',
          title: 'Twitter Description',
          type: 'text',
          rows: 3,
          description: 'Description for Twitter cards'
        },
        {
          name: 'twitterUrl',
          title: 'Twitter URL',
          type: 'string',
          description: 'Canonical URL for Twitter'
        },
        {
          name: 'twitterImage',
          title: 'Twitter Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ],
          description: 'Image for Twitter cards'
        },
        {
          name: 'twitterImageUrl',
          title: 'Twitter Image URL (Legacy)',
          type: 'string',
          description: 'Image URL path (for existing data compatibility)'
        }
      ]
    }),
    
    // Course Categories
    defineField({
      name: 'category',
      title: 'Course Category',
      type: 'string',
      options: {
        list: [
          { title: 'SAP', value: 'SAP' },
          { title: 'Cloud & DevOps', value: 'Cloud & DevOps' },
          { title: 'Data Science', value: 'Data Science' },
          { title: 'Programming', value: 'Programming' },
          { title: 'CRM', value: 'CRM' },
          { title: 'BPM', value: 'BPM' },
          { title: 'Data Integration', value: 'Data Integration' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Machine Learning', value: 'Machine Learning' },
          { title: 'Business Intelligence', value: 'Business Intelligence' }
        ]
      }
    }),
    
    // Course Details
    defineField({
      name: 'courseDetails',
      title: 'Course Details',
      type: 'object',
      fields: [
        {
          name: 'duration',
          title: 'Course Duration',
          type: 'string',
          description: 'e.g., "45 days", "3 months"'
        },
        {
          name: 'mode',
          title: 'Training Mode',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Online', value: 'Online' },
              { title: 'Classroom', value: 'Classroom' },
              { title: 'Hybrid', value: 'Hybrid' },
              { title: 'Corporate', value: 'Corporate' },
              { title: 'Weekend', value: 'Weekend' }
            ]
          },
          description: 'Available training modes'
        },
        {
          name: 'level',
          title: 'Skill Level',
          type: 'string',
          options: {
            list: [
              'Beginner', 
              'Intermediate', 
              'Advanced', 
              'Beginner to Advanced'
            ]
          }
        },
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          initialValue: 'English'
        },
        {
          name: 'certification',
          title: 'Certification Available',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'placementAssistance',
          title: 'Placement Assistance',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    
    // Pricing Information
    defineField({
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'price',
          title: 'Regular Price',
          type: 'number',
          validation: Rule => Rule.min(0)
        },
        {
          name: 'discountedPrice',
          title: 'Discounted Price',
          type: 'number',
          validation: Rule => Rule.min(0)
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: ['INR', 'USD', 'EUR']
          },
          initialValue: 'INR'
        }
      ]
    }),
    
    // Reviews and Ratings
    defineField({
      name: 'reviews',
      title: 'Reviews and Ratings',
      type: 'object',
      fields: [
        {
          name: 'reviewCount',
          title: 'Review Count',
          type: 'string',
          description: 'Number of reviews (as string for large numbers)'
        },
        {
          name: 'ratingValue',
          title: 'Rating Value',
          type: 'string',
          options: {
            list: ['1', '2', '3', '4', '5']
          },
          initialValue: '5'
        }
      ]
    }),
    
    // Location Information
    defineField({
      name: 'location',
      title: 'Location Information',
      type: 'object',
      fields: [
        {
          name: 'streetAddress',
          title: 'Street Address',
          type: 'text',
          rows: 2,
          initialValue: '506/A, Aditya Enclave, Nilagiri Block, 5th Floor, Ameerpet, Hyderabad, Telangana.'
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
          initialValue: '500073'
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          initialValue: 'Hyderabad'
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          initialValue: 'Telangana'
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'India'
        }
      ]
    }),
    
    // Structured Data for SEO
    defineField({
      name: 'structuredData',
      title: 'Structured Data',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Schema Type',
          type: 'string',
          options: {
            list: [
              { title: 'Course', value: 'Course' },
              { title: 'LocalBusiness', value: 'LocalBusiness' },
              { title: 'EducationalOrganization', value: 'EducationalOrganization' }
            ]
          },
          initialValue: 'Course'
        },
        {
          name: 'courseCode',
          title: 'Course Code',
          type: 'string'
        },
        {
          name: 'provider',
          title: 'Course Provider',
          type: 'string',
          initialValue: 'VR IT Solutions'
        },
        {
          name: 'organizationName',
          title: 'Organization Name',
          type: 'string',
          description: 'Full organization name for structured data'
        }
      ]
    }),
    
    // Course Features and Benefits
    defineField({
      name: 'features',
      title: 'Course Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features and benefits'
    }),
    
    // FAQ Section
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
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
              rows: 4
            }
          ]
        }
      ]
    }),
    
    // Course Content
    defineField({
      name: 'detailedContent',
      title: 'Detailed Course Content',
      type: 'blockContent',
      description: 'Rich text content for the course page'
    }),
    
    // Status and Visibility
    defineField({
      name: 'isActive',
      title: 'Active Course',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this course'
    }),
    
    defineField({
      name: 'isFeatured',
      title: 'Featured Course',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured course'
    }),
    
    // Publishing Information
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today'
      }
    }),
    
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today'
      }
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'seo.ogImage',
      isActive: 'isActive',
      category: 'category'
    },
    prepare(selection) {
      const { title, subtitle, isActive, category } = selection
      return {
        title: title,
        subtitle: `${category || 'No Category'} | ${subtitle} ${isActive ? '✅' : '❌'}`,
        media: selection.media
      }
    }
  }
})
