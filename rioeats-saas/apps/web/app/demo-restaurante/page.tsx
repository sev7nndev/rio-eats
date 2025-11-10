import { Suspense } from 'react';
import { RestaurantHero } from '@/components/restaurant/restaurant-hero';
import { RestaurantHeader } from '@/components/restaurant/restaurant-header';
import { ProductGrid } from '@/components/products/product-grid';
import { Cart } from '@/components/cart/cart';
import { RestaurantInfo } from '@/components/restaurant/restaurant-info';

// This would be dynamic in a real app
const demoRestaurant = {
  id: 'demo-restaurant',
  name: 'Demo Restaurante',
  slug: 'demo-restaurante',
  description: 'Restaurante demonstrativo da plataforma Rio Eats',
  image: '/images/restaurant-demo.jpg',
  rating: 4.8,
  reviewCount: 128,
  categories: ['pizzas', 'hamburgers', 'bebidas', 'sobremesas'],
  deliveryFee: 5.00,
  minOrder: 20.00,
  deliveryTime: 30,
  isOpen: true,
  operatingHours: {
    monday: { open: '08:00', close: '22:00', closed: false },
    tuesday: { open: '08:00', close: '22:00', closed: false },
    wednesday: { open: '08:00', close: '22:00', closed: false },
    thursday: { open: '08:00', close: '22:00', closed: false },
    friday: { open: '08:00', close: '23:00', closed: false },
    saturday: { open: '10:00', close: '23:00', closed: false },
    sunday: { open: '10:00', close: '21:00', closed: false },
  },
};

const demoProducts = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela e manjericão fresco',
    price: 45.90,
    image: '/images/pizza-margherita.jpg',
    category: 'pizzas',
    isAvailable: true,
    preparationTime: 25,
    extras: [
      { id: 'extra-cheese', name: 'Queijo extra', price: 8.00 },
      { id: 'bacon', name: 'Bacon', price: 6.00 },
    ],
  },
  {
    id: '2',
    name: 'Hambúrguer Clássico',
    description: 'Pão, carne 150g, queijo, alface, tomate e cebola',
    price: 28.90,
    image: '/images/burger-classico.jpg',
    category: 'hamburgers',
    isAvailable: true,
    preparationTime: 15,
    extras: [
      { id: 'fries', name: 'Batata frita', price: 12.00 },
      { id: 'drink', name: 'Refrigerante', price: 5.50 },
    ],
  },
  {
    id: '3',
    name: 'Açaí na Tigela',
    description: 'Açaí com granola, banana, morango e mel',
    price: 18.90,
    image: '/images/acai-tigela.jpg',
    category: 'sobremesas',
    isAvailable: true,
    preparationTime: 5,
    extras: [],
  },
  {
    id: '4',
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante Coca-Cola gelado',
    price: 5.50,
    image: '/images/coca-cola.jpg',
    category: 'bebidas',
    isAvailable: true,
    preparationTime: 2,
    extras: [],
  },
];

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <RestaurantHeader restaurant={demoRestaurant} />

      {/* Hero Section */}
      <RestaurantHero restaurant={demoRestaurant} />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Products Section */}
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-gray-200" />}>
              <ProductGrid 
                restaurantId={demoRestaurant.id}
                categories={demoRestaurant.categories}
              />
            </Suspense>
          </div>

          {/* Restaurant Info Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <RestaurantInfo restaurant={demoRestaurant} />
            </div>
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <Cart restaurant={demoRestaurant} />
    </div>
  );
}