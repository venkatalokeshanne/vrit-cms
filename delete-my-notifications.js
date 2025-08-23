import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skv9IT9S6cNvFqAaWg3P1Ad1QfNuMhoL03eBlO0CtztlrklGusMBu0FdvTLwruvOnyBKj8DQM00wlL0z5upsxaut1ZW0gp2cPdY99eGrhCl3jTx4g5uIB7rOQFn46lSR50XHgqfeY03WjuilyEQx59oB0K0sORmXcyUh2eNjCg5PdHeesEkG',
})

const deleteMyNotifications = async () => {
  try {
    // Find all notifications that I created (with specific IDs)
    const myNotifications = await client.fetch(`*[_type == "notification" && (_id match "fresh-notification-*" || _id match "notification-*")]{_id}`)
    console.log(`Found ${myNotifications.length} notifications to delete`)
    
    if (myNotifications.length === 0) {
      console.log('No notifications to delete')
      return
    }
    
    // Delete them
    for (const notification of myNotifications) {
      console.log(`Deleting notification: ${notification._id}`)
      await client.delete(notification._id)
    }
    
    console.log(`Successfully deleted ${myNotifications.length} notifications`)
  } catch (error) {
    console.error('Failed to delete notifications:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
  }
}

deleteMyNotifications()
