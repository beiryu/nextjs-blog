import { Category } from './category.type';

export type Article = {
  id: string;
  title: string;
  publishedDate?: string;
  categories: Category[];
  coverImage: string;
  summary: string;
  popular: boolean;
};
