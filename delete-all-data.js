const { createClient } = require('@sanity/client');

// Sanity client configuration with write permissions
const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'sknNDhupje6H30eueHDFKAz9lVBD3sys8okwmuNeu6OxNL7MCGOmvOTDUnLOvHoEoclRnP6tvPdqOsci2b0jkRF68QO79B0gRuTseQ5Xjon8s3vN2qnj3myf2vQrg4QmZOPpLmqULHDYMhd2332hEIFLqc8DfyIGzc1Bf8IOHhlekO2F6MTp',
  useCdn: false,
});

async function deleteAllDocuments() {
  try {
    console.log('🗑️  Starting to delete all documents from Sanity...\n');
    
    // Get all document types first
    console.log('Checking existing document types...');
    const allDocs = await client.fetch('*[] { _type, _id }');
    const docTypes = [...new Set(allDocs.map(doc => doc._type))];
    
    console.log(`Found ${allDocs.length} documents of types: ${docTypes.join(', ')}\n`);
    
    // Delete documents by type
    for (const docType of docTypes) {
      console.log(`Deleting all documents of type: ${docType}`);
      
      // Get all document IDs for this type
      const docs = await client.fetch(`*[_type == "${docType}"] { _id }`);
      console.log(`Found ${docs.length} documents of type ${docType}`);
      
      if (docs.length > 0) {
        // Delete in batches to avoid overwhelming the API
        const batchSize = 50;
        for (let i = 0; i < docs.length; i += batchSize) {
          const batch = docs.slice(i, i + batchSize);
          
          try {
            const mutations = batch.map(doc => ({
              delete: { id: doc._id }
            }));
            
            await client.mutate(mutations);
            console.log(`✅ Deleted batch ${Math.floor(i/batchSize) + 1} (${batch.length} documents)`);
          } catch (error) {
            console.error(`❌ Error deleting batch:`, error.message);
          }
          
          // Small delay between batches
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      console.log(`✅ Completed deletion of ${docType} documents\n`);
    }
    
    // Verify all documents are deleted
    const remainingDocs = await client.fetch('*[] { _type, _id }');
    console.log(`\n=== CLEANUP SUMMARY ===`);
    console.log(`Remaining documents: ${remainingDocs.length}`);
    
    if (remainingDocs.length === 0) {
      console.log('🎉 SUCCESS: All documents have been deleted from Sanity!');
    } else {
      console.log('⚠️  Some documents remain:');
      remainingDocs.forEach(doc => {
        console.log(`- ${doc._type}: ${doc._id}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

// Run the cleanup
deleteAllDocuments();
