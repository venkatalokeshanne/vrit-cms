const {createClient} = require('@sanity/client')
const fs = require('fs')
require('dotenv').config()

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2022-06-01'
})

// Read the JSON data
const jsonData = JSON.parse(fs.readFileSync('C:/Users/annev/workspace/vr-it-sol/src/data/coursesMetadata.json', 'utf8'))

// Define the fields that exist in the schema (excluding image fields)
const schemaFields = [
  'slug',
  'title', 
  'description',
  'keywords',
  'ogTitle',
  'ogDescription',
  'twitterTitle',
  'twitterDescription',
  'ogUrl',
  'twitterUrl',
  'canonical',
  'hreflang',
  'reviewCount',
  'ratingValue',
  'organizationName',
  'postalCode',
  'streetAddress'
]

async function importCourseMetadata() {
  try {
    console.log(`Starting import of ${jsonData.length} course metadata records...`)
    
    let successful = 0
    let errors = 0
    
    // Process each record
    for (let i = 0; i < jsonData.length; i++) {
      const record = jsonData[i]
      
      // Skip records that don't have a slug or are incomplete
      if (!record.slug || typeof record.slug !== 'string') {
        console.log(`Skipping record ${i + 1}: Missing or invalid slug`)
        errors++
        continue
      }
      
      // Map only the fields that exist in schema
      const sanitizedRecord = {
        _type: 'courseMetadata',
        _id: record.slug // Use slug as ID
      }
      
      // Add fields that exist in schema
      schemaFields.forEach(field => {
        if (record[field] !== undefined && record[field] !== null) {
          if (field === 'slug') {
            // Handle slug field specially as it needs to be an object
            sanitizedRecord.slug = {
              _type: 'slug',
              current: record.slug
            }
          } else if (field === 'keywords') {
            // Handle keywords array - ensure it's always an array
            if (typeof record.keywords === 'string') {
              // If keywords is a string, split by comma
              sanitizedRecord.keywords = record.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
            } else if (Array.isArray(record.keywords)) {
              sanitizedRecord.keywords = record.keywords.filter(k => k && k.trim && k.trim().length > 0)
            }
          } else {
            sanitizedRecord[field] = record[field]
          }
        }
      })
      
      try {
        // Create or update the document
        await client.createOrReplace(sanitizedRecord)
        console.log(`✓ Imported: ${record.slug}`)
        successful++
      } catch (error) {
        console.error(`✗ Failed to import ${record.slug}:`, error.message)
        errors++
      }
    }
    
    console.log(`\nImport completed!`)
    console.log(`Successfully imported: ${successful} records`)
    console.log(`Errors: ${errors} records`)
    
  } catch (error) {
    console.error('Import failed:', error)
  }
}

importCourseMetadata()
