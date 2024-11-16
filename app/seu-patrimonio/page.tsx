"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Share2, Download, ArrowRight, Home, FileCheck, Ruler, MapPin, Calculator, TrendingUp, PiggyBank } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function PatrimonyPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cep: '',
    propertyType: '',
    isRegularized: false,
    area: '',
  });
  const [analysis, setAnalysis] = useState<any>(null);

  const propertyTypes = [
    { value: 'house', label: 'Casa' },
    { value: 'apartment', label: 'Apartamento' },
    { value: 'land', label: 'Terreno' },
    { value: 'commercial', label: 'Comercial' },
  ];

  const handleCEPChange = async (cep: string) => {
    setFormData({ ...formData, cep });
    if (cep.length === 8) {
      // Simulate API call for property data
      const mockData = generateMockData();
      setAnalysis(mockData);
    }
  };

  const generateMockData = () => {
    const baseValue = 500000;
    const historicalData = Array.from({ length: 15 }, (_, i) => ({
      year: 2010 + i,
      value: baseValue * Math.pow(1.08, i),
    }));

    return {
      currentValue: historicalData[historicalData.length - 1].value,
      historicalData,
      creditPotential: {
        conservative: historicalData[historicalData.length - 1].value * 0.3,
        moderate: historicalData[historicalData.length - 1].value * 0.5,
        maximum: historicalData[historicalData.length - 1].value * 0.6,
      },
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Análise Patrimonial',
        text: 'Confira a análise do meu patrimônio imobiliário!',
        url: window.location.href,
      });
    } catch (error) {
      toast({
        title: "Compartilhamento não suportado",
        description: "Seu navegador não suporta a função de compartilhamento.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Análise Patrimonial Inteligente
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubra o potencial do seu patrimônio imobiliário e as oportunidades de crédito disponíveis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl">
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  CEP do Imóvel
                </Label>
                <Input
                  type="text"
                  placeholder="Digite o CEP (somente números)"
                  value={formData.cep}
                  onChange={(e) => handleCEPChange(e.target.value.replace(/\D/g, ''))}
                  maxLength={8}
                  className="text-lg"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Tipo de Imóvel
                </Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Documentação Regularizada
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isRegularized}
                    onCheckedChange={(checked) => setFormData({ ...formData, isRegularized: checked })}
                  />
                  <Label>{formData.isRegularized ? 'Sim' : 'Não'}</Label>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Área Construída (m²)
                </Label>
                <Input
                  type="number"
                  placeholder="Digite a área em m²"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="text-lg"
                />
              </div>
            </div>
          </Card>

          {/* Results Section */}
          {analysis && (
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Valorização Histórica
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analysis.historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563eb"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Potencial de Crédito
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">Conservador (30%)</p>
                      <p className="text-2xl font-semibold">
                        {formatCurrency(analysis.creditPotential.conservative)}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">Moderado (50%)</p>
                      <p className="text-2xl font-semibold">
                        {formatCurrency(analysis.creditPotential.moderate)}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">Máximo (60%)</p>
                      <p className="text-2xl font-semibold">
                        {formatCurrency(analysis.creditPotential.maximum)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Salvar PDF
                  </Button>
                </div>

                <Button
                  className="w-full bg-blue-900 hover:bg-blue-800"
                  size="lg"
                >
                  Solicitar Crédito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Investment Suggestions */}
        {analysis && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Sugestões de Investimento
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <PiggyBank className="h-12 w-12 text-blue-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Investimento em Renda Fixa</h3>
                <p className="text-slate-600">
                  Utilize o crédito para investir em CDBs, LCIs e LCAs com rentabilidade superior ao custo do empréstimo.
                </p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <Home className="h-12 w-12 text-blue-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Reforma e Valorização</h3>
                <p className="text-slate-600">
                  Invista na modernização do seu imóvel para aumentar seu valor de mercado e potencial de aluguel.
                </p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <TrendingUp className="h-12 w-12 text-blue-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quitação de Dívidas</h3>
                <p className="text-slate-600">
                  Unifique suas dívidas com taxas mais baixas e melhore seu fluxo de caixa mensal.
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}