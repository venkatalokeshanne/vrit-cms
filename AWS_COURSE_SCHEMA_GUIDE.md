# AWS Course Schema Documentation

## Overview

The AWS Course schema (`awsCourse`) is a comprehensive content management structure designed for AWS training courses. It provides a complete solution for managing course content, SEO optimization, and enrollment information.

## Schema Features

### ✅ Core Features
- **Structured Content Management**: Organized modules, projects, and prerequisites
- **SEO Optimization**: Complete meta tags, Open Graph, and Twitter Card support  
- **Flexible Content Sections**: Custom sections for different course types
- **Project-Based Learning**: Hands-on project definitions with technologies
- **Prerequisites Management**: Both knowledge and technical requirements
- **FAQ Support**: Built-in FAQ section for common questions
- **Enrollment Integration**: Pricing, CTA, and enrollment button configuration
- **Publication Workflow**: Draft/Published/Archived status management
- **Tagging System**: Course categorization and filtering
- **Certification Tracking**: Links to AWS certifications and course certificates

### 🎨 Content Structure

#### 1. Basic Information
```javascript
{
  title: "AWS Cloud Fundamentals",
  subtitle: "Master the foundational concepts...",
  slug: { current: "aws-cloud-fundamentals" },
  badge: { text: "Most Popular Course", color: "blue" }
}
```

#### 2. Course Overview
```javascript
{
  overview: {
    description: ["Paragraph 1", "Paragraph 2"],
    achievements: [
      { icon: "🎯", text: "Build and deploy applications on AWS" }
    ],
    duration: "8 weeks",
    level: "beginner"
  }
}
```

#### 3. Curriculum Structure
```javascript
{
  curriculum: [
    {
      moduleNumber: 1,
      title: "Cloud Computing Basics",
      description: "Foundation knowledge...",
      topics: ["Topic 1", "Topic 2"],
      duration: "1 week"
    }
  ]
}
```

#### 4. Hands-on Projects
```javascript
{
  projects: [
    {
      title: "Web Application Hosting",
      description: "Deploy a scalable web application...",
      keyFeatures: ["Multi-tier architecture", "Load balancing"],
      technologies: ["EC2", "RDS", "ELB"]
    }
  ]
}
```

## Implementation Guide

### Step 1: Add to Sanity Studio

1. The schema is already added to `schemaTypes/awsCourse.js`
2. Updated in `schemaTypes/index.js`
3. Deploy to Sanity Studio: `npm run build` in your Sanity project

### Step 2: Create Course Content

1. Open Sanity Studio
2. Create new "AWS Course" document
3. Fill in all required fields:
   - Title and subtitle
   - Course overview
   - Curriculum modules
   - Projects (optional)
   - Prerequisites
   - SEO settings
4. Set status to "published"

### Step 3: Query from Next.js

Use the provided query utilities:

```javascript
import { client } from '@/lib/sanity/client'
import { awsCourseBySlugQuery } from '@/lib/sanity/queries/awsCourses'
import { structureAwsCourseData } from '@/utils/courseStructure'

// Fetch course data
const courseData = await client.fetch(awsCourseBySlugQuery, { 
  slug: 'aws-cloud-fundamentals' 
})

// Structure for components
const structuredCourse = structureAwsCourseData(courseData)
```

### Step 4: Update Existing Course Pages

Replace hardcoded content in your course pages:

```javascript
// Before: Hardcoded content
const modules = [
  { title: "Module 1", topics: [...] }
]

// After: Dynamic content from Sanity
const modules = structuredCourse.curriculum
```

## SEO Benefits

### 🔍 Search Engine Optimization
- **Meta Tags**: Automatic generation from course data
- **Structured Data**: JSON-LD schema for rich snippets
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Semantic URLs**: SEO-friendly slug generation

### 📊 Analytics Integration
- **Content Performance**: Track which modules are popular
- **Conversion Tracking**: Monitor enrollment from different courses
- **User Engagement**: See which sections users spend time on

## Content Management Benefits

### ✏️ Easy Content Updates
- **No Code Changes**: Update course content without developer involvement
- **Version Control**: Track content changes over time
- **Preview Mode**: Review changes before publishing
- **Bulk Operations**: Update multiple courses simultaneously

