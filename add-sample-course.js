const {createClient} = require('@sanity/client')
require('dotenv').config()

const client = createClient({
  projectId: '3hir6j0e',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
})

// Sample React.js course data
const sampleReactCourse = {
  _type: 'course',
  slug: {
    _type: 'slug',
    current: 'react-js-training-hyderabad'
  },
  title: 'React.js Training in Hyderabad',
  description: [
    'Master React.js development with our comprehensive training program. Learn component-based architecture, state management, hooks, and build modern web applications with industry best practices.',
    'Our React.js course is designed to take you from beginner to advanced level with hands-on projects and real-world applications.',
    'Join thousands of successful developers who have transformed their careers with our React.js training program.'
  ],
  duration: '8 weeks (weekdays) / 12 weeks (weekends)',
  status: 'published',
  courseModules: [
    {
      _key: 'module1',
      title: 'React Fundamentals',
      topics: [
        'Introduction to React and JSX',
        'Components and Props',
        'State and Event Handling',
        'Conditional Rendering',
        'Lists and Keys'
      ]
    },
    {
      _key: 'module2',
      title: 'Advanced React Concepts',
      topics: [
        'React Hooks (useState, useEffect, useContext)',
        'Custom Hooks',
        'Component Lifecycle',
        'Error Boundaries',
        'React Router for Navigation'
      ]
    },
    {
      _key: 'module3',
      title: 'State Management & Performance',
      topics: [
        'Context API for State Management',
        'Redux Fundamentals',
        'React Performance Optimization',
        'Code Splitting and Lazy Loading',
        'Testing React Components'
      ]
    },
    {
      _key: 'module4',
      title: 'Real-World Projects',
      topics: [
        'Building a Complete E-commerce App',
        'API Integration and Data Fetching',
        'Form Handling and Validation',
        'Deployment Strategies',
        'Best Practices and Code Quality'
      ]
    }
  ],
  whoShouldAttend: [
    'Front-end developers looking to learn React',
    'JavaScript developers wanting to upskill',
    'Fresh graduates interested in modern web development', 
    'Full-stack developers seeking React expertise',
    'UI/UX designers wanting to understand React development'
  ],
  whatYouLearn: [
    'Master React fundamentals including JSX, components, and props',
    'Understand state management and React hooks (useState, useEffect, useContext)',
    'Build dynamic user interfaces with conditional rendering and lists',
    'Implement React Router for single-page application navigation',
    'Create custom hooks for reusable component logic',
    'Optimize React applications for performance and scalability',
    'Integrate APIs and handle asynchronous data fetching',
    'Test React components using modern testing frameworks',
    'Deploy React applications to production environments',
    'Apply React best practices and coding standards'
  ],
  prerequisites: [
    'Strong knowledge of HTML, CSS, and JavaScript fundamentals',
    'Understanding of ES6+ features (arrow functions, destructuring, modules)',
    'Basic knowledge of Git version control system',
    'Familiarity with npm/yarn package managers',
    'Experience with modern development tools and code editors',
    'Understanding of asynchronous JavaScript (Promises, async/await)',
    'Basic knowledge of command line interface',
    'Willingness to learn and practice coding regularly'
  ],
  whyJoinCourse: [
    'React is the most popular JavaScript library for building user interfaces',
    'High demand for React developers with excellent salary packages',
    'Used by top companies like Facebook, Netflix, Airbnb, and Uber',
    'Build modern, scalable, and maintainable web applications',
    'Strong foundation for learning React Native for mobile development',
    'Active community support and extensive ecosystem of libraries',
    'Excellent career growth opportunities in frontend development',
    'Industry-standard technology with continuous updates and improvements'
  ],
  customSections: [
    {
      _key: 'section1',
      heading: 'React.js Market Demand & Career Opportunities',
      content: [
        'React.js developers are among the highest-paid frontend developers in the industry with average salaries ranging from ₹6-15 LPA for experienced professionals.',
        'Major companies like Facebook, Netflix, Instagram, WhatsApp, and thousands of startups rely on React for their web applications.',
        'The demand for React developers has grown by 150% in the last 3 years, making it one of the most sought-after skills in web development.'
      ]
    },
    {
      _key: 'section2',
      heading: 'Our Training Methodology',
      content: [
        'Live interactive sessions with experienced industry professionals who have worked on production React applications.',
        'Hands-on coding exercises and real-world project development throughout the course duration.',
        'Regular code reviews and mentorship to ensure you follow React best practices and industry standards.',
        'Access to our exclusive React developer community for networking and continuous learning opportunities.'
      ]
    }
  ],
  keyDifferentiators: [
    'Hands-on project-based learning approach',
    'Industry-experienced instructors from top tech companies',
    'Real-time coding sessions with live problem solving',
    '100% job placement assistance with interview preparation',
    'Latest React 18 features and best practices',
    'Small batch sizes for personalized attention',
    'Flexible timing options (weekdays/weekends)',
    'Lifetime access to course materials and updates'
  ],
  faqs: [
    {
      _key: 'faq1',
      question: 'Do I need prior JavaScript experience?',
      answer: 'Yes, basic JavaScript knowledge is recommended. We provide a JavaScript refresher in the first week for those who need it.'
    },
    {
      _key: 'faq2',
      question: 'What projects will I build during the course?',
      answer: 'You will build multiple projects including a todo app, weather dashboard, e-commerce application, and a social media clone using React.'
    },
    {
      _key: 'faq3',
      question: 'Is placement assistance provided?',
      answer: 'Yes, we provide 100% placement assistance including resume building, mock interviews, and direct connections with our hiring partners.'
    },
    {
      _key: 'faq4',
      question: 'What is the duration of the course?',
      answer: 'The complete React.js course is 8 weeks long with 3 sessions per week, each session being 2 hours long.'
    },
    {
      _key: 'faq5',
      question: 'Do you provide certificates?',
      answer: 'Yes, you will receive an industry-recognized completion certificate after successfully finishing the course and projects.'
    }
  ]
}

