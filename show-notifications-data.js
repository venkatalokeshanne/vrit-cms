// populate-notifications-simple.js
// Run with: node populate-notifications-simple.js

const notifications = [
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

console.log('Sample Notifications Data:');
console.log(JSON.stringify(notifications, null, 2));
console.log('\n📋 Copy this data and manually add to Sanity Studio, or use the import feature.');
console.log('🌐 Access Sanity Studio at: http://localhost:3333');
console.log('📝 Go to Content > Course Notification to add new entries manually.');
