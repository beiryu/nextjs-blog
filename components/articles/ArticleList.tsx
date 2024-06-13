import { Article } from 'types/article.type';
import ArticleCard from './ArticleCard';

type Props = {
  articles: Article[];
  setSelectedTagId?: (tagId: string) => void;
};

export default function ArticleList({ articles, setSelectedTagId }: Props) {
  return (
    <div className="gap-10 lg:gap-12">
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
