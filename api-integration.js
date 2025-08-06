// API integration helper for Next.js applications
// This file shows how to integrate the Sanity CMS with your Next.js frontend

import { createClient } from '@sanity/client'

// Sanity client configuration
export const client = createClient({
  projectId: '3hir6j0e', // Replace with your actual project ID
  dataset: 'production',
  useCdn: true, // Set to false for fresh data on every request
  apiVersion: '2024-01-01',
  // Add token for write operations (keep this in environment variables)
  // token: process.env.SANITY_API_TOKEN
})

// Course-related queries
export const queries = {
  // Get all active courses
  getAllCourses: `*[_type == "courseMetadata" && status == "active"] | order(updatedAt desc) {
    _id,
    courseTitle,
    courseSubtitle,
    courseDescription,
    slug,
    duration,
    mode,
    level,
    pricing,
    courseFeatures,
    locations,
    seo,
    cta
  }`,

  // Get course by slug
  getCourseBySlug: `*[_type == "courseMetadata" && slug.current == $slug][0] {
    _id,
    courseTitle,
    courseSubtitle,
    courseDescription,
    slug,
    duration,
    mode,
    level,
    pricing,
    courseFeatures,
    prerequisites,
    learningObjectives,
    syllabus,
    instructor,
    faq,
    locations,
    seo,
    structuredData,
    cta,
    updatedAt
  }`,

  // Get courses by location
  getCoursesByLocation: `*[_type == "courseMetadata" && $location in locations && status == "active"] | order(courseTitle asc) {
    _id,
    courseTitle,
    courseSubtitle,
    slug,
    duration,
    pricing,
    courseFeatures[0..2],
    seo {
      metaTitle,
      metaDescription
    }
  }`,

  // Get instructors
  getAllInstructors: `*[_type == "instructor"] | order(experience desc) {
    _id,
    name,
    slug,
    image,
    bio,
    experience,
    expertise,
    certifications
  }`,

  // Get course categories
  getAllCategories: `*[_type == "courseCategory"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    color,
    order
  }`,

  // Get testimonials for a course
  getTestimonialsByCourse: `*[_type == "testimonial" && course._ref == $courseId] | order(dateSubmitted desc) {
    _id,
    studentName,
    studentImage,
    testimonialText,
    rating,
    jobTitle,
    company,
    location,
    dateSubmitted
  }`,

  // Get featured testimonials
  getFeaturedTestimonials: `*[_type == "testimonial" && featured == true] | order(rating desc, dateSubmitted desc) {
    _id,
    studentName,
    studentImage,
    testimonialText,
    rating,
    jobTitle,
    company,
    course-> {
      courseTitle,
      slug
    }
  }`,

  // Search courses
  searchCourses: `*[_type == "courseMetadata" && status == "active" && (
    courseTitle match "*" + $searchTerm + "*" ||
    courseDescription match "*" + $searchTerm + "*" ||
    courseFeatures[] match "*" + $searchTerm + "*"
  )] | order(courseTitle asc) {
    _id,
    courseTitle,
    courseSubtitle,
    slug,
    courseDescription,
    duration,
    pricing
  }`
}

// API functions for Next.js
export const api = {
  // Fetch all courses
  async getAllCourses() {
    try {
      return await client.fetch(queries.getAllCourses)
    } catch (error) {
      console.error('Error fetching courses:', error)
      return []
    }
  },

  // Fetch course by slug
  async getCourseBySlug(slug) {
    try {
      return await client.fetch(queries.getCourseBySlug, { slug })
    } catch (error) {
      console.error('Error fetching course:', error)
      return null
    }
  },

  // Fetch courses by location
  async getCoursesByLocation(location) {
    try {
      return await client.fetch(queries.getCoursesByLocation, { location })
    } catch (error) {
      console.error('Error fetching courses by location:', error)
      return []
    }
  },

  // Fetch all instructors
  async getAllInstructors() {
    try {
      return await client.fetch(queries.getAllInstructors)
    } catch (error) {
      console.error('Error fetching instructors:', error)
      return []
    }
  },

  // Fetch course categories
  async getAllCategories() {
    try {
      return await client.fetch(queries.getAllCategories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  },

  // Fetch testimonials for a course
  async getTestimonialsByCourse(courseId) {
    try {
      return await client.fetch(queries.getTestimonialsByCourse, { courseId })
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }
  },

  // Fetch featured testimonials
  async getFeaturedTestimonials() {
    try {
      return await client.fetch(queries.getFeaturedTestimonials)
    } catch (error) {
      console.error('Error fetching featured testimonials:', error)
      return []
    }
  },

  // Search courses
  async searchCourses(searchTerm) {
    try {
      return await client.fetch(queries.searchCourses, { searchTerm })
    } catch (error) {
      console.error('Error searching courses:', error)
      return []
    }
  },

  // Generate structured data for SEO
  generateCourseStructuredData(course) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.courseTitle,
      description: course.courseDescription,
      provider: {
        '@type': 'Organization',
        name: course.structuredData?.provider || 'VR IT Solutions',
        url: course.structuredData?.providerUrl || 'https://vritsolutions.com'
      },
      offers: course.pricing ? {
        '@type': 'Offer',
        price: course.pricing.price,
        priceCurrency: course.pricing.currency || 'INR',
        priceValidUntil: course.pricing.priceValidUntil
      } : undefined,
      courseMode: course.mode?.includes('online') ? 'online' : 'classroom',
      duration: course.duration,
      educationalLevel: course.level,
      inLanguage: 'en',
      url: `https://vritsolutions.com/${course.slug?.current}`
    }
  }
}

// Webhook handler for real-time updates (for Next.js API routes)
export async function handleWebhook(req, res) {
  try {
    // Validate webhook (implement your security checks)
    const { _type, slug } = req.body
    
    if (_type === 'courseMetadata' && slug?.current) {
      // Revalidate the course page
      await res.revalidate(`/${slug.current}`)
      
      // Optionally revalidate other related pages
      await res.revalidate('/courses')
    }
    
    res.status(200).json({ revalidated: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: 'Error revalidating' })
  }
}
