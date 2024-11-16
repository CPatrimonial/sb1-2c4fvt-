import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crédito Patrimonial | Crédito com Garantia de Imóvel para Grandes Projetos',
  description: 'Especialistas em crédito com garantia de imóvel. Transforme seu patrimônio em oportunidades, viabilize projetos importantes e maximize o potencial do seu imóvel com as melhores taxas do mercado.',
  keywords: 'crédito com garantia de imóvel, financiamento com garantia, home equity, crédito patrimonial, empréstimo com imóvel, refinanciamento imobiliário, simulador de crédito imobiliário',
  openGraph: {
    title: 'Crédito Patrimonial | Especialistas em Crédito com Garantia de Imóvel',
    description: 'Transforme seu patrimônio em oportunidades reais. Taxas competitivas, processo seguro e consultoria especializada para viabilizar seus grandes projetos.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Crédito Patrimonial',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crédito Patrimonial | Crédito com Garantia de Imóvel',
    description: 'Especialistas em transformar seu patrimônio em oportunidades reais. Viabilize grandes projetos com as melhores condições do mercado.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.creditopatrimonial.com.br" />
        <meta name="author" content="Crédito Patrimonial" />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="São Paulo" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}