// Sample courseMetadata for SEO (to be added to existing courseMetadata schema)
const sampleReactMetadata = {
  _type: 'courseMetadata',
  slug: {
    _type: 'slug', 
    current: 'react-js-training-hyderabad'
  },
  title: 'React.js Training in Hyderabad | VR IT Solutions',
  description: 'Join the best React.js training in Hyderabad. Learn component-based development, hooks, state management with expert instructors. 100% placement assistance.',
  keywords: ['react js training', 'react course hyderabad', 'javascript training', 'frontend development', 'react certification'],
  ogTitle: 'Best React.js Training in Hyderabad - VR IT Solutions',
  ogDescription: 'Master React.js with hands-on projects. Expert instructors, placement assistance, and industry-relevant curriculum.',
  twitterTitle: 'React.js Training in Hyderabad | VR IT Solutions', 
  twitterDescription: 'Learn React.js from industry experts. Comprehensive training with real projects and placement support.',
  ogUrl: 'https://www.vritsol.com/react-js-training-hyderabad',
  twitterUrl: 'https://www.vritsol.com/react-js-training-hyderabad',
  canonical: 'https://www.vritsol.com/react-js-training-hyderabad',
  hreflang: 'en-IN',
  reviewCount: '95',
  ratingValue: '4.8',
  mainImage: '/images/react-training-banner.jpg'
}

async function addSampleCourse() {
  try {
    console.log('Adding sample React.js course...')
    
    // First add the course content
    const courseResult = await client.create(sampleReactCourse)
    console.log('✅ Course created successfully:', courseResult._id)
    
    // Then add the courseMetadata for SEO
    const metadataResult = await client.create(sampleReactMetadata)
    console.log('✅ Course metadata created successfully:', metadataResult._id)
    
    console.log('\n🎉 Sample React.js course added successfully!')
    console.log('📖 Course slug: react-js-training-hyderabad')
    console.log('🌐 URL: https://www.vritsol.com/react-js-training-hyderabad')
    console.log('\nYou can now:')
    console.log('1. View the course in Sanity Studio')
    console.log('2. Visit the course page on your website') 
    console.log('3. See it listed on /courses page')
    console.log('4. Find it on your homepage with 💎 DYNAMIC badge')
    
  } catch (error) {
    console.error('❌ Error adding sample course:', error)
  }
}

addSampleCourse()
