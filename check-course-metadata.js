import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN, // Need auth token to read
})

const query = '*[_type == "courseMetadata"]{_id, title, courseName, slug}'

client.fetch(query)
  .then((courses) => {
    console.log('Available courseMetadata documents:')
    console.log(JSON.stringify(courses, null, 2))
  })
  .catch((err) => {
    console.error('Query failed:', err.message)
  })
