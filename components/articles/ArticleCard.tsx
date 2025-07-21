import slugify from 'slugify';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from 'types/article.type';
import { getLocalizedDate } from 'utils/datetime';
import Category from 'components/common/Category';
import FallbackImage from 'components/common/FallbackImage';
import ClapButton from 'components/common/ClapButton';
import siteData from 'data/site-data';

interface Props {
  article: Article;
  setSelectedTagId: (tagId: string) => void;
}

export default function ArticleCard({ article, setSelectedTagId }: Props) {
  const slug = slugify(article.title).toLowerCase();
  const formattedTime = getLocalizedDate(article?.publishedDate);

  const author = {
    name: "Beiryu",
    role: "Contributor",
    avatar: siteData.profileUrl
  };

  return (
    <>
      <div className="flex flex-col h-full bg-white border border-neutral-border rounded-md hover:shadow-md transition-all duration-200 overflow-hidden">
        <Link href={`/blog/${slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <FallbackImage
            src={article.coverImage}
            alt={article.title}
            width={2000}
            height={2000}
            className="object-cover w-full h-full"
          />
        </div>
        </Link>
        <div className="flex flex-col flex-1 p-4">
          <time className="text-xs text-text-muted" dateTime={formattedTime}>
            {formattedTime}
          </time>
          <Link href={`/blog/${slug}`}>
          <h3 className="text-2xl font-medium text-text-primary line-clamp-2">
            {article.title}
          </h3>
          </Link>
          
          {/* Description */}
          <p className="text-sm text-text-secondary mb-4 line-clamp-3">
            {article.summary}
          </p>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.categories.slice(0, 3).map(category => (
              <Category
                tag={category}
                key={category.id}
                setSelectedTagId={setSelectedTagId}
              />
            ))}
          </div>
          
          {/* Author Section */}
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
            
            <ClapButton pageId={article.id} initialClaps={article.claps} />
          </div>
        </div>
      </div>
    </>
  );
}
