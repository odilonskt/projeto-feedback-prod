#!/bin/bash

# Helper para versionamento de mono-repo
function version_packages() {
  echo "Atualizando versões para release $1"
  
  # Atualizar package.json do root
  npm version $1 --no-git-tag-version
  
  # Atualizar packages (usando lerna ou manualmente)
  cd packages/backend && npm version $1 --no-git-tag-version
  cd ../frontend && npm version $1 --no-git-tag-version
  cd ../shared && npm version $1 --no-git-tag-version
  
  echo "Versões atualizadas para $1"
}

# Helper para criar changelog
function generate_changelog() {
  echo "# Changelog" > CHANGELOG.md
  echo "" >> CHANGELOG.md
  git log --oneline --decorate --graph >> CHANGELOG.md
  echo "Changelog gerado em CHANGELOG.md"
}