import { groq } from 'next-sanity'

// Query to fetch all published AWS courses
export const awsCoursesQuery = groq`
  *[_type == "awsCourse" && published == true] | order(_createdAt desc) {
    _id,
    slug,
    title,
    subtitle,
    description,
    duration,
    level,
    price,
    originalPrice,
    heroImage,
    "seoTitle": seo.metaTitle,
    "seoDescription": seo.metaDescription,
    _createdAt
  }
`

// Query to fetch a single AWS course by slug
export const awsCourseBySlugQuery = groq`
  *[_type == "awsCourse" && slug.current == $slug && published == true][0] {
    _id,
    title,
    subtitle,
    description,
    duration,
    level,
    price,
    originalPrice,
    heroImage,
    overview,
    curriculum[] {
      moduleTitle,
      topics
    },
    projects[] {
      projectTitle,
      description,
      technologies
    },
    prerequisites,
    whatYouLearn,
    features,
    seo {
      metaTitle,
      metaDescription,
      keywords
    },
    _createdAt
  }
`
