import { Article } from 'types/article.type';
import ArticleCard from './ArticleCard';

type Props = {
  articles: Article[];
};

export default function ArticleList({ articles }: Props) {
  return (
    <div className="gap-10 lg:gap-12">
      {articles.map(article => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
}
