#!/bin/bash

echo "🔧 Corrigindo problemas do Git..."

# 1. Remover Gits internos
echo "🗑️  Removendo submódulos Git..."
find . -name ".git" -type d ! -path "./.git" | xargs rm -rf

# 2. Reinicializar se necessário
if [ ! -d ".git" ]; then
    echo "🔄 Inicializando Git..."
    git init
fi

# 3. Configurar gitignore
echo "📄 Configurando .gitignore..."
cat > .gitignore << 'GITIGNORE'
node_modules/
.next/
dist/
.env
*.log
.DS_Store
.vscode/
bun.lockb
GITIGNORE

# 4. Adicionar arquivos
echo "📦 Adicionando arquivos..."
git add .

# 5. Commit
echo "💾 Criando commit..."
git commit -m "🎉 Initial commit" || echo "⚠️  Nada para commitar"

echo "✅ Concluído!"
echo "🌿 Status:"
git status
