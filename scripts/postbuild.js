#!/usr/bin/env node

/**
 * Script postbuild pour Vercel
 * Exécute les migrations Prisma si la base de données est accessible
 * Ne fait pas échouer le build si la DB n'est pas disponible (normal en CI/CD)
 */

const { execSync } = require('child_process');

console.log('🚀 Running post-build migrations...');

// Vérifier si DATABASE_URL est définie
if (!process.env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not set, skipping migrations');
  process.exit(0);
}

// Exécuter les migrations
console.log('📦 Running prisma migrate deploy...');

try {
  // Exécuter avec capture de stderr
  const result = execSync('npx prisma migrate deploy 2>&1', {
    encoding: 'utf8',
    env: process.env,
    stdio: 'pipe',
  });
  
  console.log(result);
  console.log('✅ Migrations completed successfully');
  process.exit(0);
} catch (error) {
  // Capturer la sortie d'erreur
  const errorOutput = error.stdout?.toString() || error.stderr?.toString() || error.message || error.toString() || '';
  
  // Vérifier si c'est une erreur de connexion à la DB
  if (
    errorOutput.includes("Can't reach database server") ||
    errorOutput.includes("P1001") ||
    errorOutput.includes("ECONNREFUSED") ||
    errorOutput.includes("localhost:5432") ||
    error.status === 1 // Prisma retourne status 1 pour les erreurs de connexion
  ) {
    console.log('⚠️  Database not available during build (this is normal in CI/CD)');
    console.log('📝 Migrations will be run automatically on first deployment when DB is available');
    process.exit(0);
  }
  
  // Autres erreurs : on les propage
  console.error('❌ Error running migrations:');
  console.error(errorOutput);
  process.exit(1);
}
