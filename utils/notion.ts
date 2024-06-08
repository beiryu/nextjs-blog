import { getBlocks, getMoreArticlesToSuggest } from 'services/notion';
import slugify from 'slugify';
import { Article } from 'types/article.type';

export const mapArticleProperties = (article: any): Article => {
  const { id, properties } = article;

  return {
    id: id,
    title: properties?.title.title[0].plain_text || '',
    categories:
      properties?.categories?.multi_select.map((category: any) => category.name) || [],
    coverImage:
      properties?.coverImage?.files[0]?.file?.url ||
      properties?.coverImage?.files[0]?.external?.url ||
      '/image-background.png',
    publishedDate: properties.published?.date?.start ?? '',
    summary: properties?.summary.rich_text[0]?.plain_text ?? ''
  };
};

export const convertToArticleList = (tableData: any) => {
  let categories: string[] = [];

  const articles = tableData.map((article: any) => {
    const { properties } = article;

    properties?.categories?.multi_select?.forEach((category: any) => {
      const { name } = category;
      if (!categories.includes(name) && name) {
        categories.push(name);
      }
    });

    return mapArticleProperties(article);
  });

  return { articles, categories };
};

export const getArticlePage = (data, slug) => {
  const response = data.find(result => {
    if (result.object === 'page') {
      const resultSlug = slugify(
        result.properties.title.title[0].plain_text
      ).toLowerCase();
      return resultSlug === slug;
    }
    return false;
  });

  return response;
};

export const getArticlePageData = async (page: any, slug: any, databaseId) => {
  let content = [];
  let title = '';

  title = page?.properties.title.title[0].plain_text;

  const moreArticles: any = await getMoreArticlesToSuggest(databaseId, title);

  let blocks = await getBlocks(page.id);

  content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await getBlocks(page.id, blocks.next_cursor);
    content = [...content, ...blocks.results];
  }

  await Promise.all(
    content.map(async block => {
      await getContentRecursion(block);
      return block;
    })
  );

  return {
    ...mapArticleProperties(page),
    content,
    slug,
    moreArticles
  };
};

export const getContentRecursion = async block => {
  if (block.has_children) {
    let res = await getBlocks(block.id);
    block.children = res.results;
    let promises = block.children.map(getContentRecursion);
    await Promise.all(promises);
  }
};

export const filterArticles = (articles, selectedTag): Article[] => {
  return articles
    .filter(article => article.publishedDate)
    .sort((a, b) => Number(new Date(b.publishedDate)))
    .filter(article => {
      if (selectedTag === null) {
        return true;
      }
      return article.categories.includes(selectedTag);
    });
};
