import { Article } from 'types/article.type';
import Category from 'components/common/Category';
import Link from 'next/link';
import slugify from 'slugify';
import { getLocalizedDate } from 'utils/datetime';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
} from 'next-share';
import siteData from 'data/site-data';
import { CONFIGS } from 'config';
import FallbackImage from 'components/chat/FallbackImage';

interface ComponentProps {
  articles: Article[];
  setSelectedTagId?: (tagId: string) => void;
}

export default function ArticlePopular({ articles, setSelectedTagId }: ComponentProps) {
  return (
    <div className="gap-10 grid grid-cols-1 md:grid-cols-3">
      {articles.map(article => {
        const slug = slugify(article.title).toLowerCase();
        const formattedTime = getLocalizedDate(article?.publishedDate);
        const fullURL = `${CONFIGS.host}/blog/${slug}`;

        return (
          <Link
            href={`/blog/${slug}`}
            key={article.id}
            className="p-4 flex flex-col bg-white hover:bg-orange-50 rounded-xl shadow-xl"
          >
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900">
                <span className="text-underline-rising">{article.title}</span>
              </p>
              <time className="text-xs text-gray-400" dateTime={formattedTime}>
                {formattedTime}
              </time>
            </div>
            <div className="my-5 space-y-2 flex flex-col items-center">
              {article.categories.map(category => (
                <Category
                  tag={category}
                  key={category.id}
                  setSelectedTagId={setSelectedTagId}
                />
              ))}
            </div>
            <div className="filter contrast-[0.9] lg:pt-2">
              <FallbackImage
                className="mx-auto scale-100 md:scale-110 xl:scale-100 hover:scale-110 md:hover:scale-125 xl:hover:scale-110 shadow-md shadow-black object-cover w-full transition rounded-sm aspect-video group-hover:opacity-90 bg-gray-50"
                src={article.coverImage}
                alt={article.title}
                width={2000}
                height={2000}
              />
            </div>
            <div className="p-4">
              <p className="mt-3 text-sm text-gray-500 line-clamp-6">{article.summary}</p>
            </div>
            <div className="flex flex-row justify-center gap-2">
              <TwitterShareButton url={fullURL} title={article.title}>
                <TwitterIcon size={20} round />
              </TwitterShareButton>
              <LinkedinShareButton url={fullURL}>
                <LinkedinIcon size={20} round />
              </LinkedinShareButton>
              <FacebookShareButton
                url={fullURL}
                quote={article.title}
                hashtag={`#${siteData.author}`}
              >
                <FacebookIcon size={20} round />
              </FacebookShareButton>
              <FacebookMessengerShareButton url={fullURL} appId="">
                <FacebookMessengerIcon size={20} round />
              </FacebookMessengerShareButton>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