### 🎯 Content Consistency
- **Structured Format**: Consistent presentation across all courses
- **Template-Based**: New courses follow the same proven structure
- **Quality Control**: Required fields ensure complete course information

## Migration Strategy

### From Hardcoded to CMS

1. **Phase 1**: Create schema and sample data (✅ Complete)
2. **Phase 2**: Add AWS Cloud Fundamentals course to Sanity
3. **Phase 3**: Update course page to fetch from Sanity
4. **Phase 4**: Add more AWS courses
5. **Phase 5**: Create course listing page

### Example Migration for AWS Cloud Fundamentals

```javascript
// Replace the existing page.js content with:
import { client } from '@/lib/sanity/client'
import { awsCourseBySlugQuery } from '@/lib/sanity/queries/awsCourses'
import { structureAwsCourseData } from '@/utils/courseStructure'
import AWSCourseComponent from '@/components/AWSCourseComponent'

export default async function AWSCloudFundamentalsPage() {
  const courseData = await client.fetch(awsCourseBySlugQuery, { 
    slug: 'aws-cloud-fundamentals' 
  })
  
  const course = structureAwsCourseData(courseData)
  
  return <AWSCourseComponent course={course} />
}
```

## Advanced Features

### 🔧 Custom Sections
Add flexible content sections for unique course requirements:

```javascript
{
  additionalSections: [
    {
      title: "Who Should Attend",
      displayType: "list",
      listItems: ["Developers", "System Administrators", "DevOps Engineers"]
    }
  ]
}
```

### 🏷️ Dynamic Filtering
Use tags for course categorization:

```javascript
{
  tags: ["AWS", "Cloud Computing", "DevOps", "Certification", "Beginner Friendly"]
}
```

### 💰 Pricing Management
Handle pricing and promotions:

```javascript
{
  enrollment: {
    price: 499,
    discountPrice: 399,
    ctaTitle: "Limited Time Offer",
    ctaDescription: "Save $100 this month!"
  }
}
```

## Best Practices

### Content Guidelines
1. **Module Titles**: Clear, descriptive names (max 50 characters)
2. **Descriptions**: 2-3 sentences explaining the module value
3. **Topics**: 3-7 specific topics per module
4. **Projects**: Include real-world applications
5. **Prerequisites**: Be specific about required knowledge

### SEO Guidelines
1. **Title Tags**: Include main keyword + brand (under 60 chars)
2. **Meta Descriptions**: Compelling description with CTA (under 160 chars)
3. **Keywords**: 5-10 relevant keywords, comma-separated
4. **Images**: High-quality course thumbnails for social sharing

### Performance Guidelines
1. **Image Optimization**: Use Sanity's built-in image optimization
2. **Content Caching**: Implement proper caching strategies
3. **Lazy Loading**: Load course modules progressively

## Troubleshooting

### Common Issues

1. **Missing Course Data**
   - Check if course status is "published"
   - Verify slug matches the URL parameter
   - Ensure Sanity client is properly configured

2. **SEO Tags Not Showing**
   - Verify seo object is filled in Sanity
   - Check if meta tags are properly rendered in component
   - Use browser dev tools to inspect head elements

3. **Content Not Updating**
   - Clear Next.js cache: `npm run build`
   - Check Sanity webhook configuration
   - Verify ISR (Incremental Static Regeneration) settings

### Support Resources

- **Sanity Documentation**: https://www.sanity.io/docs
- **Next.js ISR Guide**: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
- **Schema Validation**: Use the `validateCourseData` utility function

---

## Sample Course Creation Checklist

When creating a new AWS course in Sanity Studio:

- [ ] **Basic Info**: Title, subtitle, slug
- [ ] **Badge**: If featured/popular course
- [ ] **Overview**: Description paragraphs + achievements
- [ ] **Curriculum**: 6-10 modules with topics
- [ ] **Projects**: 2-4 hands-on projects
- [ ] **Prerequisites**: Knowledge + technical requirements  
- [ ] **SEO**: All meta tags, descriptions, and images
- [ ] **Enrollment**: Pricing and CTA content
- [ ] **Status**: Set to "published"
- [ ] **Tags**: Relevant course categories
- [ ] **Test**: Verify page loads correctly

This schema provides a robust foundation for managing AWS course content while maintaining flexibility for future enhancements.
