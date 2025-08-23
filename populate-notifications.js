// populate-notifications.js
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  token: process.env.SANITY_AUTH_TOKEN, // You'll need to set this
  apiVersion: '2023-01-01',
  useCdn: false
});

const sampleNotifications = [
  {
    _type: 'notification',
    name: 'Rahul S.',
    location: 'Hyderabad',
    type: 'joined',
    courseName: 'Full Stack Web Development',
    timeAgo: 2
  },
  {
    _type: 'notification',
    name: 'Priya M.',
    location: 'Bangalore',
    type: 'placed',
    courseName: 'Data Science Bootcamp',
    timeAgo: 5
  },
  {
    _type: 'notification',
    name: 'Arjun K.',
    location: 'Chennai',
    type: 'joined',
    courseName: 'UI/UX Design',
    timeAgo: 7
  },
  {
    _type: 'notification',
    name: 'Sneha P.',
    location: 'Mumbai',
    type: 'placed',
    courseName: 'Cloud Computing',
    timeAgo: 1
  },
  {
    _type: 'notification',
    name: 'Vikram R.',
    location: 'Delhi',
    type: 'joined',
    courseName: 'AI & Machine Learning',
    timeAgo: 3
  },
  {
    _type: 'notification',
    name: 'Anita D.',
    location: 'Pune',
    type: 'placed',
    courseName: 'DevOps Engineering',
    timeAgo: 6
  },
  {
    _type: 'notification',
    name: 'Kiran T.',
    location: 'Noida',
    type: 'joined',
    courseName: 'Mobile App Development',
    timeAgo: 4
  },
  {
    _type: 'notification',
    name: 'Meera L.',
    location: 'Kolkata',
    type: 'placed',
    courseName: 'Cyber Security',
    timeAgo: 8
  },
  {
    _type: 'notification',
    name: 'Sanjay M.',
    location: 'Ahmedabad',
    type: 'joined',
    courseName: 'Digital Marketing',
    timeAgo: 10
  },
  {
    _type: 'notification',
    name: 'Divya G.',
    location: 'Coimbatore',
    type: 'placed',
    courseName: 'Software Testing',
    timeAgo: 12
  }
];

async function populateNotifications() {
  try {
    console.log('Starting to populate notifications...');
    
    for (const notification of sampleNotifications) {
      const result = await client.create(notification);
      console.log(`✅ Created notification: ${notification.name} - ${notification.type} (${notification.location})`);
    }
    
    console.log('\n🎉 All notifications created successfully!');
    console.log(`📊 Total notifications added: ${sampleNotifications.length}`);
    
  } catch (error) {
    console.error('❌ Error creating notifications:', error);
  }
}

populateNotifications();
