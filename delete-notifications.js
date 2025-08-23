import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
})

const deleteAllNotifications = async () => {
  try {
    const notifications = await client.fetch('*[_type == "notification"]{_id}')
    console.log(`Found ${notifications.length} notifications to delete`)
    
    if (notifications.length === 0) {
      console.log('No notifications to delete')
      return
    }
    
    const deletePromises = notifications.map(notification => 
      client.delete(notification._id)
    )
    
    await Promise.all(deletePromises)
    console.log(`Successfully deleted ${notifications.length} notifications`)
  } catch (error) {
    console.error('Failed to delete notifications:', error)
  }
}

deleteAllNotifications()
