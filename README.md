# Projeto Feedback Prod 🚀

Sistema de feedback full-stack com Next.js (frontend) e NestJS (backend) em mono-repo.

## 🏗️ Estrutura do Projeto

## 🚀 Começando

### Pré-requisitos

- Bun >= 1.3.4
- Node.js >= 18
- Docker (opcional)

### Instalação

```bash
# Clonar repositório
git clone <seu-repositorio>

# Instalar dependências
bun install

# Instalar em todos os pacotes
bun run install:all
```

# Iniciar backend e frontend

bun run dev

# Ou individualmente

bun run dev:backend
bun run dev:frontend
Build

# Build de produção

bun run build

# Iniciar em produção

bun run start

🔗 URLs
Frontend: http://localhost:3000

Backend API: http://localhost:3001

📦 Scripts Disponíveis
Comando Descrição
bun run dev Inicia ambos em desenvolvimento
bun run build Build de todos os pacotes
bun run start Inicia em modo produção
bun run clean Limpa caches e builds
bun run backend:add Instala pacote no backend
bun run frontend:add Instala pacote no frontend
🐳 Docker
bash

# Iniciar com Docker

docker-compose up

# Build das imagens

docker-compose build
