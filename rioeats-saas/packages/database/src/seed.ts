import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create super admin user
  const hashedPassword = await bcrypt.hash('24526082', 10);
  
  const superAdmin = await prisma.user.upsert({
    where: { email: 'sevenbeatx@gmail.com' },
    update: {},
    create: {
      email: 'sevenbeatx@gmail.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Super admin created:', superAdmin.email);

  // Create demo company (restaurant)
  const demoCompany = await prisma.company.upsert({
    where: { slug: 'demo-restaurante' },
    update: {},
    create: {
      name: 'Demo Restaurante',
      slug: 'demo-restaurante',
      email: 'contato@demorestaurante.com',
      phone: '(11) 99999-9999',
      description: 'Restaurante demonstrativo da plataforma Rio Eats',
      plan: 'TRIAL',
      isTrial: true,
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      categories: [
        'pizzas',
        'hamburgers', 
        'bebidas',
        'sobremesas',
        'combos'
      ],
      deliveryZones: [
        {
          name: 'Centro',
          neighborhoods: ['Centro', 'Vila Madalena'],
          fee: 5.00,
          minOrder: 20.00
        },
        {
          name: 'Zona Sul',
          neighborhoods: ['Morumbi', 'Butantã'],
          fee: 8.00,
          minOrder: 25.00
        }
      ],
      operatingHours: {
        monday: { open: '08:00', close: '22:00', closed: false },
        tuesday: { open: '08:00', close: '22:00', closed: false },
        wednesday: { open: '08:00', close: '22:00', closed: false },
        thursday: { open: '08:00', close: '22:00', closed: false },
        friday: { open: '08:00', close: '23:00', closed: false },
        saturday: { open: '10:00', close: '23:00', closed: false },
        sunday: { open: '10:00', close: '21:00', closed: false }
      },
      paymentMethods: ['PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'CASH'],
    },
  });

  console.log('✅ Demo company created:', demoCompany.name);

  // Create restaurant owner
  const restaurantOwner = await prisma.user.upsert({
    where: { email: 'dono@demorestaurante.com' },
    update: {},
    create: {
      email: 'dono@demorestaurante.com',
      password: await bcrypt.hash('demo123', 10),
      name: 'João Silva',
      role: 'RESTAURANT_OWNER',
      phone: '(11) 98765-4321',
      companyId: demoCompany.id,
      isActive: true,
    },
  });

  console.log('✅ Restaurant owner created:', restaurantOwner.email);

  // Create demo products
  const products = [
    // Pizzas
    {
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela e manjericão fresco',
      price: 45.90,
      category: 'pizzas',
      imageUrl: '/images/products/pizza-margherita.jpg',
      isAvailable: true,
      preparationTime: 25,
    },
    {
      name: 'Pizza Calabresa',
      description: 'Molho de tomate, calabresa e cebola',
      price: 38.50,
      category: 'pizzas',
      imageUrl: '/images/products/pizza-calabresa.jpg',
      isAvailable: true,
      preparationTime: 25,
    },
    // Hamburgers
    {
      name: 'Hambúrguer Clássico',
      description: 'Pão, carne 150g, queijo, alface, tomate e cebola',
      price: 28.90,
      category: 'hamburgers',
      imageUrl: '/images/products/burger-classico.jpg',
      isAvailable: true,
      preparationTime: 15,
    },
    {
      name: 'Hambúrguer Bacon',
      description: 'Pão, carne 150g, bacon crocante, queijo e molhos',
      price: 34.90,
      category: 'hamburgers',
      imageUrl: '/images/products/burger-bacon.jpg',
      isAvailable: true,
      preparationTime: 15,
    },
    // Bebidas
    {
      name: 'Coca-Cola 350ml',
      description: 'Refrigerante Coca-Cola 350ml',
      price: 5.50,
      category: 'bebidas',
      imageUrl: '/images/products/coca-cola.jpg',
      isAvailable: true,
      preparationTime: 2,
    },
    {
      name: 'Suco Natural',
      description: 'Suco natural de laranja ou acerola 300ml',
      price: 8.90,
      category: 'bebidas',
      imageUrl: '/images/products/suco-natural.jpg',
      isAvailable: true,
      preparationTime: 3,
    },
  ];

  for (const productData of products) {
    await prisma.product.create({
      data: {
        ...productData,
        companyId: demoCompany.id,
      },
    });
  }

  console.log('✅ Demo products created');

  // Create some demo orders
  const demoOrders = [
    {
      orderNumber: 'ORD-2025-001',
      customerName: 'Maria Silva',
      customerPhone: '(11) 91234-5678',
      customerEmail: 'maria@email.com',
      deliveryAddress: 'Rua das Flores, 123',
      deliveryNeighborhood: 'Centro',
      deliveryCity: 'São Paulo',
      deliveryState: 'SP',
      deliveryCep: '01000-000',
      deliveryFee: 5.00,
      subtotal: 45.90,
      total: 50.90,
      paymentMethod: 'PIX',
      paymentStatus: 'PAID',
      status: 'DELIVERED',
      items: [
        {
          name: 'Pizza Margherita',
          price: 45.90,
          quantity: 1,
          notes: 'Extra manjericão'
        }
      ],
      estimatedTime: 30,
      preparedAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      deliveredAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      completedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      companyId: demoCompany.id,
    },
    {
      orderNumber: 'ORD-2025-002',
      customerName: 'Pedro Santos',
      customerPhone: '(11) 98765-4321',
      customerEmail: 'pedro@email.com',
      deliveryAddress: 'Av. Paulista, 1000',
      deliveryNeighborhood: 'Bela Vista',
      deliveryCity: 'São Paulo',
      deliveryState: 'SP',
      deliveryCep: '01310-100',
      deliveryFee: 8.00,
      subtotal: 63.80,
      total: 71.80,
      paymentMethod: 'CREDIT_CARD',
      paymentStatus: 'PAID',
      status: 'PREPARING',
      items: [
        {
          name: 'Hambúrguer Clássico',
          price: 28.90,
          quantity: 1,
          notes: 'Sem cebola'
        },
        {
          name: 'Coca-Cola 350ml',
          price: 5.50,
          quantity: 2,
          notes: ''
        }
      ],
      estimatedTime: 20,
      companyId: demoCompany.id,
    },
  ];

  for (const orderData of demoOrders) {
    await prisma.order.create({
      data: orderData,
    });
  }

  console.log('✅ Demo orders created');

  // Create demo customers
  const demoCustomers = [
    {
      googleId: 'demo-google-id-1',
      googleEmail: 'maria.silva@gmail.com',
      googleName: 'Maria Silva',
      name: 'Maria Silva',
      isActive: true,
    },
    {
      googleId: 'demo-google-id-2',
      googleEmail: 'pedro.santos@gmail.com',
      googleName: 'Pedro Santos',
      name: 'Pedro Santos',
      isActive: true,
    },
  ];

  for (const customerData of demoCustomers) {
    await prisma.user.create({
      data: customerData,
    });
  }

  console.log('✅ Demo customers created');

  // Create demo reviews
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Pizza delivery muito rápida e saborosa!',
      order: {
        connect: { orderNumber: 'ORD-2025-001' }
      },
      customer: {
        connect: { googleEmail: 'maria.silva@gmail.com' }
      },
    },
  });

  console.log('✅ Demo review created');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📧 Admin Login: sevenbeatx@gmail.com');
  console.log('🔑 Password: 24526082');
  console.log('\n🏪 Demo Restaurant:');
  console.log('  - URL: http://localhost:3000/demo-restaurante');
  console.log('  - Owner Login: dono@demorestaurante.com / demo123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });