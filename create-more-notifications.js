import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skv9IT9S6cNvFqAaWg3P1Ad1QfNuMhoL03eBlO0CtztlrklGusMBu0FdvTLwruvOnyBKj8DQM00wlL0z5upsxaut1ZW0gp2cPdY99eGrhCl3jTx4g5uIB7rOQFn46lSR50XHgqfeY03WjuilyEQx59oB0K0sORmXcyUh2eNjCg5PdHeesEkG',
})

const createMoreNotifications = async () => {
  const newNotifications = [
    {
      _type: 'notification',
      _id: 'notification-11',
      name: 'Ananya Sharma',
      location: 'Bangalore',
      type: 'placed',
      course: { _type: 'reference', _ref: 'snowflake-training-in-hyderabad' },
      message: 'Secured Data Engineer role at Amazon with 15 LPA! 🎊',
      timeAgo: 12
    },
    {
      _type: 'notification',
      _id: 'notification-12',
      name: 'Rajesh Verma',
      location: 'Hyderabad',
      type: 'joined',
      course: { _type: 'reference', _ref: 'sap-fico-training-in-hyderabad' },
      timeAgo: 15
    },
    {
      _type: 'notification',
      _id: 'notification-13',
      name: 'Meera Patel',
      location: 'Mumbai',
      type: 'placed',
      course: { _type: 'reference', _ref: 'machine-learning-with-python-online-training-in-hyderabad' },
      message: 'Got ML Engineer position at Google with amazing perks! 🤖',
      timeAgo: 18
    },
    {
      _type: 'notification',
      _id: 'notification-14',
      name: 'Karthik Reddy',
      location: 'Chennai',
      type: 'joined',
      course: { _type: 'reference', _ref: 'hadoop-online-training' },
      timeAgo: 20
    },
    {
      _type: 'notification',
      _id: 'notification-15',
      name: 'Pooja Singh',
      location: 'Delhi',
      type: 'placed',
      course: { _type: 'reference', _ref: 'sap-sd-online-training-in-hyderabad' },
      message: 'Landed SAP Consultant role at Capgemini! Dream come true! ✨',
      timeAgo: 25
    }
  ]

  try {
    console.log(`Creating ${newNotifications.length} additional notifications...`)
    
    for (const notification of newNotifications) {
      console.log(`Creating notification: ${notification.name} - ${notification.type} - ${notification.course._ref}`)
      await client.createOrReplace(notification)
    }
    
    console.log(`Successfully created ${newNotifications.length} new notifications`)
  } catch (error) {
    console.error('Failed to create notifications:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
  }
}

createMoreNotifications()
