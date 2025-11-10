#!/bin/bash

# Rio Eats SaaS - Setup Script
echo "🚀 Setting up Rio Eats SaaS..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js $(node --version) and npm $(npm --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment variables
if [ ! -f .env ]; then
    echo "⚙️ Creating environment file..."
    cp .env.example .env
    echo "📝 Please edit .env file with your configuration"
fi

# Setup database
echo "🗄️ Setting up database..."
cd packages/database

# Install Prisma if not installed
if [ ! -d node_modules/.bin/prisma ]; then
    npm install prisma --save-dev
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push schema to database (requires database to be running)
echo "💾 Pushing database schema..."
npx prisma db push --accept-data-loss

# Seed database
echo "🌱 Seeding database with demo data..."
npx prisma db seed

cd ../..

# Build the project
echo "🏗️ Building project..."
npm run build

echo ""
echo "🎉 Rio Eats SaaS setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure Docker is running (for database)"
echo "2. Run 'docker-compose up -d' to start services"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "👤 Admin Credentials:"
echo "   Email: sevenbeatx@gmail.com"
echo "   Password: 24526082"
echo ""
echo "🏪 Demo Restaurant:"
echo "   URL: http://localhost:3000/demo-restaurante"
echo "   Owner: dono@demorestaurante.com / demo123"
echo ""
echo "📚 API Documentation:"
echo "   http://localhost:3001/api/docs"
echo ""
echo "Happy coding! 🚀"