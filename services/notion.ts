import {
  ListBlockChildrenParameters,
  ListBlockChildrenResponse
} from '@notionhq/client/build/src/api-endpoints';
import { CONFIGS } from 'config';
import notion from 'services';
import { Comment } from 'types/comment.type';
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
          rich_text: {
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

export const updateArticleClaps = async (pageId: string, newClaps: number) => {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        claps: {
          number: newClaps
        }
      }
    });

    return newClaps;
  } catch (error) {
    console.error('Error updating claps:', error);
    throw new Error('Failed to update claps');
  }
};

export const addComment = async (pageId: string, comment: Omit<Comment, 'id'>) => {
  try {
    await notion.pages.create({
      parent: {
        database_id: CONFIGS.commentsDatabaseId!
      },
      properties: {
        content: {
          rich_text: [
            {
              text: {
                content: comment.content
              }
            }
          ]
        },
        author: {
          rich_text: [
            {
              text: {
                content: comment.author
              }
            }
          ]
        },
        articleId: {
          rich_text: [
            {
              text: {
                content: pageId
              }
            }
          ]
        },
        createdAt: {
          date: {
            start: new Date().toISOString()
          }
        }
      }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
};

export const getComments = async (pageId: string): Promise<Comment[]> => {
  try {
    const response = await notion.databases.query({
      database_id: CONFIGS.commentsDatabaseId!,
      filter: {
        property: 'articleId',
        rich_text: {
          equals: pageId
        }
      },
      sorts: [
        {
          property: 'createdAt',
          direction: 'descending'
        }
      ]
    });

    return response.results.map((comment: any) => ({
      id: comment.id,
      content: comment.properties.content.rich_text[0].text.content,
      author: comment.properties.author.rich_text[0].text.content,
      createdAt: comment.properties.createdAt.date.start,
      articleId: comment.properties.articleId.rich_text[0].text.content
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to fetch comments');
  }
};
