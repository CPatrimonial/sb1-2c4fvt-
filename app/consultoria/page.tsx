"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MessageCircle, ArrowRight, CheckCircle2, Target, LineChart, Shield } from "lucide-react";
import Link from "next/link";

export default function ConsultoriaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="premium-heading text-5xl md:text-7xl font-bold mb-8">
            Consultoria Patrimonial
            <span className="block premium-text-gradient mt-2">Extraordinária</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transforme seu patrimônio em um legado extraordinário através de estratégias personalizadas e expertise incomparável.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="premium-button bg-blue-900 hover:bg-blue-800 text-lg h-14 px-8"
              asChild
            >
              <Link href="#agendar">
                Agendar Consultoria Exclusiva
                <Calendar className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="premium-button border-blue-900 text-blue-900 hover:bg-blue-50 text-lg h-14 px-8"
              asChild
            >
              <Link href="#duvidas">
                Diálogo Personalizado
                <MessageCircle className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="premium-heading text-4xl md:text-5xl font-bold text-center mb-20">
            Nossa Abordagem <span className="premium-text-gradient">Distintiva</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <Card className="premium-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors"></div>
              <Target className="h-14 w-14 text-blue-900 mb-6 relative z-10" />
              <h3 className="text-2xl font-semibold mb-4 relative z-10">Análise Estratégica</h3>
              <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                Desenvolvemos um diagnóstico profundo e meticuloso do seu patrimônio e aspirações.
              </p>
            </Card>

            <Card className="premium-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors"></div>
              <LineChart className="h-14 w-14 text-blue-900 mb-6 relative z-10" />
              <h3 className="text-2xl font-semibold mb-4 relative z-10">Planejamento Elite</h3>
              <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                Criamos soluções sob medida que maximizam o potencial do seu patrimônio.
              </p>
            </Card>

            <Card className="premium-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors"></div>
              <Shield className="h-14 w-14 text-blue-900 mb-6 relative z-10" />
              <h3 className="text-2xl font-semibold mb-4 relative z-10">Execução Primorosa</h3>
              <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                Implementamos estratégias com precisão e acompanhamento contínuo.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="premium-heading text-4xl md:text-5xl font-bold text-center mb-20">
            Excelência em Cada <span className="premium-text-gradient">Detalhe</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                "Consultoria exclusiva e personalizada",
                "Análise patrimonial aprofundada",
                "Estratégias financeiras sofisticadas",
                "Acesso a oportunidades diferenciadas",
                "Acompanhamento dedicado e contínuo",
                "Confidencialidade absoluta"
              ].map((benefit, index) => (
                <div key={index} className="premium-card flex items-center space-x-4 p-6 rounded-xl">
                  <CheckCircle2 className="h-8 w-8 text-blue-900 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="premium-gradient rounded-2xl p-10 text-white">
              <h3 className="text-3xl font-bold mb-8">Nossa Filosofia</h3>
              <p className="text-xl leading-relaxed mb-10">
                Buscamos a excelência em cada aspecto do nosso serviço, garantindo que seu patrimônio receba o cuidado e atenção que merece, com soluções verdadeiramente personalizadas.
              </p>
              <div className="flex flex-col space-y-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="premium-button w-full bg-white text-blue-900 hover:bg-blue-50 h-14"
                  asChild
                >
                  <Link href="#agendar">
                    Iniciar Jornada
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="agendar" className="py-24 premium-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="premium-heading text-4xl md:text-5xl font-bold mb-8">
            Eleve Seu Patrimônio ao Próximo Nível
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Agende uma reunião exclusiva com nossos especialistas e descubra como podemos transformar seus objetivos em realidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="premium-button bg-white text-blue-900 hover:bg-blue-50 text-lg h-14 px-8"
              asChild
            >
              <Link href="https://calendly.com/seu-link">
                Agendar Consultoria Exclusiva
                <Calendar className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="premium-button border-white text-white hover:bg-white/10 text-lg h-14 px-8"
              asChild
            >
              <Link href="https://wa.me/seu-numero">
                WhatsApp Corporativo
                <MessageCircle className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}