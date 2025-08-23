import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skv9IT9S6cNvFqAaWg3P1Ad1QfNuMhoL03eBlO0CtztlrklGusMBu0FdvTLwruvOnyBKj8DQM00wlL0z5upsxaut1ZW0gp2cPdY99eGrhCl3jTx4g5uIB7rOQFn46lSR50XHgqfeY03WjuilyEQx59oB0K0sORmXcyUh2eNjCg5PdHeesEkG',
})

const deleteImportedCourseMetadata = async () => {
  try {
    // Find all courseMetadata documents that start with "imported-"
    const importedCourses = await client.fetch('*[_type == "courseMetadata" && _id match "imported-*"]{_id}')
    console.log(`Found ${importedCourses.length} imported courseMetadata documents to delete`)
    
    if (importedCourses.length === 0) {
      console.log('No imported courseMetadata documents to delete')
      return
    }
    
    console.log('Imported course IDs:', importedCourses.map(c => c._id))
    
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
