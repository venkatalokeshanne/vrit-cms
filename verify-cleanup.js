const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

async function verifyCleanup() {
  try {
    console.log('🔍 Verifying cleanup...\n');
    
    // Check total documents
    const allDocs = await client.fetch('*[] { _type, _id }');
    console.log(`Total documents remaining: ${allDocs.length}`);
    
    // Check specifically for course-related documents
    const courseDocs = await client.fetch('*[_type match "*course*"] { _type, _id }');
    console.log(`Course-related documents: ${courseDocs.length}`);
    
    const metadataDocs = await client.fetch('*[_type match "*metadata*"] { _type, _id }');
    console.log(`Metadata-related documents: ${metadataDocs.length}`);
    
    // List remaining document types (excluding system documents)
    const userDocs = allDocs.filter(doc => !doc._type.startsWith('system.'));
    console.log(`\nUser documents remaining: ${userDocs.length}`);
    
    if (userDocs.length > 0) {
      console.log('Remaining user document types:');
      const userTypes = [...new Set(userDocs.map(doc => doc._type))];
      userTypes.forEach(type => {
        const count = userDocs.filter(doc => doc._type === type).length;
        console.log(`- ${type}: ${count} documents`);
      });
    }
    
    console.log('\n✅ Cleanup verification complete!');
    
    if (courseDocs.length === 0 && metadataDocs.length === 0) {
      console.log('🎉 SUCCESS: All course and metadata documents have been removed!');
    }
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
  }
}

verifyCleanup();
