import Link from 'next/link';
import { 
  ShoppingBagIcon, 
  ClockIcon, 
  TruckIcon,
  StarIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                🍽️ Rio Eats
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="btn-primary"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Delivery Rápido e Seguro
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-100">
              Encontre os melhores restaurantes da sua região e faça pedidos 
              com entrega rápida e segura.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/demo-restaurante"
                className="btn-secondary bg-white text-primary-600 hover:bg-gray-50"
              >
                Ver Demo
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold leading-6 text-white"
              >
                Cadastrar Restaurante <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Por que escolher o Rio Eats?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A plataforma mais completa para delivery
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card text-center">
              <div className="flex justify-center">
                <ShoppingBagIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Cardápio Digital
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Interface intuitiva para visualizar e pedir seus pratos favoritos
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center">
                <ClockIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Pedidos Rápidos
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Sistema otimizado para processar pedidos em segundos
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center">
                <TruckIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Entrega Segura
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Rastreamento em tempo real e entrega garantida
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center">
                <StarIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Qualidade Garantida
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Apenas restaurantes certificados e avaliados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Como funciona
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Simples, rápido e eficiente
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                Escolha o Restaurante
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Browse our partner restaurants and choose your favorite
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                Monte seu Pedido
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Adicione itens ao carrinho e personalize conforme necessário
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                Pague e Receba
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Multiple payment options and track your delivery in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pronto para fazer seu pedido?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Junte-se a milhares de clientes satisfeitos
            </p>
            <div className="mt-8">
              <Link
                href="/demo-restaurante"
                className="btn-secondary bg-white text-primary-600 hover:bg-gray-50"
              >
                Ver Demo do Restaurante
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-2xl font-bold">🍽️ Rio Eats</span>
            <p className="mt-4 text-gray-400">
              A plataforma de delivery mais completa do Brasil
            </p>
            <div className="mt-8 flex justify-center space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Termos de Uso
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Política de Privacidade
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contato
              </Link>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8">
              <p className="text-center text-gray-400">
                © 2025 Rio Eats. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}