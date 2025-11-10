'use client';

import Image from 'next/image';
import { StarIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Badge } from '@/components/ui/badge';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryFee: number;
  minOrder: number;
  deliveryTime: number;
  isOpen: boolean;
}

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 sm:h-64 lg:h-80">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* Restaurant Status */}
        <div className="absolute top-4 left-4">
          <Badge variant={restaurant.isOpen ? 'success' : 'danger'}>
            {restaurant.isOpen ? 'Aberto' : 'Fechado'}
          </Badge>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {restaurant.name}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {restaurant.description}
              </p>
              
              {/* Rating */}
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {restaurant.rating}
                  </span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-600">
                  {restaurant.reviewCount} avaliações
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Delivery Fee */}
                <div className="flex items-center">
                  <TruckIcon className="h-5 w-5 text-primary-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Taxa de entrega</p>
                    <p className="text-sm font-medium text-gray-900">
                      R$ {restaurant.deliveryFee.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-primary-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Tempo de entrega</p>
                    <p className="text-sm font-medium text-gray-900">
                      {restaurant.deliveryTime} min
                    </p>
                  </div>
                </div>

                {/* Minimum Order */}
                <div className="flex items-center">
                  <div className="h-5 w-5 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs text-white font-bold">R$</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pedido mínimo</p>
                    <p className="text-sm font-medium text-gray-900">
                      R$ {restaurant.minOrder.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}