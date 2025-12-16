#!/bin/bash

if [ -z "$1" ]; then
  echo "Uso: ./install-in-all.sh <package-name>"
  echo "Exemplo: ./install-in-all.sh lodash"
  exit 1
fi

echo "📦 Instalando $1 em todos os packages..."

for package in packages/*/; do
  if [ -f "$package/package.json" ]; then
    echo "→ Instalando em $package"
    (cd "$package" && bun add "$1")
  fi
done

echo "✅ Concluído!"
