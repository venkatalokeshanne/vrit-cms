export default {
  name: 'course',
  type: 'document',
  title: 'Course',
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL slug for the course page',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      type: 'string',
      title: 'Course Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'array',
      title: 'Course Description',
      of: [{type: 'text'}],
      description: 'Each item will be displayed as a separate paragraph'
    },
    {
      name: 'duration',
      type: 'string',
      title: 'Course Duration',
      description: 'e.g., "8 weeks", "45 days", "3 months"'
    },
    {
      name: 'courseModules',
      type: 'array',
      title: 'Course Modules',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Module Title',
              validation: Rule => Rule.required()
            },
            {
              name: 'topics',
              type: 'array',
              title: 'Topics',
              of: [{type: 'string'}]
            }
          ]
        }
      ]
    },
    {
      name: 'whoShouldAttend',
      type: 'array',
      title: 'Who Should Attend',
      of: [{type: 'string'}]
    },
    {
      name: 'whatYouLearn',
      type: 'array',
      title: 'What You Learn in This Course',
      of: [{type: 'string'}]
    },
    {
      name: 'prerequisites',
      type: 'array',
      title: 'Prerequisites',
      of: [{type: 'string'}]
    },
    {
      name: 'whyJoinCourse',
      type: 'array',
      title: 'Why Should You Join This Course?',
      of: [{type: 'string'}]
    },
    {
      name: 'customSections',
      type: 'array',
      title: 'Custom Sections',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: 'Section Heading',
              validation: Rule => Rule.required()
            },
            {
              name: 'content',
              type: 'array',
              title: 'Section Content',
              of: [{type: 'text'}],
              description: 'Each item will be displayed as a separate paragraph'
            }
          ]
        }
      ]
    },
    {
      name: 'keyDifferentiators',
      type: 'array',
      title: 'Key Differentiators',
      of: [{type: 'string'}]
    },
    {
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question'
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Answer'
            }
          ]
        }
      ]
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'}
        ]
      },
      initialValue: 'draft'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status'
    }
  }
}
