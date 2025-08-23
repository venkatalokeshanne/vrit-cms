import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
})

const deleteAllCourseMetadata = async () => {
  try {
    const courseMetadata = await client.fetch('*[_type == "courseMetadata"]{_id}')
    console.log(`Found ${courseMetadata.length} courseMetadata documents to delete`)
    
    if (courseMetadata.length === 0) {
      console.log('No courseMetadata to delete')
      return
    }
    
    const deletePromises = courseMetadata.map(course => 
      client.delete(course._id)
    )
    
    await Promise.all(deletePromises)
    console.log(`Successfully deleted ${courseMetadata.length} courseMetadata documents`)
  } catch (error) {
    console.error('Failed to delete courseMetadata:', error)
  }
}

deleteAllCourseMetadata()
