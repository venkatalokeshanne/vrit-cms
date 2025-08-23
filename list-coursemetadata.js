import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skv9IT9S6cNvFqAaWg3P1Ad1QfNuMhoL03eBlO0CtztlrklGusMBu0FdvTLwruvOnyBKj8DQM00wlL0z5upsxaut1ZW0gp2cPdY99eGrhCl3jTx4g5uIB7rOQFn46lSR50XHgqfeY03WjuilyEQx59oB0K0sORmXcyUh2eNjCg5PdHeesEkG',
})

const listExistingCourseMetadata = async () => {
  try {
    const courses = await client.fetch('*[_type == "courseMetadata"]{_id, title, slug, courseName}')
    console.log(`Found ${courses.length} existing courseMetadata documents:`)
    console.log(JSON.stringify(courses, null, 2))
  } catch (error) {
    console.error('Failed to fetch courseMetadata:', error.message)
  }
}

listExistingCourseMetadata()
