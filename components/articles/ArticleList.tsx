import { Article } from 'types/article.type';
import ArticleCard from './ArticleCard';

type Props = {
  articles: Article[];
  setSelectedTagId?: (tagId: string) => void;
};

export default function ArticleList({ articles, setSelectedTagId }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
      {articles.map(article => (
        <ArticleCard
          article={article}
          key={article.id}
          setSelectedTagId={setSelectedTagId}
        />
      ))}
    </div>
  );
}
