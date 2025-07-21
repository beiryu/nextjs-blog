import { Fragment } from 'react';
import Link from 'next/link';
import { getArticlePage, getArticlePageData } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import Image from 'next/image';
import { renderBlocks } from 'components/notion/blocks/renderBlocks';
import slugify from 'slugify';
import Container from 'components/layouts/Container';
import ArticleList from 'components/articles/ArticleList';
import { getAllArticles } from 'services/notion';
import { CONFIGS } from 'config';
import { getLocalizedDate } from 'utils/datetime';
import { SegmentWrapper } from 'layouts/SegmentWrapper';
import FallbackImage from 'components/common/FallbackImage';
import ClapButton from 'components/common/ClapButton';
import CommentSection from 'components/comments/CommentSection';

const ArticlePage = ({
  id,
  content,
  title,
  coverImage,
  publishedDate,
  summary,
  moreArticles,
  claps
}) => {
  const publishedOn = getLocalizedDate(publishedDate);

  const slug = slugify(title).toLowerCase();

  // const ogImage = `https://www.phung.io/api/og-image?title=${encodeURIComponent(
  //   title
  // )}&date=${encodeURIComponent(publishedOn)}`;

  const ogImage = coverImage;

  return (
    <>
      <Layout
        title={title}
        description={summary}
        imageUrl={ogImage}
        date={publishedDate ? new Date(publishedDate).toISOString() : ''}
        ogUrl={`/blog/${slug}`}
      >
        <div className="static pt-40 md:pt-56">
          <SegmentWrapper>
            <div className="pt-10 max-w-5xl px-6 mx-auto my-10 md:px-8 absolute top-10 inset-x-0">
              <FallbackImage
                className="w-2/3 mx-auto object-cover shadow-lg rounded-lg"
                src={coverImage}
                alt={title}
                width={2000}
                height={2000}
              />
            </div>
            <div className="px-6 pt-24 sm:pt-40 md:pt-52 pb-48 mx-auto -mb-48 text-center md:pb-96 md:-mb-96">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-4 space-x-2 text-sm text-gray-500">
                  <div className="">{publishedOn}</div>
                </div>
                <div className="font-extrabold tracking-wide leading-8 text-gray-900 text-w-4xl sm:text-4xl">
                  {title}
                </div>
                <div className="max-w-3xl mx-auto mt-3 text-lg font-extralight leading-8 text-gray-500 sm:mt-4">
                  {summary}
                </div>
              </div>
            </div>

            <div className="max-w-screen-xl px-6 my-10 mx-auto space-y-8 md:px-8 border bg-white rounded-lg">
              {content.map(block => (
                <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
              ))}
            </div>
          </SegmentWrapper>
          <SegmentWrapper>
            <CommentSection articleId={id} />
          </SegmentWrapper>
          <SegmentWrapper>
            <div className="py-12">
              <Container>
                <div className="max-w-screen-xl mx-auto">
                  <div className="flex items-center justify-between mb-16">
                    <h2 className="text-3xl font-medium text-gray-900 !m-0">
                      Recommended articles
                    </h2>
                    <Link href="/">
                      <span className="font-light text-gray-900 cursor-pointer">
                        More articles ➜
                      </span>
                    </Link>
                  </div>
                </div>
                <Container>
                  <ArticleList articles={moreArticles} />
                </Container>
              </Container>
            </div>
          </SegmentWrapper>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(CONFIGS.blogDatabaseId);

  data.forEach(result => {
    if (result.object === 'page') {
      paths.push({
        params: {
          slug: slugify(result.properties.title.title[0].plain_text).toLowerCase()
        }
      });
    }
  });

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const data = await getAllArticles(CONFIGS.blogDatabaseId);
  const page = getArticlePage(data, slug);
  const result = await getArticlePageData(page, slug, CONFIGS.blogDatabaseId);

  return {
    props: result,
    revalidate: 3600
  };
};

export default ArticlePage;
