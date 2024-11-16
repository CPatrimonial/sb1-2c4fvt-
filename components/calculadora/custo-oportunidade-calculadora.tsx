"use client";

import React, { useState } from 'react';
import { ProjectInfo } from './components/project-info';
import { CreditInfo } from './components/credit-info';
import { OpportunityAnalysis } from './components/opportunity-analysis';

const CustoOportunidadeCalculadora = () => {
  const [projetoInfo, setProjetoInfo] = useState({
    descricao: '',
    ganhosQualidadeVida: 0,
    ganhoValorizacao: 0,
    ganhoAluguel: 0,
    economiaGerada: 0,
    investimentoViabilizacao: 0
  });

  const [creditoInfo, setCreditoInfo] = useState({
    taxaJurosMensal: 0,
    quantidadeParcelas: 36
  });

  const [custoCreditoInfo, setCustoCreditoInfo] = useState(null);
  const [graficoVisivel, setGraficoVisivel] = useState(false);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [dadosGraficoPagamento, setDadosGraficoPagamento] = useState([]);

  const ganhoPotencial = projetoInfo.ganhosQualidadeVida + projetoInfo.ganhoValorizacao + 
                         projetoInfo.ganhoAluguel + projetoInfo.economiaGerada;
  
  const expectativaLucro = projetoInfo.investimentoViabilizacao > 0 
    ? ganhoPotencial / projetoInfo.investimentoViabilizacao 
    : 0;

  const handleProjetoChange = (e) => {
    setProjetoInfo({ ...projetoInfo, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleCreditoChange = (e) => {
    setCreditoInfo({ ...creditoInfo, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleParcelasChange = (value) => {
    setCreditoInfo({ ...creditoInfo, quantidadeParcelas: value[0] });
  };

  const calcularCustoCredito = () => {
    const { taxaJurosMensal, quantidadeParcelas } = creditoInfo;
    const valorCredito = projetoInfo.investimentoViabilizacao * 1.11;
    const taxaMensal = taxaJurosMensal / 100;
    const parcelaMensal = (valorCredito * taxaMensal * Math.pow(1 + taxaMensal, quantidadeParcelas)) / 
                          (Math.pow(1 + taxaMensal, quantidadeParcelas) - 1);
    const custoTotal = parcelaMensal * quantidadeParcelas;

    setCustoCreditoInfo({
      parcelaMensal,
      custoTotal,
      jurosTotal: custoTotal - valorCredito
    });

    const dadosPagamento = [];
    let saldoDevedor = valorCredito;
    for (let mes = 1; mes <= quantidadeParcelas; mes++) {
      const juros = saldoDevedor * taxaMensal;
      const amortizacao = parcelaMensal - juros;
      saldoDevedor -= amortizacao;
      dadosPagamento.push({
        mes,
        saldoDevedor: Math.max(saldoDevedor, 0),
        parcela: parcelaMensal
      });
    }
    setDadosGraficoPagamento(dadosPagamento);
  };

  const calcularCustoOportunidade = () => {
    if (!custoCreditoInfo) {
      alert("Por favor, calcule o custo de crédito primeiro.");
      return;
    }

    const anos = creditoInfo.quantidadeParcelas / 12;
    const dadosAnuais = [];

    for (let ano = 1; ano <= anos; ano++) {
      const custoCreditoAcumulado = custoCreditoInfo.parcelaMensal * ano * 12;

      dadosAnuais.push({
        ano,
        ganhoPotencial,
        custoEmprestimo: custoCreditoAcumulado
      });

      if (ganhoPotencial > custoCreditoAcumulado && !dadosAnuais.custoOportunidade) {
        dadosAnuais.custoOportunidade = {
          ano,
          valor: ganhoPotencial - custoCreditoAcumulado
        };
      }
    }

    setDadosGrafico(dadosAnuais);
    setGraficoVisivel(true);
  };

  const formatoMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center tracking-tight">
          Simulador de Investimento
        </h1>
        <p className="text-slate-600 text-center mb-12 text-lg">
          Análise inteligente para decisões estratégicas
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectInfo
            projetoInfo={projetoInfo}
            handleProjetoChange={handleProjetoChange}
            ganhoPotencial={ganhoPotencial}
            expectativaLucro={expectativaLucro}
            formatoMoeda={formatoMoeda}
          />

          <CreditInfo
            creditoInfo={creditoInfo}
            handleCreditoChange={handleCreditoChange}
            handleParcelasChange={handleParcelasChange}
            calcularCustoCredito={calcularCustoCredito}
            custoCreditoInfo={custoCreditoInfo}
            dadosGraficoPagamento={dadosGraficoPagamento}
            formatoMoeda={formatoMoeda}
          />
        </div>

        <OpportunityAnalysis
          calcularCustoOportunidade={calcularCustoOportunidade}
          graficoVisivel={graficoVisivel}
          dadosGrafico={dadosGrafico}
          formatoMoeda={formatoMoeda}
        />
      </div>
    </div>
  );
};

export default CustoOportunidadeCalculadora;