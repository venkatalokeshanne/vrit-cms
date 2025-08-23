// add-sample-notifications.js
// Run this with `sanity exec add-sample-notifications.js --with-user-token`

import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@sanity/client';

const sampleNotifications = [
  {
    name: 'Rahul S.',
    location: 'Hyderabad',
    type: 'joined',
    courseName: 'Full Stack Web Development',
    timeAgo: 2
  },
  {
    name: 'Priya M.',
    location: 'Bangalore',
    type: 'placed',
    courseName: 'Data Science Bootcamp',
    timeAgo: 5
  },
  {
    name: 'Arjun K.',
    location: 'Chennai',
    type: 'joined',
    courseName: 'UI/UX Design',
    timeAgo: 7
  },
  {
    name: 'Sneha P.',
    location: 'Mumbai',
    type: 'placed',
    courseName: 'Cloud Computing',
    timeAgo: 1
  },
  {
    name: 'Vikram R.',
    location: 'Delhi',
    type: 'joined',
    courseName: 'AI & ML',
    timeAgo: 3
  },
  {
    name: 'Anita D.',
    location: 'Pune',
    type: 'placed',
    courseName: 'DevOps Engineering',
    timeAgo: 6
  },
  {
    name: 'Kiran T.',
    location: 'Noida',
    type: 'joined',
    courseName: 'Mobile App Development',
    timeAgo: 4
  },
  {
    name: 'Meera L.',
    location: 'Kolkata',
    type: 'placed',
    courseName: 'Cyber Security',
    timeAgo: 8
  }
];

export default async function createNotifications(client) {
  for (const notif of sampleNotifications) {
    try {
      await client.createIfNotExists({
        _id: `notification.${uuidv4()}`,
        _type: 'notification',
        ...notif
      });
      console.log(`Created notification for ${notif.name}`);
    } catch (error) {
      console.error(`Error creating notification for ${notif.name}:`, error);
    }
  }
  console.log('Sample notifications script completed!');
}
