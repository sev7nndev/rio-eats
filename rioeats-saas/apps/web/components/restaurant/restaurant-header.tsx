'use client';

import Link from 'next/link';
import { ShoppingCartIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/use-cart';

interface Restaurant {
  id: string;
  name: string;
  slug: string;
}

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const { items, getTotalPrice } = useCart();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              🍽️ Rio Eats
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-md mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Favorite */}
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <HeartIcon className="h-6 w-6" />
            </button>

            {/* Cart */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <ShoppingCartIcon className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}