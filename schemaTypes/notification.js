// schemaTypes/notification.js

export default {
  name: 'notification',
  title: 'Course Notification',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'User Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'type',
      title: 'Notification Type',
      type: 'string',
      options: {
        list: [
          { title: 'Enrolled', value: 'joined' },
          { title: 'Placed', value: 'placed' }
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'courseMetadata' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'message',
      title: 'Placement Message',
      type: 'text',
      description: 'Custom message for placement notifications (optional)',
      rows: 3,
      hidden: ({ document }) => document?.type !== 'placed',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      course: 'course.title',
      location: 'location'
    },
    prepare(selection) {
      const { title, subtitle, course, location } = selection;
      return {
        title: `${title} (${location})`,
        subtitle: `${subtitle === 'joined' ? 'Enrolled in' : 'Placed from'} ${course || 'Unknown Course'}`
      }
    }
  }
};
