import { Category } from './category.type';

export interface Article {
  id: string;
  title: string;
  publishedDate?: string;
  categories: Category[];
  coverImage: string;
  summary: string;
  popular: boolean;
  claps: number;
}
