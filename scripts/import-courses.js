const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Sanity client configuration
const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // You'll need to set this
  apiVersion: '2023-05-03'
})

// Read the JSON file
const coursesData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../vr-it-sol/src/data/coursesMetadata.json'),
    'utf8'
  )
)

// Function to transform JSON data to Sanity format
function transformCourseData(course, index) {
  // Skip empty entries that only have streetAddress
  if (!course.slug || !course.title) {
    return null
  }

  const transformed = {
    _type: 'courseMetadata',
    _id: `course-${course.slug}`, // Use slug as unique ID
    
    // Basic Information
    slug: {
      _type: 'slug',
      current: course.slug
    },
    title: course.title,
    description: course.description || '',
    
    // SEO Settings
    seo: {
      keywords: Array.isArray(course.keywords) ? course.keywords : 
                typeof course.keywords === 'string' ? course.keywords.split(',').map(k => k.trim()) : [],
      ogTitle: course.ogTitle || course.title,
      ogDescription: course.ogDescription || course.description,
      ogUrl: course.ogUrl || `/${course.slug}`,
      ogImageUrl: course.ogImage || '',
      twitterTitle: course.twitterTitle || course.title,
      twitterDescription: course.twitterDescription || course.description,
      twitterUrl: course.twitterUrl || `/${course.slug}`,
      twitterImageUrl: course.twitterImage || course.ogImage || ''
    },
    
    // Determine category based on course title/slug
    category: determineCategoryFromTitle(course.title || course.slug),
    
    // Course Details - we'll set defaults since JSON doesn't have detailed course info
    courseDetails: {
      duration: '45 days', // Default
      mode: ['Online', 'Classroom'], // Default modes
      level: 'Beginner to Advanced', // Default
      language: 'English',
      certification: true,
      placementAssistance: course.title?.toLowerCase().includes('placement') || course.description?.toLowerCase().includes('placement') || false
    },
    
    // Reviews and Ratings
    reviews: {
      reviewCount: course.reviewCount || '0',
      ratingValue: course.ratingValue || '5'
    },
    
    // Location Information
    location: {
      streetAddress: course.streetAddress || '506/A, Aditya Enclave, Nilagiri Block, 5th Floor, Ameerpet, Hyderabad, Telangana.',
      postalCode: course.postalCode || '500073',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India'
    },
    
    // Structured Data
    structuredData: {
      type: course.structuredData?.['@type'] === 'LocalBusiness' ? 'LocalBusiness' : 'Course',
      provider: 'VR IT Solutions',
      organizationName: course.organizationName || course.title
    },
    
    // Status
    isActive: true,
    isFeatured: index < 5, // Mark first 5 as featured
    
    // Timestamps
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  return transformed
}

// Function to determine category from title
function determineCategoryFromTitle(title) {
  const titleLower = title.toLowerCase()
  
  if (titleLower.includes('sap')) return 'SAP'
  if (titleLower.includes('machine learning') || titleLower.includes('data science')) return 'Data Science'
  if (titleLower.includes('azure') || titleLower.includes('devops')) return 'Cloud & DevOps'
  if (titleLower.includes('full stack') || titleLower.includes('programming')) return 'Programming'
  if (titleLower.includes('salesforce') || titleLower.includes('workday')) return 'CRM'
  if (titleLower.includes('sas clinical') || titleLower.includes('clinical')) return 'Data Science'
  if (titleLower.includes('pega')) return 'BPM'
  
  return 'Technology' // Default category
}

// Function to import data
async function importCourses() {
  console.log(`Starting import of ${coursesData.length} courses...`)
  
  const validCourses = coursesData
    .map(transformCourseData)
    .filter(course => course !== null)
  
  console.log(`Found ${validCourses.length} valid courses to import`)
  
  try {
    // Import in batches to avoid overwhelming the API
    const batchSize = 10
    for (let i = 0; i < validCourses.length; i += batchSize) {
      const batch = validCourses.slice(i, i + batchSize)
      
      console.log(`Importing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(validCourses.length/batchSize)}...`)
      
      const transaction = client.transaction()
      batch.forEach(course => {
        transaction.createOrReplace(course)
      })
      
      await transaction.commit()
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    console.log('✅ Import completed successfully!')
    console.log(`📊 Imported ${validCourses.length} courses`)
    
    // Show category breakdown
    const categoryCount = {}
    validCourses.forEach(course => {
      categoryCount[course.category] = (categoryCount[course.category] || 0) + 1
    })
    
    console.log('\n📈 Category breakdown:')
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} courses`)
    })
    
  } catch (error) {
    console.error('❌ Import failed:', error)
  }
}

// Run the import
if (require.main === module) {
  importCourses()
}

module.exports = { importCourses, transformCourseData }
