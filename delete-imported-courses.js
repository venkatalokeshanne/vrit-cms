import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
})

const deleteImportedCourseMetadata = async () => {
  try {
    // Only delete courseMetadata documents that start with "imported-"
    const importedCourses = await client.fetch('*[_type == "courseMetadata" && _id match "imported-*"]{_id}')
    console.log(`Found ${importedCourses.length} imported courseMetadata documents to delete`)
    
    if (importedCourses.length === 0) {
      console.log('No imported courseMetadata documents to delete')
      return
    }
    
    // Show which ones we're about to delete
    console.log('Documents to delete:')
    importedCourses.forEach(course => console.log('- ' + course._id))
    
    const deletePromises = importedCourses.map(course => 
      client.delete(course._id)
    )
    
    await Promise.all(deletePromises)
    console.log(`Successfully deleted ${importedCourses.length} imported courseMetadata documents`)
  } catch (error) {
    console.error('Failed to delete imported courseMetadata:', error)
  }
}

deleteImportedCourseMetadata()
