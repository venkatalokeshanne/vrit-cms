const {createClient} = require('@sanity/client')
require('dotenv').config()

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2022-06-01'
})

async function deleteCourseMetadata() {
  try {
    // Get all courseMetadata documents
    const documents = await client.fetch('*[_type == "courseMetadata"]._id')
    
    console.log(`Found ${documents.length} courseMetadata documents to delete`)
    
    // Delete documents in batches
    const batchSize = 10
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize)
      
      console.log(`Deleting batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(documents.length/batchSize)}...`)
      
      const transaction = client.transaction()
      batch.forEach(id => {
        transaction.delete(id)
      })
      
      await transaction.commit()
      console.log(`Deleted ${batch.length} documents`)
    }
    
    console.log('All courseMetadata documents deleted successfully!')
    
  } catch (error) {
    console.error('Error deleting documents:', error)
  }
}

deleteCourseMetadata()
