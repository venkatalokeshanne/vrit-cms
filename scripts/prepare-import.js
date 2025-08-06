// Simple course data importer for Sanity
// This script helps you import your course data

const fs = require('fs')
const path = require('path')

// Read and parse the JSON file
function loadCourseData() {
  try {
    const jsonPath = path.join(__dirname, '../../vr-it-sol/src/data/coursesMetadata.json')
    const rawData = fs.readFileSync(jsonPath, 'utf8')
    const courses = JSON.parse(rawData)
    
    console.log(`📚 Found ${courses.length} total entries in JSON file`)
    
    // Filter out empty entries (entries that only have streetAddress)
    const validCourses = courses.filter(course => course.slug && course.title)
    
    console.log(`✅ Found ${validCourses.length} valid courses`)
    
    return validCourses
  } catch (error) {
    console.error('❌ Error reading course data:', error.message)
    return []
  }
}

// Transform course data to match Sanity schema
function transformCourseData(course, index) {
  // Determine category from title
  function getCategory(title) {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('sap')) return 'SAP'
    if (titleLower.includes('machine learning') || titleLower.includes('data science')) return 'Data Science'
    if (titleLower.includes('azure') || titleLower.includes('devops')) return 'Cloud & DevOps'
    if (titleLower.includes('full stack') || titleLower.includes('programming')) return 'Programming'
    if (titleLower.includes('salesforce') || titleLower.includes('workday')) return 'CRM'
    if (titleLower.includes('sas clinical') || titleLower.includes('clinical')) return 'Data Science'
    if (titleLower.includes('pega')) return 'BPM'
    
    return 'Technology'
  }

  return {
    _type: 'courseMetadata',
    _id: `imported-${course.slug}`,
    
    // Basic Information
    slug: {
      _type: 'slug',
      current: course.slug
    },
    title: course.title,
    description: course.description || '',
    
    // SEO Settings
    seo: {
      keywords: Array.isArray(course.keywords) 
        ? course.keywords 
        : typeof course.keywords === 'string' 
          ? course.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
          : [],
      ogTitle: course.ogTitle || course.title,
      ogDescription: course.ogDescription || course.description,
      ogUrl: course.ogUrl || `/${course.slug}`,
      ogImageUrl: course.ogImage || '',
      twitterTitle: course.twitterTitle || course.title,
      twitterDescription: course.twitterDescription || course.description,
      twitterUrl: course.twitterUrl || `/${course.slug}`,
      twitterImageUrl: course.twitterImage || course.ogImage || ''
    },
    
    // Category
    category: getCategory(course.title),
    
    // Course Details
    courseDetails: {
      duration: '6-8 weeks',
      mode: ['Online', 'Classroom'],
      level: 'Beginner to Advanced',
      language: 'English',
      certification: true,
      placementAssistance: true
    },
    
    // Reviews and Ratings
    reviews: {
      reviewCount: course.reviewCount || '0',
      ratingValue: course.ratingValue || '5'
    },
    
    // Location
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
    
    // Features (sample features based on course type)
    features: [
      'Live instructor-led training',
      'Hands-on practical sessions',
      'Industry-relevant curriculum',
      'Placement assistance',
      'Certification preparation',
      'Flexible batch timings'
    ],
    
    // Status
    isActive: true,
    isFeatured: index < 3, // First 3 courses are featured
    
    // Timestamps
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

// Generate Sanity import file
function generateImportFile() {
  const courses = loadCourseData()
  
  if (courses.length === 0) {
    console.log('❌ No valid courses found to import')
    return
  }
  
  const transformedCourses = courses.map(transformCourseData)
  
  // Create output directory
  const outputDir = path.join(__dirname, '../data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // Write NDJSON file for Sanity import
  const ndjsonPath = path.join(outputDir, 'courses-import.ndjson')
  const ndjsonContent = transformedCourses
    .map(course => JSON.stringify(course))
    .join('\n')
  
  fs.writeFileSync(ndjsonPath, ndjsonContent)
  
  // Write readable JSON for inspection
  const jsonPath = path.join(outputDir, 'courses-transformed.json')
  fs.writeFileSync(jsonPath, JSON.stringify(transformedCourses, null, 2))
  
  console.log('📁 Generated import files:')
  console.log(`   📄 ${ndjsonPath} (for Sanity CLI import)`)
  console.log(`   📄 ${jsonPath} (human-readable format)`)
  
  // Show category breakdown
  const categoryCount = {}
  transformedCourses.forEach(course => {
    categoryCount[course.category] = (categoryCount[course.category] || 0) + 1
  })
  
  console.log('\n📈 Category breakdown:')
  Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} courses`)
  })
  
  console.log('\n🚀 Next steps:')
  console.log('1. Review the generated files in the data/ directory')
  console.log('2. Run the import command:')
  console.log(`   npx sanity dataset import data/courses-import.ndjson production`)
  console.log('3. Check your Sanity Studio to see the imported data')
}

// Run the script
if (require.main === module) {
  console.log('🚀 Starting course data transformation...\n')
  generateImportFile()
}

module.exports = { loadCourseData, transformCourseData, generateImportFile }
