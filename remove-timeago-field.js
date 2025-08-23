const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skv9IT9S6cNvFqAaWg3P1Ad1QfNuMhoL03eBlO0CtztlrklGusMBu0FdvTLwruvOnyBKj8DQM00wlL0z5upsxaut1ZW0gp2cPdY99eGrhCl3jTx4g5uIB7rOQFn46lSR50XHgqfeY03WjuilyEQx59oB0K0sORmXcyUh2eNjCg5PdHeesEkG',
})

const removeTimeAgoFromNotifications = async () => {
  try {
    // Get all notifications
    const notifications = await client.fetch('*[_type == "notification"]{_id}')
    console.log(`Found ${notifications.length} notifications to update`)
    
    if (notifications.length === 0) {
      console.log('No notifications found')
      return
    }
    
    // Remove timeAgo field from all notifications
    for (const notification of notifications) {
      console.log(`Removing timeAgo from notification: ${notification._id}`)
      await client
        .patch(notification._id)
        .unset(['timeAgo'])
        .commit()
    }
    
    console.log(`Successfully removed timeAgo field from ${notifications.length} notifications`)
  } catch (error) {
    console.error('Failed to remove timeAgo from notifications:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
  }
}

removeTimeAgoFromNotifications()
