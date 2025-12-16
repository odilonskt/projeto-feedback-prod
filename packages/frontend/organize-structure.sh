#!/bin/bash

echo "🧹 Organizando estrutura com src/..."

# Criar src se não existir
mkdir -p src

# Mover diretórios para src se existirem
[ -d "app" ] && mv app src/
[ -d "public" ] && mv public src/
[ -d "components" ] && mv components src/ 2>/dev/null || true
[ -d "lib" ] && mv lib src/ 2>/dev/null || true
[ -d "utils" ] && mv utils src/ 2>/dev/null || true

# Atualizar tsconfig.json
echo '{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./src/*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}' > tsconfig.json

# Atualizar tailwind.config.ts se existir
if [ -f "tailwind.config.ts" ]; then
  sed -i "s|'./app/|'./src/app/|g" tailwind.config.ts
  sed -i "s|'./pages/|'./src/pages/|g" tailwind.config.ts
  sed -i "s|'./components/|'./src/components/|g" tailwind.config.ts
fi

echo "✅ Estrutura organizada em src/"
echo "📁 Nova estrutura:"
find src/ -type f | head -20
