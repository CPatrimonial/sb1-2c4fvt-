"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/custo-oportunidade", label: "Custo de Oportunidade" },
    { href: "/plano-financeiro", label: "Plano Financeiro" },
    { href: "/consultoria", label: "Consultoria" },
    { href: "/conteudo-patrimonial", label: "Conteúdo Patrimonial" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Crédito Patrimonial
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="default" 
              className="bg-blue-900 hover:bg-blue-800"
              asChild
            >
              <Link href="/consultoria">
                Agendar Consultoria
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-900 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="default" 
              className="w-full bg-blue-900 hover:bg-blue-800 mt-4"
              asChild
            >
              <Link href="/consultoria">
                Agendar Consultoria
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;