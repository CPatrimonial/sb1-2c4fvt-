"use client";

import { ContentCategory } from "./types";
import { ArticleCard } from "./article-card";

interface CategorySectionProps {
  category: ContentCategory;
}

export function CategorySection({ category }: CategorySectionProps) {
  return (
    <section className="space-y-12">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">{category.title}</h2>
        <p className="text-xl text-slate-600 leading-relaxed">{category.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {category.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}