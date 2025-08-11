export default {
  name: 'courseMetadata',
  type: 'document',
  title: 'Course Metadata',
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL slug for the course page',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Page title for SEO'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Meta description for SEO'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'SEO keywords',
      of: [{type: 'string'}]
    },
            {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      description: 'Main image for the course page',
      options: {
        hotspot: true
      }
    },
    {
      name: 'importantText',
      type: 'string',
      title: 'Important Text',
      description: 'Text to display in the scrolling banner at the top of the website'
    },
    {
      name: 'bannerUrl',
      type: 'url',
      title: 'Banner URL',
      description: 'URL to redirect users when they click on the popup banner'
    },
    {
      name: 'ogTitle',
      type: 'string',
      title: 'Open Graph Title',
      description: 'Title for social media sharing'
    },
    {
      name: 'ogDescription',
      type: 'text',
      title: 'Open Graph Description',
      description: 'Description for social media sharing'
    },
    {
      name: 'twitterTitle',
      type: 'string',
      title: 'Twitter Title',
      description: 'Title for Twitter cards'
    },
    {
      name: 'twitterDescription',
      type: 'text',
      title: 'Twitter Description',
      description: 'Description for Twitter cards'
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for social media sharing (Open Graph)',
      options: {
        hotspot: true
      }
    },
    {
      name: 'twitterImage',
      type: 'image',
      title: 'Twitter Image',
      description: 'Image for Twitter cards',
      options: {
        hotspot: true
      }
    },
    {
      name: 'ogUrl',
      type: 'string',
      title: 'Open Graph URL',
      description: 'Canonical URL for social media'
    },
    {
      name: 'twitterUrl',
      type: 'string',
      title: 'Twitter URL',
      description: 'URL for Twitter cards'
    },
    {
      name: 'canonical',
      type: 'string',
      title: 'Canonical URL',
      description: 'Canonical URL for SEO'
    },
    {
      name: 'hreflang',
      type: 'string',
      title: 'Hreflang',
      description: 'Language and region targeting'
    },
    {
      name: 'reviewCount',
      type: 'string',
      title: 'Review Count',
      description: 'Number of reviews for structured data'
    },
    {
      name: 'ratingValue',
      type: 'string',
      title: 'Rating Value',
      description: 'Rating score for structured data'
    },
    {
      name: 'organizationName',
      type: 'string',
      title: 'Organization Name',
      description: 'Name of the organization'
    },
    {
      name: 'postalCode',
      type: 'string',
      title: 'Postal Code',
      description: 'Business postal code'
    },
    {
      name: 'streetAddress',
      type: 'string',
      title: 'Street Address',
      description: 'Complete street address'
    },
    {
      name: 'courseContentPdf',
      type: 'file',
      title: 'Course Content PDF',
      description: 'PDF file containing course content/syllabus',
      options: {
        accept: '.pdf'
      }
    }
  ]
}