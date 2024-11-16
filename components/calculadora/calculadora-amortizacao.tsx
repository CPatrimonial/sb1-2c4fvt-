'use client';

import React, { useState, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const CalculadoraAmortizacao = () => {
  const [cenarios, setCenarios] = useState([
    {
      id: 1,
      nome: 'Cenário 1',
      valorEmprestimo: 200000,
      taxaJurosMensal: 1.29,
      prazoMeses: 180,
      pagamentosExtrasMensais: 0,
      pagamentosExtrasAnuais: 0,
      pagamentoExtraPontual: { mes: 1, valor: 0 },
    },
  ]);

  const [cenarioAtivo, setCenarioAtivo] = useState('1');

  const calcularAmortizacao = useCallback((cenario, comExtras = true) => {
    const {
      valorEmprestimo,
      taxaJurosMensal,
      prazoMeses,
      pagamentosExtrasMensais,
      pagamentosExtrasAnuais,
      pagamentoExtraPontual,
    } = cenario;
    const taxaMensal = taxaJurosMensal / 100;
    const saldoDevedorInicial = valorEmprestimo * 1.0111;
    const pagamentoMensal =
      (saldoDevedorInicial *
        taxaMensal *
        Math.pow(1 + taxaMensal, prazoMeses)) /
      (Math.pow(1 + taxaMensal, prazoMeses) - 1);

    let saldoDevedor = saldoDevedorInicial;
    const dados = [];
    let totalJuros = 0;
    let totalPago = 0;

    for (let mes = 1; mes <= prazoMeses; mes++) {
      const juros = saldoDevedor * taxaMensal;
      let amortizacao = pagamentoMensal - juros;

      if (comExtras) {
        amortizacao += pagamentosExtrasMensais;
        if (mes % 12 === 0) amortizacao += pagamentosExtrasAnuais;
        if (mes === pagamentoExtraPontual.mes)
          amortizacao += pagamentoExtraPontual.valor;
      }

      saldoDevedor = Math.max(0, saldoDevedor - amortizacao);
      totalJuros += juros;
      totalPago +=
        pagamentoMensal +
        (comExtras ? amortizacao - (pagamentoMensal - juros) : 0);

      if (mes % 12 === 0 || saldoDevedor === 0 || mes === prazoMeses) {
        dados.push({
          mes,
          saldoDevedor,
          totalPago,
          totalJuros,
        });
      }

      if (saldoDevedor === 0) break;
    }

    return {
      pagamentoMensal,
      totalPago,
      totalJuros,
      prazoFinal: dados[dados.length - 1].mes,
      dados,
      saldoDevedorInicial,
    };
  }, []);

  const adicionarCenario = useCallback(() => {
    const novoCenario = {
      id: cenarios.length + 1,
      nome: `Cenário ${cenarios.length + 1}`,
      valorEmprestimo: 200000,
      taxaJurosMensal: 1.29,
      prazoMeses: 120,
      pagamentosExtrasMensais: 0,
      pagamentosExtrasAnuais: 0,
      pagamentoExtraPontual: { mes: 1, valor: 0 },
    };
    setCenarios((prevCenarios) => [...prevCenarios, novoCenario]);
    setCenarioAtivo(novoCenario.id.toString());
  }, [cenarios]);

  const atualizarCenario = useCallback((id, campo, valor) => {
    setCenarios((prevCenarios) =>
      prevCenarios.map((cenario) =>
        cenario.id === id ? { ...cenario, [campo]: valor } : cenario
      )
    );
  }, []);

  const CORES = [
    '#003399',
    '#00ccff',
    '#ff6600',
    '#33cc33',
    '#ff3399',
    '#9933ff',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simulador de Plano Financeiro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare diferentes cenários de financiamento e encontre a melhor
            estratégia para seu patrimônio.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-blue-900 text-white p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Cenários de Simulação</h2>
              <Button
                onClick={adicionarCenario}
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Adicionar Novo Cenário
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={cenarioAtivo} onValueChange={setCenarioAtivo}>
              <TabsList className="mb-6">
                {cenarios.map((cenario) => (
                  <TabsTrigger key={cenario.id} value={cenario.id.toString()}>
                    {cenario.nome}
                  </TabsTrigger>
                ))}
              </TabsList>

              {cenarios.map((cenario) => (
                <TabsContent key={cenario.id} value={cenario.id.toString()}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor do Empréstimo (R$)
                      </label>
                      <Input
                        type="number"
                        value={cenario.valorEmprestimo}
                        onChange={(e) =>
                          atualizarCenario(
                            cenario.id,
                            'valorEmprestimo',
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Taxa de Juros Mensal (%)
                      </label>
                      <Input
                        type="number"
                        value={cenario.taxaJurosMensal}
                        onChange={(e) =>
                          atualizarCenario(
                            cenario.id,
                            'taxaJurosMensal',
                            Number(e.target.value)
                          )
                        }
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prazo (meses): {cenario.prazoMeses}
                      </label>
                      <Slider
                        value={[cenario.prazoMeses]}
                        onValueChange={(value) =>
                          atualizarCenario(
                            cenario.id,
                            'prazoMeses',
                            Math.round(value[0] / 12) * 12
                          )
                        }
                        min={36}
                        max={240}
                        step={12}
                        className="mt-4"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Pagamentos Extras
                    </h3>
                    <Tabs defaultValue="mensal" className="w-full">
                      <TabsList>
                        <TabsTrigger value="mensal">Mensal</TabsTrigger>
                        <TabsTrigger value="anual">Anual</TabsTrigger>
                        <TabsTrigger value="pontual">Pontual</TabsTrigger>
                      </TabsList>
                      <TabsContent value="mensal">
                        <Input
                          type="number"
                          placeholder="Valor mensal extra"
                          value={cenario.pagamentosExtrasMensais}
                          onChange={(e) =>
                            atualizarCenario(
                              cenario.id,
                              'pagamentosExtrasMensais',
                              Number(e.target.value)
                            )
                          }
                        />
                      </TabsContent>
                      <TabsContent value="anual">
                        <Input
                          type="number"
                          placeholder="Valor anual extra"
                          value={cenario.pagamentosExtrasAnuais}
                          onChange={(e) =>
                            atualizarCenario(
                              cenario.id,
                              'pagamentosExtrasAnuais',
                              Number(e.target.value)
                            )
                          }
                        />
                      </TabsContent>
                      <TabsContent value="pontual">
                        <div className="flex gap-4">
                          <Input
                            type="number"
                            placeholder="Mês"
                            value={cenario.pagamentoExtraPontual.mes}
                            onChange={(e) =>
                              atualizarCenario(
                                cenario.id,
                                'pagamentoExtraPontual',
                                {
                                  ...cenario.pagamentoExtraPontual,
                                  mes: Number(e.target.value),
                                }
                              )
                            }
                            className="w-1/3"
                          />
                          <Input
                            type="number"
                            placeholder="Valor"
                            value={cenario.pagamentoExtraPontual.valor}
                            onChange={(e) =>
                              atualizarCenario(
                                cenario.id,
                                'pagamentoExtraPontual',
                                {
                                  ...cenario.pagamentoExtraPontual,
                                  valor: Number(e.target.value),
                                }
                              )
                            }
                            className="w-2/3"
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="bg-blue-900 text-white p-6">
              <h3 className="text-xl font-semibold">Gráfico de Amortização</h3>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" allowDuplicatedCategory={false} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {cenarios.map((cenario, index) => {
                    const resultados = calcularAmortizacao(cenario);
                    return (
                      <Line
                        key={cenario.id}
                        type="monotone"
                        data={resultados.dados}
                        dataKey="saldoDevedor"
                        stroke={CORES[index % CORES.length]}
                        name={`${cenario.nome} - Saldo Devedor`}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-blue-900 text-white p-6">
              <h3 className="text-xl font-semibold">Comparação de Cenários</h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Cenário</th>
                      <th className="p-3 text-right">Pagamento Mensal</th>
                      <th className="p-3 text-right">Total Pago</th>
                      <th className="p-3 text-right">Total de Juros</th>
                      <th className="p-3 text-right">Prazo Final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cenarios.map((cenario, index) => {
                      const resultados = calcularAmortizacao(cenario);
                      return (
                        <tr
                          key={cenario.id}
                          className={
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }
                        >
                          <td className="p-3">{cenario.nome}</td>
                          <td className="p-3 text-right">
                            R${' '}
                            {resultados.pagamentoMensal.toLocaleString(
                              'pt-BR',
                              { minimumFractionDigits: 2 }
                            )}
                          </td>
                          <td className="p-3 text-right">
                            R${' '}
                            {resultados.totalPago.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="p-3 text-right">
                            R${' '}
                            {resultados.totalJuros.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="p-3 text-right">
                            {resultados.prazoFinal} meses
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraAmortizacao;
