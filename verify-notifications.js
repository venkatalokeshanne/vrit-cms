// verify-notifications.js
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false
});

async function verifyNotifications() {
  try {
    const query = `*[_type == "notification"] | order(_createdAt desc) {
      _id,
      name,
      location,
      type,
      courseName,
      timeAgo
    }`;
    
    const notifications = await client.fetch(query);
    console.log(`📊 Found ${notifications.length} notifications in Sanity:`);
    console.log(notifications);
    
  } catch (error) {
    console.error('❌ Error fetching notifications:', error);
  }
}

verifyNotifications();
