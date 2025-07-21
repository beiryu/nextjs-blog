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
import { Article } from 'types/article.type';
import ArticlePopular from 'components/articles/ArticlePopular';

export default function Index({ popularArticles, normalArticles, categories }) {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const filteredArticles = filterArticles(normalArticles, selectedTagId);

  return (
    <Layout>
      {/* Hero Section */}
      <HeroHeader />

      {/* Featured Article Section */}
      <section className="">
        <Container>
          {popularArticles.length > 0 && (
            <ArticlePopular
              articles={popularArticles}
              setSelectedTagId={setSelectedTagId}
            />
          )}
        </Container>
      </section>

      {/* Category Filters */}
      <section className="">
        <SegmentWrapper>
          <Container>
            <div className="flex flex-wrap justify-center gap-4 py-8">
              {categories.map(tag => (
                <Category
                  tag={tag}
                  key={tag.id}
                  selectedTagId={selectedTagId}
                  setSelectedTagId={setSelectedTagId}
                />
              ))}
            </div>
          </Container>
        </SegmentWrapper>
      </section>

      {/* Main Content Grid */}
      <section className="py-16">
        <SegmentWrapper>
          <Container>
            <ArticleList
              articles={filteredArticles}
              setSelectedTagId={setSelectedTagId}
            />
          </Container>
        </SegmentWrapper>
      </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllArticles(CONFIGS.blogDatabaseId);

  const { articles, categories } = convertToArticleList(data);
  const { normalArticles, popularArticles } = articles.reduce(
    (acc, article: Article) => {
      if (article.popular) {
        acc.popularArticles.push(article);
      } else {
        acc.normalArticles.push(article);
      }
      return acc;
    },
    { normalArticles: [], popularArticles: [] }
  );

  return {
    props: {
      popularArticles,
      normalArticles,
      categories
    },
    revalidate: 30
  };
};
