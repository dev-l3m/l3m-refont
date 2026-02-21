#!/usr/bin/env node

/**
 * Script postbuild pour Vercel
 * Exécute les migrations Prisma si la base de données est accessible
 * Ne fait pas échouer le build si la DB n'est pas disponible (normal en CI/CD)
 */

const { execSync } = require('child_process');

console.log('🚀 Running post-build migrations...');

try {
  // Vérifier si DATABASE_URL est définie
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL not set, skipping migrations');
    process.exit(0);
  }

  // Exécuter les migrations
  console.log('📦 Running prisma migrate deploy...');
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: process.env,
  });
  
  console.log('✅ Migrations completed successfully');
} catch (error) {
  // Si la DB n'est pas accessible (normal en CI/CD), on continue
  if (error.message && (
    error.message.includes("Can't reach database server") ||
    error.message.includes("P1001") ||
    error.message.includes("ECONNREFUSED")
  )) {
    console.log('⚠️  Database not available during build (this is normal in CI/CD)');
    console.log('📝 Migrations will be run automatically on first deployment');
    process.exit(0);
  }
  
  // Autres erreurs : on les propage
  console.error('❌ Error running migrations:', error.message);
  process.exit(1);
}
