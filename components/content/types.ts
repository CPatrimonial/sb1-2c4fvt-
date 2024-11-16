export interface Article {
  id: number;
  title: string;
  description: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

export interface ContentCategory {
  id: string;
  title: string;
  description: string;
  articles: Article[];
}