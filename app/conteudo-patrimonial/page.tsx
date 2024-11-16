"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CategorySection } from "@/components/content/category-section";
import { ContentCategory } from "@/components/content/types";

export default function ConteudoPatrimonialPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories: ContentCategory[] = [
    {
      id: "gestao-estrategica",
      title: "Gestão Estratégica",
      description: "Estratégias avançadas para otimização e estruturação patrimonial",
      articles: [
        {
          id: 1,
          title: "A Arte da Negociação Estruturada",
          description: "Técnicas avançadas de negociação utilizando seu patrimônio como garantia estratégica",
          readTime: "8 min",
          category: "Gestão Estratégica",
          imageUrl: "https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3",
        },
        {
          id: 2,
          title: "Reestruturação Patrimonial",
          description: "Análise profunda dos processos de reestruturação para maximização de resultados",
          readTime: "12 min",
          category: "Gestão Estratégica",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
        },
      ],
    },
    {
      id: "projetos-estrategicos",
      title: "Projetos Estratégicos",
      description: "Metodologias exclusivas para transformar visões em realidade através de estruturação inteligente",
      articles: [
        {
          id: 3,
          title: "Análise de Viabilidade",
          description: "Metodologia proprietária para avaliação precisa da viabilidade de projetos de alto impacto",
          readTime: "10 min",
          category: "Projetos",
          imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3",
        },
        {
          id: 4,
          title: "Estruturação de Garantias",
          description: "Guia especializado sobre estruturação de garantias para projetos sofisticados",
          readTime: "15 min",
          category: "Projetos",
          imageUrl: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?ixlib=rb-4.0.3",
        },
      ],
    },
    {
      id: "analise-avancada",
      title: "Análise Avançada",
      description: "Insights estratégicos e ferramentas sofisticadas para otimização patrimonial",
      articles: [
        {
          id: 5,
          title: "Modelagem de Cenários",
          description: "Técnicas avançadas de análise e projeção para tomada de decisão estratégica",
          readTime: "20 min",
          category: "Análise",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
        },
        {
          id: 6,
          title: "Estratégias de Preservação",
          description: "Abordagens sofisticadas para proteção e crescimento sustentável do patrimônio",
          readTime: "18 min",
          category: "Análise",
          imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3",
        },
      ],
    },
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.articles.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Centro de Conhecimento
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            Explore nossa biblioteca de conteúdo especializado sobre gestão patrimonial e estratégias financeiras avançadas
          </p>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <Input
              type="text"
              placeholder="Pesquisar conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
        </div>

        <div className="space-y-24">
          {filteredCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Nenhum conteúdo encontrado
              </h3>
              <p className="text-xl text-slate-600">
                Ajuste sua pesquisa ou explore outras categorias do nosso acervo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}