import slugify from 'slugify';
import Link from 'next/link';
import { Article } from 'types/article.type';
import { getLocalizedDate } from 'utils/datetime';
import Category from 'components/common/Category';
import FallbackImage from 'components/common/FallbackImage';
import ClapButton from 'components/common/ClapButton';

interface Props {
  article: Article;
  setSelectedTagId: (tagId: string) => void;
}

export default function ArticleCard({ article, setSelectedTagId }: Props) {
  const slug = slugify(article.title).toLowerCase();
  const formattedTime = getLocalizedDate(article?.publishedDate);

  return (
    <Link href={`/blog/${slug}`}>
      <div className="flex flex-col md:flex-row cursor-pointer group gap-5 py-6 px-3 hover:bg-orange-50 hover:delay-100 rounded-md">
        <div className="hidden md:block filter contrast-[0.9] h-28 w-36">
          <FallbackImage
            src={article.coverImage}
            alt={article.title}
            width={2000}
            height={2000}
          />
        </div>
        <div className="flex flex-col justify-between flex-1 bg-inherit">
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
            <ClapButton pageId={article.id} initialClaps={article.claps} />
            <span aria-hidden="true">&middot;</span>
            <div className="flex flex-wrap gap-2">
              {article.categories.map(category => (
                <Category
                  tag={category}
                  key={category.id}
                  setSelectedTagId={setSelectedTagId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
