import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Crédito Patrimonial</h3>
            <p className="text-gray-300 text-sm">
              Transformando seu patrimônio em oportunidades reais para realizar grandes projetos.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/calculadora" className="text-gray-300 hover:text-white text-sm">
                  Simulador Financeiro
                </Link>
              </li>
              <li>
                <Link href="/consultoria" className="text-gray-300 hover:text-white text-sm">
                  Consultoria Personalizada
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white text-sm">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>contato@creditopatrimonial.com.br</li>
              <li>+55 (11) 99999-9999</li>
              <li>São Paulo - SP</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-900 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} Crédito Patrimonial. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;