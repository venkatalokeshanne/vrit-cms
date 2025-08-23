import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skW5DeyPwRdgv3D0J4oc5ji6RLPuvuvciC703EMtW6sh7x9BYsmf6ixZWViza3fsAI86ksD9GcnHpFkxMB5pDbW4TnI0bQmDAChPQL7zWvUfoimK5sDVVT2jxku1IY6MHdFZm0zl5EPKcqHYzyJuB7lPy2MHBt8hBFp2LmQZbSbTid2lCPv9',
})

const testToken = async () => {
  try {
    console.log('Testing token permissions...')
    
    // Try to fetch data first
    const result = await client.fetch('*[_type == "notification"][0]')
    console.log('✓ Read permission works - found:', result?._id || 'no notifications')
    
    // Try to create a test document
    const testDoc = await client.create({
      _type: 'notification',
      _id: 'test-delete-me',
      name: 'Test',
      location: 'Test',
      type: 'joined',
      courseName: 'Test Course',
      timeAgo: 1
    })
    console.log('✓ Create permission works - created:', testDoc._id)
    
    // Try to delete the test document
    await client.delete('test-delete-me')
    console.log('✓ Delete permission works - deleted test document')
    
    console.log('All permissions are working! Token is valid.')
    
  } catch (error) {
    console.error('Token test failed:', error.message)
    if (error.statusCode) {
      console.error('Status code:', error.statusCode)
    }
  }
}

testToken()
