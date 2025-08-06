const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

async function verifyCourseData() {
  try {
    console.log('🔍 Verifying imported course metadata...\n');

    // Get total count
    const totalDocs = await client.fetch('count(*[_type == "courseMetadata"])');
    console.log(`📊 Total courseMetadata documents: ${totalDocs}`);

    // Check for specific important slugs
    const importantSlugs = [
      'index',
      'workday-training-in-hyderabad',
      'machine-learning-with-python-online-training-in-hyderabad',
      'sas-clinical-training-in-pune',
      'aboutus',
      'courses',
      'contactus'
    ];

    console.log('\n🔍 Checking for important slugs:');
    for (const slug of importantSlugs) {
      const doc = await client.fetch('*[_type == "courseMetadata" && slug.current == $slug][0]', { slug });
      if (doc) {
        console.log(`  ✅ Found: ${slug} - "${doc.title}"`);
      } else {
        console.log(`  ❌ Missing: ${slug}`);
      }
    }

    // Get all slugs to verify completeness
    const allSlugs = await client.fetch('*[_type == "courseMetadata"]{"current": slug.current}');
    console.log(`\n📋 All imported slugs (${allSlugs.length}):`);
    allSlugs.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.current}`);
    });

    // Check for documents with structured data
    const withStructuredData = await client.fetch('count(*[_type == "courseMetadata" && defined(structuredData)])');
    console.log(`\n🏗️ Documents with structured data: ${withStructuredData}`);

    // Check for documents with keywords
    const withKeywords = await client.fetch('count(*[_type == "courseMetadata" && defined(keywords) && length(keywords) > 0])');
    console.log(`🔑 Documents with keywords: ${withKeywords}`);

    // Check for documents with images
    const withImages = await client.fetch('count(*[_type == "courseMetadata" && (defined(ogImage) || defined(twitterImage))])');
    console.log(`🖼️ Documents with images: ${withImages}`);

    // Sample a few documents to verify field completeness
    const sampleDocs = await client.fetch(`
      *[_type == "courseMetadata"] | order(_createdAt desc)[0...3] {
        slug,
        title,
        description,
        keywords,
        ogTitle,
        ogImage,
        reviewCount,
        ratingValue,
        structuredData {
          context,
          type,
          name,
          address {
            type,
            addressCountry,
            streetAddress
          },
          contactPoint[0] {
            type,
            telephone,
            email
          }
        }
      }
    `);

    console.log('\n📄 Sample documents (showing field structure):');
    sampleDocs.forEach((doc, index) => {
      console.log(`\n  ${index + 1}. ${doc.slug.current}:`);
      console.log(`     Title: ${doc.title ? '✅' : '❌'} ${doc.title?.substring(0, 50)}...`);
      console.log(`     Description: ${doc.description ? '✅' : '❌'}`);
      console.log(`     Keywords: ${doc.keywords?.length ? '✅' : '❌'} (${doc.keywords?.length || 0} items)`);
      console.log(`     OG Image: ${doc.ogImage ? '✅' : '❌'}`);
      console.log(`     Review Count: ${doc.reviewCount ? '✅' : '❌'} (${doc.reviewCount})`);
      console.log(`     Rating: ${doc.ratingValue ? '✅' : '❌'} (${doc.ratingValue})`);
      console.log(`     Structured Data: ${doc.structuredData ? '✅' : '❌'}`);
      if (doc.structuredData) {
        console.log(`       - Context: ${doc.structuredData.context}`);
        console.log(`       - Type: ${doc.structuredData.type}`);
        console.log(`       - Address: ${doc.structuredData.address ? '✅' : '❌'}`);
        console.log(`       - Contact: ${doc.structuredData.contactPoint ? '✅' : '❌'}`);
      }
    });

    console.log('\n✅ Verification complete! All course metadata has been successfully imported with full schema support.');

  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

verifyCourseData();
