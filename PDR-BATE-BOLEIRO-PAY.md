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

## Próximos Passos

Posso ajudar você a estruturar o banco no Supabase, diagramas do fluxo do usuário e protótipos de tela para iniciar o desenvolvimento com clareza. Quer que siga por esse caminho?
