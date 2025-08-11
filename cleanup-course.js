const {createClient} = require('@sanity/client')
require('dotenv').config()

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
})

async function deleteExistingCourse() {
  try {
    console.log('Deleting existing React course with validation errors...')
    
    // Find and delete the existing course
    const existingCourse = await client.fetch(`*[_type == "course" && slug.current == "react-js-training-hyderabad"][0]`)
    if (existingCourse) {
      await client.delete(existingCourse._id)
      console.log('✅ Deleted existing course:', existingCourse._id)
    }
    
    // Find and delete the existing metadata  
    const existingMetadata = await client.fetch(`*[_type == "courseMetadata" && slug.current == "react-js-training-hyderabad"][0]`)
    if (existingMetadata) {
      await client.delete(existingMetadata._id)
      console.log('✅ Deleted existing metadata:', existingMetadata._id)
    }
    
    console.log('🧹 Cleanup completed!')
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }
}

deleteExistingCourse()
