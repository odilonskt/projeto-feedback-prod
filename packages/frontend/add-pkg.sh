#!/bin/bash
# Script SIMPLES para adicionar pacotes
# Uso: ./add-pkg.sh <pacote> [backend|frontend|both]

PKG=$1
TARGET=${2:-both}  # padrão: ambos

echo "📦 Adicionando: $PKG"

if [ "$TARGET" = "backend" ] || [ "$TARGET" = "both" ]; then
  echo "→ Backend"
  cd packages/backend && bun add "$PKG"
fi

if [ "$TARGET" = "frontend" ] || [ "$TARGET" = "both" ]; then
  echo "→ Frontend"
  cd packages/frontend && bun add "$PKG"
fi

echo "✅ Concluído!"
