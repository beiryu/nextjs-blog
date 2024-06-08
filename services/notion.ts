import {
  ListBlockChildrenParameters,
  ListBlockChildrenResponse
} from '@notionhq/client/build/src/api-endpoints';
import notion from 'services';
import { shuffleArray } from 'utils/array';
import { mapArticleProperties } from 'utils/notion';

export const getAllArticles = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'status',
          select: {
            equals: '✅ Published'
          }
        }
      ]
    },
    sorts: [
      {
        property: 'published',
        direction: 'descending'
      }
    ]
  });

  return response.results;
};

export const getMoreArticlesToSuggest = async (databaseId, currentArticleTitle) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: '✅ Published'
          }
        },
        {
          property: 'title',
          text: {
            does_not_equal: currentArticleTitle
          }
        }
      ]
    }
  });

  const moreArticles = response.results.map((article: any) =>
    mapArticleProperties(article)
  );

  return shuffleArray(moreArticles).slice(0, 2);
};

export const getBlocks = async (
  pageId: string,
  startCursor?: string
): Promise<ListBlockChildrenResponse> => {
  let queryBuilder: ListBlockChildrenParameters = {
    block_id: pageId
  };

  if (startCursor) {
    queryBuilder = { ...queryBuilder, start_cursor: startCursor };
  }
  const blocks = await notion.blocks.children.list(queryBuilder);

  return blocks;
};
