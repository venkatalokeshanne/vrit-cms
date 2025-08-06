// Sample course data for seeding the Sanity CMS
// You can import this data through the Sanity Studio or use the Sanity client to populate

export const sampleCourses = [
  {
    _type: 'courseMetadata',
    courseTitle: 'SAP FICO Online Training in Hyderabad',
    courseSubtitle: 'Complete SAP Financial Accounting & Controlling Course',
    courseDescription: 'Comprehensive SAP FICO training covering Financial Accounting (FI) and Controlling (CO) modules. Learn from industry experts with hands-on experience in real-time projects.',
    slug: { current: 'sap-fico-online-training-hyderabad' },
    
    seo: {
      metaTitle: 'SAP FICO Online Training in Hyderabad | VR IT Solutions',
      metaDescription: 'Join the best SAP FICO online training in Hyderabad. Expert-led courses with placement assistance. Enroll now for comprehensive Financial & Controlling modules.',
      canonicalUrl: 'https://vritsolutions.com/sap-fico-online-training-hyderabad',
      ogTitle: 'Best SAP FICO Training in Hyderabad',
      ogDescription: 'Master SAP FICO with our comprehensive online training program. Expert instructors, real-time projects, and placement support.'
    },
    
    duration: '45 Days',
    mode: ['online', 'classroom', 'weekend'],
    level: 'intermediate',
    
    pricing: {
      currency: 'INR',
      price: 25000,
      originalPrice: 35000,
      priceValidUntil: '2024-12-31'
    },
    
    courseFeatures: [
      'Real-time project experience',
      '100% placement assistance',
      'Expert trainers from top MNCs',
      'Flexible timings',
      'Interview preparation',
      'Resume building support',
      'Lifetime access to course materials'
    ],
    
    prerequisites: [
      'Basic understanding of accounting principles',
      'Computer literacy',
      'Bachelor\'s degree (preferred)'
    ],
    
    learningObjectives: [
      'Master SAP FI module configuration and transactions',
      'Understand SAP CO module for cost management',
      'Learn integration between FI and CO modules',
      'Gain expertise in financial reporting',
      'Develop skills for real-time project implementation'
    ],
    
    locations: ['hyderabad', 'online'],
    status: 'active',
    
    structuredData: {
      provider: 'VR IT Solutions',
      providerUrl: 'https://vritsolutions.com',
      courseType: 'professional-certificate'
    },
    
    cta: {
      primaryText: 'Enroll Now',
      secondaryText: 'Download Syllabus',
      contactNumber: '+91-9876543210',
      whatsappNumber: '+91-9876543210'
    }
  },
  
  {
    _type: 'courseMetadata',
    courseTitle: 'Python Online Training with AWS',
    courseSubtitle: 'Complete Python Programming with AWS Cloud Integration',
    courseDescription: 'Learn Python programming from basics to advanced concepts with AWS cloud integration. Perfect for beginners and professionals looking to enhance their cloud computing skills.',
    slug: { current: 'python-online-training-aws' },
    
    seo: {
      metaTitle: 'Python Online Training with AWS | Best Course in Hyderabad',
      metaDescription: 'Master Python programming with AWS integration. Comprehensive online training with hands-on projects, expert guidance, and placement support.',
      canonicalUrl: 'https://vritsolutions.com/python-online-training-aws',
      ogTitle: 'Python with AWS Training - Complete Course',
      ogDescription: 'Become a Python expert with AWS cloud skills. Industry-relevant curriculum with real-time projects.'
    },
    
    duration: '60 Days',
    mode: ['online', 'classroom', 'corporate'],
    level: 'beginner',
    
    pricing: {
      currency: 'INR',
      price: 20000,
      originalPrice: 28000,
      priceValidUntil: '2024-12-31'
    },
    
    courseFeatures: [
      'Hands-on coding practice',
      'AWS cloud integration projects',
      'Industry-relevant curriculum',
      'Expert Python developers as instructors',
      'Career guidance and placement support',
      'Certificate of completion',
      'Lifetime course access'
    ],
    
    prerequisites: [
      'Basic computer knowledge',
      'No prior programming experience required',
      'Enthusiasm to learn coding'
    ],
    
    learningObjectives: [
      'Master Python syntax and core concepts',
      'Build real-world applications with Python',
      'Learn AWS services integration',
      'Develop web applications using Python frameworks',
      'Understand database connectivity and API development'
    ],
    
    locations: ['hyderabad', 'online', 'bangalore'],
    status: 'active',
    
    structuredData: {
      provider: 'VR IT Solutions',
      providerUrl: 'https://vritsolutions.com',
      courseType: 'technical-training'
    },
    
    cta: {
      primaryText: 'Start Learning',
      secondaryText: 'View Curriculum',
      contactNumber: '+91-9876543210',
      whatsappNumber: '+91-9876543210'
    }
  },
  
  {
    _type: 'courseMetadata',
    courseTitle: 'Azure DevOps Training in Hyderabad',
    courseSubtitle: 'Complete CI/CD Pipeline and DevOps Practices',
    courseDescription: 'Comprehensive Azure DevOps training covering CI/CD pipelines, version control, project management, and deployment strategies. Learn from certified Azure professionals.',
    slug: { current: 'azure-devops-training-hyderabad' },
    
    seo: {
      metaTitle: 'Azure DevOps Training in Hyderabad | CI/CD Pipeline Course',
      metaDescription: 'Master Azure DevOps with our comprehensive training. Learn CI/CD pipelines, Git, Azure Boards, and deployment strategies. Expert-led course with certification.',
      canonicalUrl: 'https://vritsolutions.com/azure-devops-training-hyderabad',
      ogTitle: 'Azure DevOps Training - Master CI/CD & Cloud Deployment',
      ogDescription: 'Become an Azure DevOps expert with hands-on training in CI/CD pipelines, source control, and cloud deployment strategies.'
    },
    
    duration: '40 Hours',
    mode: ['online', 'classroom', 'weekend'],
    level: 'intermediate',
    
    pricing: {
      currency: 'INR',
      price: 22000,
      originalPrice: 30000,
      priceValidUntil: '2024-12-31'
    },
    
    courseFeatures: [
      'Hands-on Azure DevOps labs',
      'Real-time CI/CD pipeline projects',
      'Azure certification preparation',
      'Industry best practices',
      'Expert Azure consultants as trainers',
      'Job placement assistance',
      'Course completion certificate'
    ],
    
    prerequisites: [
      'Basic understanding of software development',
      'Familiarity with cloud concepts',
      'Experience with any programming language'
    ],
    
    learningObjectives: [
      'Master Azure DevOps services and tools',
      'Implement CI/CD pipelines effectively',
      'Learn infrastructure as code practices',
      'Understand agile project management in Azure',
      'Develop expertise in automated testing and deployment'
    ],
    
    locations: ['hyderabad', 'online', 'pune'],
    status: 'active',
    
    structuredData: {
      provider: 'VR IT Solutions',
      providerUrl: 'https://vritsolutions.com',
      courseType: 'professional-certificate'
    },
    
    cta: {
      primaryText: 'Enroll Today',
      secondaryText: 'Free Demo',
      contactNumber: '+91-9876543210',
      whatsappNumber: '+91-9876543210'
    }
  }
];

