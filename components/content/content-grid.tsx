"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContentCategory } from "./types";

interface ContentGridProps {
  categories: ContentCategory[];
  searchQuery: string;
}

export default function ContentGrid({ categories, searchQuery }: ContentGridProps) {
  const filterContent = (categories: ContentCategory[], query: string) => {
    if (!query) return categories;

    return categories.map(category => ({
      ...category,
      articles: category.articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase()) ||
        category.title.toLowerCase().includes(query.toLowerCase())
      ),
    })).filter(category => category.articles.length > 0);
  };

  const filteredCategories = filterContent(categories, searchQuery);

  return (
    <div className="space-y-24">
      {filteredCategories.map((category) => (
        <section key={category.id} className="space-y-12">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{category.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {category.articles.map((article) => (
              <Card key={article.id} className="premium-card group overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{article.readTime} de leitura</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {article.description}
                  </p>
                  <Button
                    variant="link"
                    className="text-blue-900 hover:text-blue-700 p-0 group/btn text-lg"
                    asChild
                  >
                    <Link href={`/conteudo-patrimonial/${article.id}`}>
                      Explorar
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Nenhum conteúdo encontrado
          </h3>
          <p className="text-xl text-gray-600">
            Ajuste sua pesquisa ou explore outras categorias do nosso acervo.
          </p>
        </div>
      )}
    </div>
  );
}