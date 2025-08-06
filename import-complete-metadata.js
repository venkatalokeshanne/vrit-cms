const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Sanity client
const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

// Read the JSON data
const jsonPath = path.join('c:', 'Users', 'annev', 'workspace', 'vr-it-sol', 'src', 'data', 'coursesMetadata.json');
const coursesData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log(`Found ${coursesData.length} records to import`);

// Function to transform the data for Sanity
function transformCourseData(course, index) {
  // Skip empty objects (objects that only have streetAddress or are completely empty)
  if (!course.slug || (Object.keys(course).length === 1 && course.streetAddress)) {
    console.log(`Skipping empty/invalid record at index ${index}:`, course);
    return null;
  }

  const transformed = {
    _type: 'courseMetadata',
    _id: course.slug,
    slug: {
      _type: 'slug',
      current: course.slug
    }
  };

  // Add all simple fields
  const simpleFields = [
    'title', 'description', 'ogTitle', 'ogDescription', 
    'twitterTitle', 'twitterDescription', 'ogImage', 'twitterImage',
    'ogUrl', 'twitterUrl', 'canonical', 'hreflang',
    'reviewCount', 'ratingValue', 'organizationName', 
    'postalCode', 'streetAddress'
  ];

  simpleFields.forEach(field => {
    if (course[field] !== undefined && course[field] !== null && course[field] !== '') {
      transformed[field] = course[field];
    }
  });

  // Handle keywords array
  if (course.keywords) {
    if (Array.isArray(course.keywords)) {
      transformed.keywords = course.keywords.filter(k => k && k.trim());
    } else if (typeof course.keywords === 'string') {
      // Handle cases where keywords is a comma-separated string
      transformed.keywords = course.keywords.split(',').map(k => k.trim()).filter(k => k);
    }
  }

  // Handle structured data
  if (course.structuredData) {
    const structuredData = { ...course.structuredData };
    
    // Transform @context and @type fields
    if (structuredData['@context']) {
      structuredData.context = structuredData['@context'];
      delete structuredData['@context'];
    }
    if (structuredData['@type']) {
      structuredData.type = structuredData['@type'];
      delete structuredData['@type'];
    }

    // Handle nested address object
    if (structuredData.address) {
      const address = { ...structuredData.address };
      if (address['@type']) {
        address.type = address['@type'];
        delete address['@type'];
      }
      structuredData.address = address;
    }

    // Handle contact points
    if (structuredData.contactPoint && Array.isArray(structuredData.contactPoint)) {
      structuredData.contactPoint = structuredData.contactPoint.map(contact => {
        const transformedContact = { ...contact };
        if (transformedContact['@type']) {
          transformedContact.type = transformedContact['@type'];
          delete transformedContact['@type'];
        }
        return transformedContact;
      });
    }

    transformed.structuredData = structuredData;
  }

  return transformed;
}

// Function to import data in batches
async function importData() {
  try {
    const validCourses = [];
    let skippedCount = 0;

    // Transform and filter data
    coursesData.forEach((course, index) => {
      const transformed = transformCourseData(course, index);
      if (transformed) {
        validCourses.push(transformed);
      } else {
        skippedCount++;
      }
    });

    console.log(`Transformed ${validCourses.length} valid records`);
    console.log(`Skipped ${skippedCount} invalid/empty records`);

    // Import in batches
    const batchSize = 50;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < validCourses.length; i += batchSize) {
      const batch = validCourses.slice(i, i + batchSize);
      
      console.log(`\nProcessing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(validCourses.length / batchSize)} (${batch.length} records)`);
      
      try {
        // Create or replace documents
        const transaction = client.transaction();
        batch.forEach(doc => {
          transaction.createOrReplace(doc);
        });
        
        await transaction.commit();
        successCount += batch.length;
        console.log(`✅ Successfully imported batch of ${batch.length} records`);
        
        // Show progress
        console.log(`Progress: ${successCount}/${validCourses.length} records imported`);
        
      } catch (error) {
        console.error(`❌ Failed to import batch:`, error.message);
        errorCount += batch.length;
        
        // Try importing individually to identify problematic records
        console.log('Attempting individual import for this batch...');
        for (const doc of batch) {
          try {
            await client.createOrReplace(doc);
            console.log(`  ✅ Individual import success: ${doc.slug.current}`);
            successCount++;
          } catch (individualError) {
            console.log(`  ❌ Individual import failed: ${doc.slug.current} - ${individualError.message}`);
            errorCount++;
          }
        }
      }
      
      // Add small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n🎉 Import completed!');
    console.log(`✅ Successfully imported: ${successCount} records`);
    console.log(`❌ Failed imports: ${errorCount} records`);
    console.log(`⏭️ Skipped invalid: ${skippedCount} records`);
    console.log(`📊 Total processed: ${successCount + errorCount + skippedCount} records`);

  } catch (error) {
    console.error('❌ Import process failed:', error);
  }
}

// Run the import
console.log('🚀 Starting comprehensive course metadata import...\n');
importData();
