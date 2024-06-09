import slugify from 'slugify';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from 'types/article.type';
import { getLocalizedDate } from 'utils/datetime';
import Category from 'components/common/Category';

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  const slug = slugify(article.title).toLowerCase();
  const formattedTime = getLocalizedDate(article?.publishedDate);

  return (
    <Link href={`/blog/${slug}`}>
      <div className="flex flex-col md:flex-row overflow-hidden cursor-pointer group gap-5 py-6">
        <div className="hidden md:block filter contrast-[0.9] h-28 w-48">
          <Image
            className="object-cover w-full transition rounded-lg aspect-video group-hover:opacity-90 bg-gray-50"
            src={article.coverImage}
            alt={'article cover'}
            width={2000}
            height={2000}
          />
        </div>
        <div className="flex flex-col justify-between flex-1 bg-white">
          <div className="flex-1">
            <p className="text-xl font-semibold text-gray-900">
              <span className="text-underline-rising">{article.title}</span>
            </p>
            <p className="mt-3 text-sm text-gray-500 line-clamp-2">{article.summary}</p>
          </div>
          <div className="flex items-center mt-4 gap-4">
            <time className="text-xs text-gray-400" dateTime={formattedTime}>
              {formattedTime}
            </time>
            <span aria-hidden="true">&middot;</span>
            {article.categories.map(category => (
              <Category tag={category} key={category.id} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
