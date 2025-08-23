import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skv9IT9S6cNvFqAaWg3P1Ad1QfNuMhoL03eBlO0CtztlrklGusMBu0FdvTLwruvOnyBKj8DQM00wlL0z5upsxaut1ZW0gp2cPdY99eGrhCl3jTx4g5uIB7rOQFn46lSR50XHgqfeY03WjuilyEQx59oB0K0sORmXcyUh2eNjCg5PdHeesEkG',
})

const createNotifications = async () => {
  const notifications = [
    {
      _type: 'notification',
      _id: 'notification-1',
      name: 'Arjun Sharma',
      location: 'Bangalore',
      type: 'joined',
      course: { _type: 'reference', _ref: 'data-science-training-in-hyderabad' },
      timeAgo: 2
    },
    {
      _type: 'notification',
      _id: 'notification-2',
      name: 'Priya Reddy',
      location: 'Hyderabad',
      type: 'placed',
      course: { _type: 'reference', _ref: 'salesforce-training-in-hyderabad' },
      timeAgo: 5
    },
    {
      _type: 'notification',
      _id: 'notification-3',
      name: 'Vikash Kumar',
      location: 'Delhi',
      type: 'joined',
      course: { _type: 'reference', _ref: 'python-online-training' },
      timeAgo: 3
    },
    {
      _type: 'notification',
      _id: 'notification-4',
      name: 'Sneha Patel',
      location: 'Mumbai',
      type: 'placed',
      course: { _type: 'reference', _ref: 'azure-devops-training-in-hyderabad' },
      timeAgo: 7
    },
    {
      _type: 'notification',
      _id: 'notification-5',
      name: 'Rahul Singh',
      location: 'Pune',
      type: 'joined',
      course: { _type: 'reference', _ref: 'machine-learning-with-python-training-in-hyderabad' },
      timeAgo: 1
    },
    {
      _type: 'notification',
      _id: 'notification-6',
      name: 'Kavitha Nair',
      location: 'Chennai',
      type: 'placed',
      course: { _type: 'reference', _ref: 'full-stack-developer-training-in-hyderabad' },
      timeAgo: 4
    },
    {
      _type: 'notification',
      _id: 'notification-7',
      name: 'Aditya Gupta',
      location: 'Kolkata',
      type: 'joined',
      course: { _type: 'reference', _ref: 'pega-training-in-hyderabad' },
      timeAgo: 6
    },
    {
      _type: 'notification',
      _id: 'notification-8',
      name: 'Roshni Agarwal',
      location: 'Jaipur',
      type: 'placed',
      course: { _type: 'reference', _ref: 'workday-training-in-hyderabad' },
      timeAgo: 8
    },
    {
      _type: 'notification',
      _id: 'notification-9',
      name: 'Sunil Yadav',
      location: 'Lucknow',
      type: 'joined',
      course: { _type: 'reference', _ref: 'devops-training-in-hyderabad' },
      timeAgo: 9
    },
    {
      _type: 'notification',
      _id: 'notification-10',
      name: 'Deepika Jain',
      location: 'Ahmedabad',
      type: 'placed',
      course: { _type: 'reference', _ref: 'servicenow-training-in-hyderabad' },
      timeAgo: 10
    }
  ]

  try {
    console.log(`Creating ${notifications.length} notifications...`)
    
    for (const notification of notifications) {
      console.log(`Creating notification: ${notification.name} - ${notification.type} - ${notification.course._ref}`)
      await client.createOrReplace(notification)
    }
    
    console.log(`Successfully created ${notifications.length} notifications`)
  } catch (error) {
    console.error('Failed to create notifications:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
  }
}

createNotifications()
