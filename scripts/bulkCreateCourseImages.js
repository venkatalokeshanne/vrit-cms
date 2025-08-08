// Usage: node scripts/bulkCreateCourseImages.js
// This script creates courseImages documents for a list of slugs with title=slug and other fields empty.


const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '3hir6j0e', // update if needed
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: "sknNDhupje6H30eueHDFKAz9lVBD3sys8okwmuNeu6OxNL7MCGOmvOTDUnLOvHoEoclRnP6tvPdqOsci2b0jkRF68QO79B0gRuTseQ5Xjon8s3vN2qnj3myf2vQrg4QmZOPpLmqULHDYMhd2332hEIFLqc8DfyIGzc1Bf8IOHhlekO2F6MTp",
  useCdn: false
})

const slugs = [
  'salesforce-training-in-hyderabad',
  'azure-devops-training-in-hyderabad',
  'azure-devops-online-training-in-bangalore',
  'azure-devops-online-training-in-chennai',
  'azure-devops-online-training-in-pune',
  'azure-devops-online-training-in-noida',
  'pega-training-in-hyderabad',
  'devops-training-in-hyderabad',
  'mulesoft-training-in-hyderabad',
  'workday-training-in-hyderabad',
  'snowflake-training-in-hyderabad',
  'machine-learning-with-python-training-in-hyderabad',
  'hadoop-online-training',
  'data-science-training-in-hyderabad',
  'python-online-training',
  'python-with-aws-training',
  'sap-basis-online-training',
  'sap-ewm-online-training',
  'sap-sd-online-training-in-hyderabad',
  'sap-mm-online-training',
  'sap-fico-online-training-in-hyderabad',
  'sas-clinical-online-training-in-hyderabad',
  'sas-clinical-training-in-bangalore',
  'sas-clinical-training-in-chennai',
  'sas-clinical-training-in-pune',
  'sas-clinical-online-training-in-us-uk-canada-australia',
  'sap-hana-admin-training',
  'simple-finance-training-in-hyderabad',
  'sap-leonardo-training-hyderabad',
  'sap-security-training',
  'sap-s4Hana-simple-logistics-training',
  'google-cloud-training',
  'full-stack-developer-training-in-hyderabad',
  'informatica-mdm-training',
  'edi-training'
]

async function createDocs() {
  for (const slug of slugs) {
    const doc = {
      _id: `courseImages.${slug}`,
      _type: 'courseImages',
      title: slug,
      slug: { current: slug },
      ogImage: null,
      twitterImage: null,
      mainImage: null,
      gallery: []
    }
    try {
      const res = await client.createIfNotExists(doc)
      console.log('Created:', res._id)
    } catch (e) {
      console.error('Error creating', slug, e.message)
    }
  }
  console.log('Done!')
}

createDocs()
