import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skv9IT9S6cNvFqAaWg3P1Ad1QfNuMhoL03eBlO0CtztlrklGusMBu0FdvTLwruvOnyBKj8DQM00wlL0z5upsxaut1ZW0gp2cPdY99eGrhCl3jTx4g5uIB7rOQFn46lSR50XHgqfeY03WjuilyEQx59oB0K0sORmXcyUh2eNjCg5PdHeesEkG',
})

const updatePlacementNotifications = async () => {
  try {
    // Update existing placement notifications with custom messages
    const placementUpdates = [
      {
        _id: 'notification-2',
        message: 'Landed a Senior Salesforce Developer role at TCS! 🎉'
      },
      {
        _id: 'notification-4', 
        message: 'Got placed as DevOps Engineer at Infosys with 8 LPA package!'
      },
      {
        _id: 'notification-6',
        message: 'Secured Full Stack Developer position at Microsoft! 💼'
      },
      {
        _id: 'notification-8',
        message: 'Joined as Workday Consultant at Accenture! 🚀'
      },
      {
        _id: 'notification-10',
        message: 'Got ServiceNow Developer role at Wipro with great package! 💰'
      }
    ]

    console.log(`Updating ${placementUpdates.length} placement notifications with custom messages...`)
    
    for (const update of placementUpdates) {
      console.log(`Updating notification ${update._id} with message: ${update.message}`)
      await client
        .patch(update._id)
        .set({ message: update.message })
        .commit()
    }
    
    console.log(`Successfully updated ${placementUpdates.length} notifications with custom messages`)
  } catch (error) {
    console.error('Failed to update notifications:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
  }
}

updatePlacementNotifications()
