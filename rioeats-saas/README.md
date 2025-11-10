# 🍽️ Rio Eats - Plataforma de Delivery SaaS Multi-Tenant

## 🎯 Visão Geral

**Rio Eats** é uma plataforma SaaS de delivery multi-tenant onde desenvolvedores podem alugar a plataforma para donos de lojas. Cada loja possui URL exclusiva, identidade visual própria e dados completamente isolados.

## 🏗️ Arquitetura

- **Frontend**: Next.js + TypeScript + Tailwind CSS (design premium, mobile-first)
- **Backend**: NestJS (Node.js) + TypeScript
- **Banco**: PostgreSQL (multi-tenant com company_id)
- **Cache/Jobs**: Redis + BullMQ
- **Autenticação**: JWT + Refresh Tokens (cookies HttpOnly)
- **Deploy**: Docker Compose
- **Testes**: Jest (unit), Playwright (E2E)

## 🌐 URLs do Sistema

- **Admin**: `admin.rioeats.com`
- **Loja**: `app.rioeats.com/{slug-da-loja}`
- **Painel Dev**: `/dev` (restrito)

## 👥 Perfis de Usuário

### 🔧 Desenvolvedor (Super Admin)
- **Login**: sevenbeatx@gmail.com / 24526082
- **Permissões**: 
  - Criar/editar/excluir lojas
  - Ativar/desativar tenants
  - Impersonation (entrar como dono da loja)
  - Gestão de planos e assinaturas
  - Dashboard geral com métricas

### 🏪 Dono da Loja
- **Funcionalidades**:
  - Onboarding guiado
  - Gestão de pedidos em tempo real
  - Gestão de cardápio
  - Relatórios financeiros
  - Marketing e promoções
  - Integração Mercado Pago

### 👤 Cliente Final
- **Funcionalidades**:
  - Vitrine estilo iFood
  - Carrinho e checkout
  - Pagamentos Mercado Pago
  - Rastreamento de pedidos
  - Histórico e avaliações

## 💰 Plano de Assinatura

- **Valor**: R$ 99/mês
- **Trial**: 7 dias grátis
- **Pagamento**: Mercado Pago Subscriptions API
- **Após trial**: Painel congela com mensagem para assinatura

## 🛠️ Tecnologias Principais

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI
- React Query
- NextAuth.js

### Backend
- NestJS 10
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- JWT
- Mercado Pago SDK

### DevOps
- Docker Compose
- GitHub Actions
- Vercel (Frontend)
- Railway/Heroku (Backend)

## 🚀 Quick Start

```bash
# 1. Clonar repositório
git clone https://github.com/SEU-USUARIO/rioeats-saas.git
cd rioeats-saas

# 2. Instalar dependências
npm install

# 3. Setup ambiente
cp .env.example .env
# Editar .env com suas credenciais

# 4. Setup banco de dados
npx prisma generate
npx prisma db push

# 5. Seed inicial
npm run seed

# 6. Executar em desenvolvimento
npm run dev

# 7. Deploy com Docker
docker-compose up -d
```

## 📱 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Iniciar tudo em desenvolvimento
npm run dev:web      # Frontend apenas
npm run dev:admin    # Admin apenas  
npm run dev:api      # Backend apenas

# Produção
npm run build        # Build de produção
npm run start        # Iniciar produção
docker-compose up    # Deploy Docker

# Banco de dados
npm run db:generate  # Prisma generate
npm run db:push      # Push schema
npm run db:migrate   # Migrations
npm run db:seed      # Seed dados iniciais

# Testes
npm run test         # Testes unitários
npm run test:e2e     # Testes E2E
npm run test:watch   # Testes watch mode
```

## 🔑 Credenciais de Desenvolvimento

### Admin Principal
- **Email**: sevenbeatx@gmail.com
- **Senha**: 24526082

### Mercado Pago (Sandbox)
- **Client ID**: ${MP_CLIENT_ID}
- **Client Secret**: ${MP_CLIENT_SECRET}
- **Webhook URL**: https://api.rioeats.com/webhooks/mp

## 📊 Funcionalidades por Perfil

### 🔧 Desenvolvedor
- [ ] Dashboard com métricas gerais
- [ ] CRUD de lojas
- [ ] Gestão de tenants
- [ ] Impersonation
- [ ] Gestão de planos
- [ ] Webhook Mercado Pago
- [ ] Relatórios de faturamento

### 🏪 Dono da Loja
- [ ] Onboarding completo
- [ ] Gestão de pedidos (Kanban)
- [ ] Gestão de cardápio
- [ ] Upload de imagens
- [ ] Zonas de entrega
- [ ] Relatórios financeiros
- [ ] Chat com clientes
- [ ] Promoções e cupons
- [ ] Integração Mercado Pago OAuth

### 👤 Cliente Final
- [ ] Login Google obrigatório
- [ ] Vitrine de produtos
- [ ] Categorias e filtros
- [ ] Carrinho persistente
- [ ] Checkout Mercado Pago
- [ ] Rastreamento pedidos
- [ ] Histórico e avaliações

## 🔐 Segurança

- Senhas com hash (bcrypt)
- Cookies HttpOnly + Secure
- Rate limiting
- Validação de entrada
- Dados criptografados
- LGPD compliance

## 🌐 Integrações

### Mercado Pago
- **Assinaturas**: Sistema R$99/mês
- **Pedidos**: OAuth por loja
- **Webhooks**: Notificações automáticas
- **Pagamentos**: PIX + Cartão + Dinheiro

### Google
- **Maps**: Autocomplete endereços
- **Auth**: Login obrigatório clientes
- **Places**: Validação endereços

## 📱 Design System

- **Paleta**: Gradientes modernos
- **Tipografia**: Inter + SF Pro
- **Mobile-first**: UX otimizada
- **Tema**: Claro/escuro automático

## 🐛 Debug

### Logs
```bash
# Backend logs
npm run logs:api

# Banco logs  
npm run logs:db

# Redis logs
npm run logs:redis
```

### Desenvolvimento
```bash
# Hot reload
npm run dev

# Debug Prisma
npx prisma studio

# Cache Redis
npm run redis:cli
```

## 📈 Monitoramento

- Sentry (error tracking)
- Prometheus (métricas)
- Grafana (dashboards)
- GitHub Actions CI/CD

## 📝 Licença

Proprietário - Todos os direitos reservados

## 🆘 Suporte

- **Documentação**: `/docs`
- **API Docs**: `http://localhost:3001/api`
- **Issues**: GitHub Issues
- **Email**: sevenbeatx@gmail.com

---

**Desenvolvido com ❤️ para revolucionar o delivery brasileiro**