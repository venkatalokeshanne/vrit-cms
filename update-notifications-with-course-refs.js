// update-notifications-with-course-refs.js
// Run with: npx sanity exec update-notifications-with-course-refs.js --with-user-token

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN
});

// Course name mappings to courseMetadata slugs
const courseMapping = {
  'Full Stack Web Development': 'full-stack-web-development',
  'Data Science Bootcamp': 'data-science',
  'UI/UX Design': 'ui-ux-design',
  'Cloud Computing': 'cloud-computing',
  'AI & Machine Learning': 'ai-machine-learning',
  'DevOps Engineering': 'devops',
  'Mobile App Development': 'mobile-app-development',
  'Cyber Security': 'cyber-security',
  'Digital Marketing': 'digital-marketing',
  'Software Testing': 'software-testing'
};

async function updateNotifications() {
  try {
    // First, get all courseMetadata documents
    const courses = await client.fetch(`*[_type == "courseMetadata"]{_id, slug, title, courseName}`);
    console.log('Available courses:', courses);
    
    // Get all notifications
    const notifications = await client.fetch(`*[_type == "notification"]{_id, courseName, name}`);
    console.log('Found notifications:', notifications.length);
    
    for (const notification of notifications) {
      if (notification.courseName) {
        // Find matching course by courseName or title
        const matchingCourse = courses.find(course => 
          course.courseName === notification.courseName || 
          course.title === notification.courseName ||
          courseMapping[notification.courseName] === course.slug.current
        );
        
        if (matchingCourse) {
          console.log(`Updating ${notification.name} to reference ${matchingCourse.title}`);
          
          await client
            .patch(notification._id)
            .set({
              course: {
                _type: 'reference',
                _ref: matchingCourse._id
              }
            })
            .unset(['courseName']) // Remove the old field
            .commit();
            
          console.log(`✅ Updated ${notification.name}`);
        } else {
          console.log(`❌ No matching course found for: ${notification.courseName}`);
        }
      }
    }
    
    console.log('✅ Update complete!');
  } catch (error) {
    console.error('❌ Error updating notifications:', error);
  }
}

export default updateNotifications;
