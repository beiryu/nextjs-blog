import { convertToArticleList, filterArticles } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import { useState } from 'react';
import HeroHeader from 'components/layouts/HeroHeader';
import Category from 'components/common/Category';
import Container from 'components/layouts/Container';
import ArticleList from 'components/articles/ArticleList';
import { getAllArticles } from 'services/notion';
import { CONFIGS } from 'config';
import { SegmentWrapper } from 'layouts/SegmentWrapper';

export default function Index({ articles, categories }) {
  const [selectedTagId, setSelectedTagId] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTagId);

  return (
    <Layout>
      <SegmentWrapper>
        <HeroHeader />
      </SegmentWrapper>
      <SegmentWrapper>
        <div className="flex flex-wrap justify-center gap-4 py-6">
          {categories.map(tag => (
            <Category
              tag={tag}
              key={tag.id}
              selectedTagId={selectedTagId}
              setSelectedTagId={setSelectedTagId}
            />
          ))}
        </div>
      </SegmentWrapper>
      <SegmentWrapper>
        <Container>
          <div className="py-8">
            <ArticleList
              articles={filteredArticles}
              setSelectedTagId={setSelectedTagId}
            />
          </div>
        </Container>
      </SegmentWrapper>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllArticles(CONFIGS.blogDatabaseId);

  const { articles, categories } = convertToArticleList(data);

  return {
    props: {
      articles,
      categories
    },
    revalidate: 30
  };
};
