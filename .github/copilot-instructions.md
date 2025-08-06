# Copilot Instructions for VR IT Solutions CMS

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a standalone Sanity CMS project for managing course metadata and content for VR IT Solutions. The project provides API endpoints for integration with Next.js applications and other frontend frameworks.

## Key Features
- **Course Management**: Complete course metadata management including pricing, syllabus, instructors, and SEO
- **Instructor Profiles**: Dedicated schema for instructor information and expertise
- **Course Categories**: Organized categorization system for courses
- **Student Testimonials**: Review and rating system for courses
- **API Integration**: RESTful and GraphQL APIs for frontend integration

## Schema Architecture
- `courseMetadata`: Main course schema with comprehensive fields for SEO, pricing, content
- `instructor`: Instructor profiles with experience and certifications
- `courseCategory`: Course categorization and organization
- `testimonial`: Student reviews and ratings

## API Usage
The project exposes APIs at:
- REST API: `https://[project-id].api.sanity.io/v2024-01-01/data/query/[dataset]`
- GraphQL: `https://[project-id].api.sanity.io/v1/graphql/[dataset]/default`

## SEO Considerations
- All schemas include comprehensive SEO fields
- Structured data support for rich snippets
- Meta tags and Open Graph support
- Canonical URL management

## Development Guidelines
- Use semantic field names and proper validation
- Include preview configurations for better Studio experience
- Follow Sanity best practices for schema design
- Maintain consistent naming conventions
