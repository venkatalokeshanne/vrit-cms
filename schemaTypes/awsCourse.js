export default {
  name: 'awsCourse',
  title: 'AWS Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., 8 weeks'
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'}
        ]
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    {
      name: 'originalPrice',
      title: 'Original Price (for discount)',
      type: 'number'
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      description: 'Image used for course cards on homepage and listings',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      description: 'Banner image for detailed course sections',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'overview',
      title: 'Course Overview',
      type: 'array',
      of: [{
        type: 'block'
      }]
    },
    {
      name: 'curriculum',
      title: 'Curriculum',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'moduleTitle',
            title: 'Module Title',
            type: 'string'
          },
          {
            name: 'topics',
            title: 'Topics',
            type: 'array',
            of: [{type: 'string'}]
          }
        ]
      }]
    },
    {
      name: 'projects',
      title: 'Hands-on Projects',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'projectTitle',
            title: 'Project Title',
            type: 'string'
          },
          {
            name: 'description',
            title: 'Project Description',
            type: 'text'
          },
          {
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{type: 'string'}]
          }
        ]
      }]
    },
    {
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'whatYouLearn',
      title: 'What You Will Learn',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'features',
      title: 'Course Features',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false
    },
    // SEO fields
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Recommended: 50-60 characters',
          validation: Rule => Rule.max(60).warning('Keep under 60 characters for best SEO')
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Recommended: 150-160 characters',
          validation: Rule => Rule.max(160).warning('Keep under 160 characters for best SEO')
        },
        {
          name: 'keywords',
          title: 'Focus Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Primary keywords for SEO (5-10 recommended)'
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Optional: Override canonical URL'
        },
        {
          name: 'ogTitle',
          title: 'Open Graph Title',
          type: 'string',
          description: 'Social media sharing title (defaults to meta title)'
        },
        {
          name: 'ogDescription',
          title: 'Open Graph Description',
          type: 'text',
          rows: 2,
          description: 'Social media sharing description'
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Social sharing image (1200x630px recommended)',
          options: {
            hotspot: true
          }
        },
        {
          name: 'seoHeadings',
          title: 'SEO Headings',
          type: 'array',
          description: 'Hidden headings for SEO purposes - Add multiple headings as needed',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'level',
                  title: 'Heading Level',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'H1', value: 'h1'},
                      {title: 'H2', value: 'h2'},
                      {title: 'H3', value: 'h3'},
                      {title: 'H4', value: 'h4'},
                      {title: 'H5', value: 'h5'},
                      {title: 'H6', value: 'h6'}
                    ]
                  },
                  validation: Rule => Rule.required()
                },
                {
                  name: 'text',
                  title: 'Heading Text',
                  type: 'string',
                  validation: Rule => Rule.required()
                }
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'level'
                },
                prepare(selection) {
                  const {title, subtitle} = selection;
                  return {
                    title: title,
                    subtitle: subtitle?.toUpperCase()
                  };
                }
              }
            }
          ],
          options: {
            collapsible: true,
            collapsed: true
          }
        },
        {
          name: 'structuredData',
          title: 'Structured Data',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: true
          },
          fields: [
            {
              name: 'courseLevel',
              title: 'Course Level',
              type: 'string',
              options: {
                list: [
                  {title: 'Beginner', value: 'Beginner'},
                  {title: 'Intermediate', value: 'Intermediate'},
                  {title: 'Advanced', value: 'Advanced'}
                ]
              }
            },
            {
              name: 'instructor',
              title: 'Instructor Name',
              type: 'string'
            },
            {
              name: 'provider',
              title: 'Course Provider',
              type: 'string',
              initialValue: 'VR IT Academy'
            },
            {
              name: 'reviewRating',
              title: 'Review Rating',
              type: 'number',
              validation: Rule => Rule.min(1).max(5)
            },
            {
              name: 'reviewCount',
              title: 'Review Count',
              type: 'number'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage'
    }
  }
}
