// utils/courseStructure.js

/**
 * Transforms Sanity AWS course data into a structure optimized for Next.js components
 * @param {Object} courseData - Raw course data from Sanity
 * @returns {Object} - Structured course data for components
 */
export function structureAwsCourseData(courseData) {
  if (!courseData) return null;

  return {
    // Basic Information
    id: courseData._id,
    title: courseData.title,
    subtitle: courseData.subtitle,
    badge: courseData.badge,
    
    // SEO Data
    seo: {
      title: courseData.seo?.title || `${courseData.title} | VR IT Training`,
      description: courseData.seo?.description || courseData.subtitle,
      keywords: courseData.seo?.keywords || courseData.tags?.join(', '),
      ogTitle: courseData.seo?.ogTitle || courseData.title,
      ogDescription: courseData.seo?.ogDescription || courseData.subtitle,
      ogImage: courseData.seo?.ogImage,
      twitterTitle: courseData.seo?.twitterTitle || courseData.title,
      twitterDescription: courseData.seo?.twitterDescription || courseData.subtitle,
      twitterImage: courseData.seo?.twitterImage,
      noIndex: courseData.seo?.noIndex || false,
    },

    // Course Overview
    overview: {
      description: courseData.overview?.description || [],
      achievements: courseData.overview?.achievements || [],
      duration: courseData.overview?.duration,
      level: courseData.overview?.level,
    },

    // Curriculum with proper ordering
    curriculum: courseData.curriculum
      ?.sort((a, b) => a.moduleNumber - b.moduleNumber)
      ?.map(module => ({
        moduleNumber: module.moduleNumber,
        title: module.title,
        description: module.description,
        topics: module.topics || [],
        duration: module.duration,
      })) || [],

    // Projects
    projects: courseData.projects || [],

    // Prerequisites
    prerequisites: {
      requiredKnowledge: courseData.prerequisites?.requiredKnowledge || [],
      requirements: courseData.prerequisites?.requirements || [],
    },

    // Additional sections
    additionalSections: courseData.additionalSections || [],

    // Certifications
    certifications: {
      preparesFor: courseData.certifications?.preparesFor || [],
      certificateProvided: courseData.certifications?.certificateProvided || false,
    },

    // FAQs
    faqs: courseData.faqs || [],

    // Enrollment
    enrollment: {
      price: courseData.enrollment?.price,
      discountPrice: courseData.enrollment?.discountPrice,
      enrollmentText: courseData.enrollment?.enrollmentText || 'Enroll Now',
      ctaTitle: courseData.enrollment?.ctaTitle || 'Ready to Start Your Journey?',
      ctaDescription: courseData.enrollment?.ctaDescription || 'Join our course today!',
    },

    // Meta data
    tags: courseData.tags || [],
    createdAt: courseData.createdAt,
    updatedAt: courseData.updatedAt,
  };
}

/**
 * Generates JSON-LD structured data for SEO
 * @param {Object} courseData - Structured course data
 * @param {string} baseUrl - Base URL of the website
 * @returns {Object} - JSON-LD structured data
 */
export function generateCourseJsonLd(courseData, baseUrl) {
  const url = `${baseUrl}/courses/${courseData.slug?.current || ''}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseData.title,
    description: courseData.seo.description,
    url: url,
    image: courseData.seo.ogImage,
    provider: {
      '@type': 'Organization',
      name: 'VR IT Training',
      url: baseUrl,
    },
    offers: courseData.enrollment.price ? {
      '@type': 'Offer',
      price: courseData.enrollment.discountPrice || courseData.enrollment.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    } : undefined,
    courseMode: 'online',
    educationalLevel: courseData.overview.level,
    timeRequired: courseData.overview.duration,
    keywords: courseData.tags?.join(', '),
    dateCreated: courseData.createdAt,
    dateModified: courseData.updatedAt,
  };
}

/**
 * Validates required course data fields
 * @param {Object} courseData - Course data to validate
 * @returns {Object} - Validation result with isValid boolean and missing fields array
 */
export function validateCourseData(courseData) {
  const requiredFields = [
    'title',
    'subtitle',
    'overview.description',
    'curriculum'
  ];

  const missing = [];

  requiredFields.forEach(field => {
    const keys = field.split('.');
    let current = courseData;
    
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        missing.push(field);
        break;
      }
      current = current[key];
    }
  });

  return {
    isValid: missing.length === 0,
    missing: missing
  };
}

/**
 * Filters and sorts courses based on criteria
 * @param {Array} courses - Array of course data
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered and sorted courses
 */
export function filterAndSortCourses(courses, filters = {}) {
  let filtered = [...courses];

  // Filter by tag
  if (filters.tag) {
    filtered = filtered.filter(course => 
      course.tags?.includes(filters.tag)
    );
  }

  // Filter by level
  if (filters.level) {
    filtered = filtered.filter(course => 
      course.overview?.level === filters.level
    );
  }

  // Filter by featured
  if (filters.featured !== undefined) {
    filtered = filtered.filter(course => 
      course.featured === filters.featured
    );
  }

  // Sort
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'price':
          const priceA = a.enrollment?.discountPrice || a.enrollment?.price || 0;
          const priceB = b.enrollment?.discountPrice || b.enrollment?.price || 0;
          return priceA - priceB;
        default:
          return 0;
      }
    });
  }

  return filtered;
}
