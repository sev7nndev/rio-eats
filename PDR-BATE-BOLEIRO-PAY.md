# PDR Completo Final para SaaS - Bate Boleiro Pay

***

## 1. Visão Geral

Bate Boleiro Pay é um SaaS para gestão completa de carnês anuais em turmas de bate-bola, com painéis dedicados para cabeças da turma, membros e desenvolvedor, pagamentos integrados via Mercado Pago, hospedagem e backend pelo Supabase. O sistema prioriza segurança, transparência, usabilidade e escalabilidade, funcionando perfeitamente em dispositivos desktop, tablets e smartphones.

***

## 2. Usuários

- **Cabeça da turma:** Administração completa da turma, carnê, membros, pagamentos, comunicação e bloqueios.  
- **Membro:** Consulta, pagamento sequencial do carnê, notificações e comprovantes.  
- **Desenvolvedor/Admin:** Acesso fixo e exclusivo para gerenciamento, suporte e monitoramento de todo o sistema.

***

## 3. Funcionalidades

### 3.1 Autenticação

- Supabase Auth (email/senha, Google OAuth).  
- Login exclusivo dev fixo: email sevenbeatx@gmail.com / senha 24526082.  
- Gestão segura de sessões dedicadas e permissões.

### 3.2 Painel do Cabeça da Turma

- Cadastro e personalização (nome, logotipo, descrição).  
- Criação única de carnê anual, com valor total e parcelas definidas.  
- Consulta automática da data do Carnaval para definir vencimentos.  
- Geração e compartilhamento de link exclusivo para membros.  
- Controle em tempo real da lista de membros, status de pagamento, bloqueios ("morto na praia").  
- Gestão de membros (expulsão, reativação).  
- Visualização de relatórios financeiros e progresso.  
- Finalização/cancelamento do carnê com preservação do histórico.  
- Congelamento automático da turma e membros por inadimplência da assinatura SaaS.  
- Comunicação integrada para suporte e diálogo.

### 3.3 Painel do Membro

- Cadastro via link de convite e login simplificado.  
- Visualização sequencial das parcelas e vencimentos.  
- Pagamento via Mercado Pago vinculado à conta do cabeça.  
- Atualização instantânea do status de pagamentos.  
- Animações motivacionais e notificações para engajamento.  
- Histórico completo com emissão de comprovantes.

### 3.4 Painel do Desenvolvedor/Admin

- Acesso fixo e protegido com credenciais.  
- Controle total sobre turmas, cabeças e membros.  
- Congelamento, desbloqueio, exclusão de contas e turmas.  
- Auditoria e logs detalhados.  
- Gestão integrações Mercado Pago e API Carnaval.  
- Sistema de tickets e chatbot para suporte.  
- Monitoramento contínuo e manutenção.

***

## 4. Regras de Negócio

- Um único carnê anual por turma.  
- Membros aderem automaticamente via link personalizado.  
- Pagamento sequencial obrigatório.  
- Bloqueio para inadimplentes até regularização.  
- Cancelamento do carnê mantém históricos para transparência.  
- Congelamento da assinatura SaaS bloqueia turma e membros.  
- Comunicação ativa para evitar inadimplência e manter engajamento.

***

## 5. Plataforma e Integrações

- Supabase (backend, banco PostgreSQL, Auth, serverless, hosting).  
- Mercado Pago API para pagamentos OAuth.  
- API para consulta da data do Carnaval.  
- Supabase Functions para notificações e processos em background.

***

## 6. Usabilidade, Responsividade e Qualidade

- Interface amigável, limpa e acessível para qualquer nível técnico.  
- Totalmente responsivo para Android, iOS, tablets e desktops.  
- Testes automatizados (unitários, integração, UI).  
- Monitoramento e correção rápida de bugs silenciosos.  
- Layout consistente e sem quebras em múltiplos dispositivos.  
- Feedback visual claro para todas as interações.

***

## 7. Segurança

- RLS para isolamento de dados entre turmas e usuários.  
- Criptografia em transporte e armazenamento.  
- Controle rigoroso de acessos e autenticação.  
- Registro detalhado e monitoramento de atividades.  
- Backups periódicos automáticos.

***

## 8. Escalabilidade e Manutenção

- Arquitetura modular, escalável e cloud-native.  
- Atualizações sem impacto para os usuários.  
- Preparação para integração de futuras funcionalidades.

***

## 9. Estrutura Técnica Recomendada

### 9.1 Banco de Dados (Supabase PostgreSQL)

**Tabelas principais:**
- `users` - Usuários do sistema (cabeças e membros)
- `turmas` - Turmas de bate-bola
- `carne_anual` - Carnês anuais por turma
- `parcelas` - Parcelas do carnê
- `membros` - Membros das turmas
- `pagamentos` - Histórico de pagamentos
- `assinaturas_saas` - Assinaturas SaaS dos cabeças
- `logs_auditoria` - Logs de auditoria
- `tickets_suporte` - Sistema de tickets

### 9.2 Autenticação e Autorização

- Supabase Auth com RLS (Row Level Security)
- Políticas de acesso por tipo de usuário
- Sessões gerenciadas pelo Supabase

### 9.3 Integrações

- **Mercado Pago:** OAuth para pagamentos
- **API Carnaval:** Consulta de datas para vencimentos
- **Supabase Functions:** Processos em background e notificações

### 9.4 Frontend

- Framework moderno (React/Next.js recomendado)
- Design responsivo (mobile-first)
- Componentes reutilizáveis
- Estado global gerenciado

### 9.5 Testes

- Testes unitários (Jest/Vitest)
- Testes de integração
- Testes E2E (Playwright/Cypress)
- Testes de UI (Storybook)

***

## 10. Fluxos Principais

### 10.1 Fluxo do Cabeça da Turma

1. Cadastro/Login
2. Criação da turma
3. Configuração do carnê anual
4. Geração do link de convite
5. Monitoramento de membros e pagamentos
6. Gestão de inadimplentes
7. Relatórios e finalização

### 10.2 Fluxo do Membro

1. Acesso via link de convite
2. Cadastro simplificado
3. Visualização do carnê
4. Pagamento sequencial das parcelas
5. Recebimento de comprovantes
6. Notificações de vencimento

### 10.3 Fluxo do Desenvolvedor/Admin

1. Login com credenciais fixas
2. Dashboard administrativo
3. Gestão de turmas e usuários
4. Monitoramento do sistema
5. Suporte e resolução de tickets

***

## 11. Métricas e Monitoramento

- Taxa de conversão de membros
- Taxa de pagamento em dia
- Taxa de inadimplência
- Tempo médio de pagamento
- Engajamento dos usuários
- Performance do sistema
- Erros e exceções

***

## 12. Roadmap Futuro

- App mobile nativo (iOS/Android)
- Integração com outras formas de pagamento
- Sistema de recompensas e gamificação
- Comunicação em tempo real (chat)
- Relatórios avançados e analytics
- API pública para integrações

***

---

**Documento criado para:** Cursor IDE  
**Projeto:** Bate Boleiro Pay SaaS  
**Versão:** 1.0  
**Data:** 2024
