"use client";

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CreditInfoProps {
  creditoInfo: {
    taxaJurosMensal: number;
    quantidadeParcelas: number;
  };
  handleCreditoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleParcelasChange: (value: number[]) => void;
  calcularCustoCredito: () => void;
  custoCreditoInfo: any;
  dadosGraficoPagamento: any[];
  formatoMoeda: Intl.NumberFormat;
}

export function CreditInfo({
  creditoInfo,
  handleCreditoChange,
  handleParcelasChange,
  calcularCustoCredito,
  custoCreditoInfo,
  dadosGraficoPagamento,
  formatoMoeda,
}: CreditInfoProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-6 px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Simulação de Crédito</h2>
      </CardHeader>
      <CardContent className="p-8">
        <Input
          name="taxaJurosMensal"
          type="number"
          placeholder="Taxa de Juros Mensal (%)"
          className="mb-4 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
          onChange={handleCreditoChange}
          step="0.01"
        />
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Prazo: {creditoInfo.quantidadeParcelas} meses
          </label>
          <Slider
            min={36}
            max={240}
            step={12}
            value={[creditoInfo.quantidadeParcelas]}
            onValueChange={handleParcelasChange}
            className="my-4"
          />
        </div>
        
        <Button
          onClick={calcularCustoCredito}
          className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white transition-all duration-300"
        >
          Calcular Simulação
        </Button>

        {custoCreditoInfo && (
          <div className="mt-6 p-6 bg-gradient-to-br from-slate-50 to-white rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-slate-800 mb-2">
              Parcela Mensal: {formatoMoeda.format(custoCreditoInfo.parcelaMensal)}
            </p>
            <p className="text-lg font-semibold text-slate-800 mb-2">
              Custo Total: {formatoMoeda.format(custoCreditoInfo.custoTotal)}
            </p>
            <p className="text-lg font-semibold text-blue-600">
              Total de Juros: {formatoMoeda.format(custoCreditoInfo.jurosTotal)}
            </p>
          </div>
        )}

        {dadosGraficoPagamento.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Evolução do Saldo Devedor</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={dadosGraficoPagamento}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mes" stroke="#64748b" />
                <YAxis tickFormatter={(value) => formatoMoeda.format(value)} stroke="#64748b" />
                <Tooltip
                  formatter={(value) => formatoMoeda.format(value)}
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="saldoDevedor"
                  stroke="#1e293b"
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e293b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1e293b" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}