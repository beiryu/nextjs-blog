import { Fragment } from 'react';
import Link from 'next/link';
import { getArticlePage, getArticlePageData } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import Image from 'next/image';
import { renderBlocks } from 'components/notion/blocks/renderBlocks';
import slugify from 'slugify';
import siteData from 'data/siteData';
import Container from 'components/layouts/Container';
import ArticleList from 'components/articles/ArticleList';
import { getAllArticles } from 'services/notion';
import { CONFIGS } from 'config';
import { getLocalizedDate } from 'utils/datetime';
import { SegmentWrapper } from 'layouts/SegmentWrapper';

const ArticlePage = ({
  content,
  title,
  coverImage,
  publishedDate,
  summary,
  moreArticles
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
        <div className="static pt-20 md:pt-40">
          <SegmentWrapper>
            <div className="max-w-5xl px-6 mx-auto my-10 md:px-8 absolute top-10 inset-x-0">
              <Image
                className="object-cover w-2/3 mx-auto rounded-xl aspect-video shadow-lg shadow-black"
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

            <div className="max-w-4xl px-6 py-10 mx-auto mb-24 space-y-8 md:px-8">
              {content.map(block => (
                <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
              ))}
            </div>
          </SegmentWrapper>
          <SegmentWrapper>
            <div className="py-12 border-t">
              <Container>
                <div className="flex items-center justify-between my-8">
                  <div className="text-3xl font-bold text-gray-900">
                    Recommended articles
                  </div>
                  <Link href="/">
                    <span className="font-semibold text-gray-900 cursor-pointer">
                      More articles ➜
                    </span>
                  </Link>
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
    revalidate: 30
  };
};

export default ArticlePage;
