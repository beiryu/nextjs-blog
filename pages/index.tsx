import { convertToArticleList, getAllArticles } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import { useState } from 'react';
import { filterArticles } from 'utils/filterArticles';
import HeroHeader from 'components/layouts/HeroHeader';
import Category from 'components/common/Category';
import Container from 'components/layouts/Container';
import ArticleList from 'components/articles/ArticleList';

export default function Index({ articles, categories }) {
  const [selectedTag, setSelectedTag] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTag);

  return (
    <Layout>
      <HeroHeader />
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {categories.map(tag => (
          <Category
            tag={tag}
            key={tag}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        ))}
      </div>
      <Container>
        <div className="py-8">
          <div className="my-8 text-3xl font-bold text-gray-900">
            {!selectedTag ? 'Latest articles' : `${selectedTag} articles`}
          </div>
          <ArticleList articles={filteredArticles} />
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const { articles, categories } = convertToArticleList(data);

  return {
    props: {
      articles,
      categories
    },
    revalidate: 30
  };
};
