import { Article } from 'types/article.type';
import Category from 'components/common/Category';
import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';
import { getLocalizedDate } from 'utils/datetime';
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon
} from 'next-share';
import siteData from 'data/site-data';
import { CONFIGS } from 'config';
import ClapButton from 'components/common/ClapButton';
import { CardWithMovingBorder } from 'components/common/MovingBorder';

interface ComponentProps {
  articles: Article[];
  setSelectedTagId?: (tagId: string) => void;
}

export default function ArticlePopular({ articles, setSelectedTagId }: ComponentProps) {
  // Only use the first article
  const article = articles[0];

  if (!article) return null;

  const slug = slugify(article.title).toLowerCase();
  const formattedTime = getLocalizedDate(article?.publishedDate);
  const fullURL = `${CONFIGS.host}/blog/${slug}`;

  // Default author
  const author = {
    name: 'Beiryu',
    role: 'Contributor',
    avatar: siteData.profileUrl
  };

  return (
    <div className="max-w-screen-md mx-auto mb-16">
      <CardWithMovingBorder
        containerClassName="w-full"
        duration={5000}
        borderClassName="bg-[radial-gradient(#9333EA_40%,transparent_60%)]"
      >
        <div className="flex flex-col p-6">
          <time className="text-sm text-text-muted" dateTime={formattedTime}>
            {formattedTime}
          </time>

          <Link href={`/blog/${slug}`} className="z-10">
            <h2 className="text-2xl font-medium text-text-primary line-clamp-2 mt-2">
              {article.title}
            </h2>
          </Link>

          <p className="text-sm text-text-secondary my-4 line-clamp-3">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {article.categories.map(category => (
              <Category
                tag={category}
                key={category.id}
                setSelectedTagId={setSelectedTagId}
              />
            ))}
          </div>

          {/* Author section */}
          <div className="mt-auto pt-4 border-t border-neutral-divider flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-text-primary">{author.name}</p>
                <p className="text-xs text-text-muted">{author.role}</p>
              </div>
            </div>

            <div className="flex items-center justify-between z-10">
              <div className="flex gap-2">
                <TwitterShareButton url={fullURL} title={article.title}>
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
                <LinkedinShareButton url={fullURL}>
                  <LinkedinIcon size={24} round />
                </LinkedinShareButton>
                <FacebookShareButton
                  url={fullURL}
                  quote={article.title}
                  hashtag={`#${siteData.author}`}
                >
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
              </div>
            </div>
            <div className="z-10">
              <ClapButton pageId={article.id} initialClaps={article.claps} />
            </div>
          </div>
        </div>
      </CardWithMovingBorder>
    </div>
  );
}
