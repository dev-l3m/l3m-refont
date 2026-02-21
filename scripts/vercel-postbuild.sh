#!/bin/bash
set -e

echo "🚀 Running post-build tasks for Vercel..."

# Exécuter les migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

# Exécuter le seed uniquement si la variable RUN_SEED est définie
if [ "$RUN_SEED" = "true" ]; then
  echo "🌱 Running database seed..."
  npm run db:seed
else
  echo "⏭️  Skipping seed (set RUN_SEED=true to enable)"
fi

echo "✅ Post-build tasks completed!"
