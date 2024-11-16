import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calculator, LineChart, Shield } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-950 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10" role="img" aria-label="Imagem de fundo representando sucesso financeiro"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Crédito com Garantia de Imóvel
            <span className="block text-blue-300">para Seus Grandes Projetos</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Especialistas em viabilizar projetos importantes através do crédito com garantia de imóvel. 
            Taxas a partir de 0,99% ao mês, processo seguro e consultoria especializada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg"
              asChild
            >
              <Link href="/calculadora">
                Simular Crédito <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg"
              asChild
            >
              <Link href="/consultoria">Consultoria Gratuita</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" aria-label="Vantagens do Crédito Patrimonial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Crédito com Garantia de Imóvel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As melhores condições do mercado para transformar seu patrimônio em oportunidades 
              reais de crescimento e realização.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Calculator className="h-12 w-12 text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Taxas Competitivas
              </h3>
              <p className="text-gray-600">
                Juros a partir de 0,99% ao mês, as menores taxas do mercado para 
                crédito com garantia de imóvel.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Processo Seguro
              </h3>
              <p className="text-gray-600">
                Garantimos total segurança jurídica e transparência em todas as etapas 
                do processo de crédito.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <LineChart className="h-12 w-12 text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Consultoria Especializada
              </h3>
              <p className="text-gray-600">
                Equipe especializada em crédito com garantia de imóvel para orientar 
                você em cada etapa.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Realize Seus Projetos com Segurança
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Simule agora seu crédito com garantia de imóvel e descubra as melhores 
            condições para seu projeto.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-900 hover:bg-blue-50 text-lg"
            asChild
          >
            <Link href="/calculadora">
              Simular Crédito Agora <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}