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
      type: 'string',
      title: 'Open Graph Image',
      description: 'Image path for social media sharing'
    },
    {
      name: 'twitterImage',
      type: 'string',
      title: 'Twitter Image',
      description: 'Image path for Twitter cards'
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
      name: 'structuredData',
      type: 'object',
      title: 'Structured Data',
      description: 'Schema.org structured data',
      fields: [
        {
          name: 'context',
          type: 'string',
          title: '@context',
          initialValue: 'http://schema.org'
        },
        {
          name: 'type',
          type: 'string',
          title: '@type',
          initialValue: 'LocalBusiness'
        },
        {
          name: 'name',
          type: 'string',
          title: 'Name'
        },
        {
          name: 'url',
          type: 'string',
          title: 'URL'
        },
        {
          name: 'logo',
          type: 'string',
          title: 'Logo'
        },
        {
          name: 'sameAs',
          type: 'array',
          title: 'Same As',
          description: 'Social media and other profile URLs',
          of: [{type: 'string'}]
        },
        {
          name: 'address',
          type: 'object',
          title: 'Address',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: '@type',
              initialValue: 'PostalAddress'
            },
            {
              name: 'addressCountry',
              type: 'string',
              title: 'Address Country'
            },
            {
              name: 'addressLocality',
              type: 'string',
              title: 'Address Locality'
            },
            {
              name: 'addressRegion',
              type: 'string',
              title: 'Address Region'
            },
            {
              name: 'postalCode',
              type: 'string',
              title: 'Postal Code'
            },
            {
              name: 'streetAddress',
              type: 'string',
              title: 'Street Address'
            }
          ]
        },
        {
          name: 'openingHours',
          type: 'array',
          title: 'Opening Hours',
          description: 'Business operating hours',
          of: [{type: 'string'}]
        },
        {
          name: 'contactPoint',
          type: 'array',
          title: 'Contact Points',
          description: 'Business contact information',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'type',
                  type: 'string',
                  title: '@type',
                  initialValue: 'ContactPoint'
                },
                {
                  name: 'telephone',
                  type: 'string',
                  title: 'Telephone'
                },
                {
                  name: 'contactType',
                  type: 'string',
                  title: 'Contact Type'
                },
                {
                  name: 'email',
                  type: 'string',
                  title: 'Email'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}