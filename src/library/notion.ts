import { Client } from '@notionhq/client';
const notion = new Client({
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

const pageContents = await notion.blocks.children.list({ block_id: "a27d1649-034a-4252-b274-bfaa199e22ca"})
console.dir(pageContents, {depth: null});