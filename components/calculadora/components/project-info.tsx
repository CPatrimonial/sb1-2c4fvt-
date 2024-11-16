"use client";

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ProjectInfoProps {
  projetoInfo: {
    descricao: string;
    ganhosQualidadeVida: number;
    ganhoValorizacao: number;
    ganhoAluguel: number;
    economiaGerada: number;
    investimentoViabilizacao: number;
  };
  handleProjetoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  ganhoPotencial: number;
  expectativaLucro: number;
  formatoMoeda: Intl.NumberFormat;
}

export function ProjectInfo({
  projetoInfo,
  handleProjetoChange,
  ganhoPotencial,
  expectativaLucro,
  formatoMoeda,
}: ProjectInfoProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-6 px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Informações do Projeto</h2>
      </CardHeader>
      <CardContent className="p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Descrição do Projeto</label>
          <textarea
            name="descricao"
            className="w-full h-32 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Descreva seu projeto considerando todos os aspectos que o tornam único e valioso."
            onChange={handleProjetoChange}
          />
          <p className="text-sm text-slate-500 mt-2">
            Detalhe os benefícios e o impacto esperado em seu patrimônio.
          </p>
        </div>

        {[
          { name: 'ganhosQualidadeVida', label: 'Ganhos em Qualidade de Vida' },
          { name: 'ganhoValorizacao', label: 'Ganho de Valorização do Imóvel' },
          { name: 'ganhoAluguel', label: 'Ganho de Aluguel' },
          { name: 'economiaGerada', label: 'Economia Gerada' },
          { name: 'investimentoViabilizacao', label: 'Investimento para Viabilização' },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">{field.label}</label>
            <Input
              name={field.name}
              type="number"
              placeholder={field.label}
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              onChange={handleProjetoChange}
            />
          </div>
        ))}

        <div className="mt-6 p-6 bg-gradient-to-br from-slate-50 to-white rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-slate-800 mb-2">
            Ganho Potencial: {formatoMoeda.format(ganhoPotencial)}
          </p>
          <p className="text-lg font-semibold text-slate-800 mb-2">
            Investimento: {formatoMoeda.format(projetoInfo.investimentoViabilizacao)}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            Expectativa de Retorno: {expectativaLucro.toFixed(2)}x
          </p>
        </div>
      </CardContent>
    </Card>
  );
}