export const sampleInstructors = [
  {
    _type: 'instructor',
    name: 'Rajesh Kumar',
    slug: { current: 'rajesh-kumar' },
    bio: 'Senior SAP Consultant with 12+ years of experience in implementing SAP FI/CO modules across various industries. Certified SAP consultant with expertise in end-to-end project delivery.',
    experience: 12,
    expertise: ['SAP FICO', 'SAP S/4HANA', 'Financial Reporting', 'SAP Integration'],
    certifications: ['SAP Certified Application Associate - Financial Accounting', 'SAP Certified Application Associate - Management Accounting'],
    linkedIn: 'https://linkedin.com/in/rajesh-kumar-sap',
    email: 'rajesh.kumar@vritsolutions.com'
  },
  
  {
    _type: 'instructor',
    name: 'Priya Sharma',
    slug: { current: 'priya-sharma' },
    bio: 'Full-stack Python developer and AWS certified solutions architect with 8+ years of experience. Passionate about teaching and helping students transition into tech careers.',
    experience: 8,
    expertise: ['Python', 'Django', 'Flask', 'AWS', 'Machine Learning', 'Data Science'],
    certifications: ['AWS Certified Solutions Architect', 'Python Institute Certified Python Programmer', 'AWS Certified Developer'],
    linkedIn: 'https://linkedin.com/in/priya-sharma-python',
    email: 'priya.sharma@vritsolutions.com'
  },
  
  {
    _type: 'instructor',
    name: 'Amit Patel',
    slug: { current: 'amit-patel' },
    bio: 'DevOps engineer and Azure certified professional with extensive experience in cloud infrastructure and CI/CD pipeline implementation. Previously worked at Microsoft and leading tech companies.',
    experience: 10,
    expertise: ['Azure DevOps', 'CI/CD Pipelines', 'Docker', 'Kubernetes', 'Infrastructure as Code', 'Azure Cloud'],
    certifications: ['Microsoft Certified: Azure DevOps Engineer Expert', 'Microsoft Certified: Azure Solutions Architect Expert', 'Certified Kubernetes Administrator'],
    linkedIn: 'https://linkedin.com/in/amit-patel-devops',
    email: 'amit.patel@vritsolutions.com'
  }
];

export const sampleCategories = [
  {
    _type: 'courseCategory',
    name: 'SAP Training',
    slug: { current: 'sap-training' },
    description: 'Enterprise resource planning solutions with SAP modules including FICO, MM, SD, and more.',
    color: '#3B82F6',
    order: 1
  },
  
  {
    _type: 'courseCategory',
    name: 'Programming & Development',
    slug: { current: 'programming-development' },
    description: 'Learn popular programming languages and frameworks for web, mobile, and desktop development.',
    color: '#10B981',
    order: 2
  },
  
  {
    _type: 'courseCategory',
    name: 'Cloud & DevOps',
    slug: { current: 'cloud-devops' },
    description: 'Master cloud platforms and DevOps practices for modern software deployment and infrastructure management.',
    color: '#8B5CF6',
    order: 3
  },
  
  {
    _type: 'courseCategory',
    name: 'Data Science & Analytics',
    slug: { current: 'data-science-analytics' },
    description: 'Explore data science, machine learning, and analytics tools for data-driven decision making.',
    color: '#F59E0B',
    order: 4
  }
];
