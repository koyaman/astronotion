import { Client } from '@notionhq/client';
export const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY
});

export const getNotion = await notion.databases.query({
  database_id: import.meta.env.NOTION_DB_ID || '',
  filter: {
    or: [
      {
        property: 'published',
        checkbox: {
          equals: true,
        },
      },
    ]
  },
  sorts: [
    {
      property: 'date',
      direction: 'descending',
    },
  ]
});
