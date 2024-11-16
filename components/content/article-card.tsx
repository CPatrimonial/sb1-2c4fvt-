"use client";

import { Card } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Article } from "./types";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-8">
        <div className="flex items-center text-sm text-slate-500 mb-4">
          <Clock className="h-4 w-4 mr-2" />
          <span>{article.readTime} de leitura</span>
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-slate-900 group-hover:text-slate-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          {article.description}
        </p>
        <Link 
          href={`/artigos/${article.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Continuar lendo
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  );
}