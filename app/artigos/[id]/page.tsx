"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // Generate params for articles 1-6 (matching our content)
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}

export default function ArticlePage() {
  const params = useParams();
  const id = params.id;

  // This would typically come from an API or database
  const article = {
    id,
    title: "Estratégias Avançadas de Gestão Patrimonial",
    description: "Um guia completo sobre as melhores práticas para gestão e crescimento do seu patrimônio.",
    content: `
      <h2>Introdução à Gestão Patrimonial</h2>
      <p>A gestão patrimonial eficiente requer uma compreensão profunda dos mercados financeiros e uma estratégia bem definida. Este artigo explora as principais abordagens para maximizar o potencial do seu patrimônio.</p>

      <h2>Diversificação Estratégica</h2>
      <p>A diversificação é um dos pilares fundamentais da gestão patrimonial bem-sucedida. Vamos explorar diferentes classes de ativos e como elas podem trabalhar em conjunto para otimizar seus resultados.</p>

      <h2>Gestão de Riscos</h2>
      <p>Entender e gerenciar riscos é essencial para preservar e fazer crescer seu patrimônio. Apresentamos estratégias comprovadas para mitigação de riscos e proteção patrimonial.</p>

      <h2>Planejamento Sucessório</h2>
      <p>O planejamento sucessório é um aspecto crucial da gestão patrimonial que muitas vezes é negligenciado. Saiba como estruturar seu patrimônio pensando no longo prazo.</p>
    `,
    author: "Equipe Editorial",
    date: "15 de Março de 2024",
    readTime: "12 min",
    imageUrl: "https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <div className="mb-8">
          <Link 
            href="/conteudo-patrimonial"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para artigos
          </Link>
        </div>

        <article className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-sm text-slate-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>{article.readTime} de leitura</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-500 hover:text-slate-900"
                onClick={() => navigator.share({
                  title: article.title,
                  text: article.description,
                  url: window.location.href,
                })}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center text-sm text-slate-500 mb-8">
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
            </div>

            <div 
              className="prose prose-slate prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}