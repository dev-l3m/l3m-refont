import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@l3m-holding.net' },
    update: {},
    create: {
      email: 'admin@l3m-holding.net',
      password: hashedPassword,
      name: 'Administrateur',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created');

  // Create homepage
  const homepage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'L3M Holding - Investissement & Développement Stratégique',
      description: 'L3M Holding est une société d\'investissement et de développement stratégique, spécialisée dans l\'accompagnement de projets à fort potentiel.',
      metaTitle: 'L3M Holding - Investissement & Développement Stratégique',
      metaDescription: 'L3M Holding accompagne les entreprises dans leur développement stratégique. Expertise en investissement, conseil et croissance.',
      metaKeywords: 'holding, investissement, développement stratégique, conseil, croissance entreprise',
      published: true,
    },
  });

  // Create homepage sections
  const heroSection = await prisma.section.create({
    data: {
      pageId: homepage.id,
      type: 'hero',
      title: 'L3M Holding',
      subtitle: 'Investissement & Développement Stratégique',
      content: 'Nous accompagnons les entreprises dans leur développement et leur croissance à travers une approche stratégique et un investissement ciblé.',
      order: 0,
      visible: true,
    },
  });

  const aboutSection = await prisma.section.create({
    data: {
      pageId: homepage.id,
      type: 'about',
      title: 'À propos du Groupe',
      subtitle: 'Notre Vision',
      content: 'L3M Holding est une société d\'investissement et de développement stratégique qui accompagne les entreprises dans leur croissance. Nous combinons expertise sectorielle, vision stratégique et accompagnement opérationnel pour créer de la valeur durable.',
      order: 1,
      visible: true,
    },
  });

  // Create metrics
  const metrics = [
    { label: 'Années d\'expérience', value: '15', suffix: '+', description: 'd\'expertise en investissement stratégique' },
    { label: 'Filiales', value: '8', suffix: '', description: 'entreprises dans notre portefeuille' },
    { label: 'Investissements', value: '50', suffix: 'M€', description: 'de capital investi' },
    { label: 'Croissance moyenne', value: '25', suffix: '%', description: 'par an sur les 5 dernières années' },
  ];

  for (const [index, metric] of metrics.entries()) {
    await prisma.metric.create({
      data: {
        label: metric.label,
        value: metric.value,
        suffix: metric.suffix,
        description: metric.description,
        order: index,
        visible: true,
      },
    });
  }
  console.log('✅ Metrics created');

  // Create site settings
  const settings = [
    { key: 'site_name', value: 'L3M Holding', type: 'text' },
    { key: 'site_description', value: 'Investissement & Développement Stratégique', type: 'text' },
    { key: 'contact_email', value: 'contact@l3m-holding.net', type: 'text' },
    { key: 'contact_phone', value: '+33 1 XX XX XX XX', type: 'text' },
    { key: 'contact_address', value: 'Paris, France', type: 'text' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/l3m-holding', type: 'text' },
    { key: 'social_twitter', value: 'https://twitter.com/l3mholding', type: 'text' },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('✅ Site settings created');

  // Create other pages
  const pages = [
    {
      slug: 'groupe',
      title: 'Le Groupe L3M',
      description: 'Découvrez l\'histoire, la vision et les valeurs du groupe L3M Holding.',
      metaTitle: 'Le Groupe L3M - L3M Holding',
      metaDescription: 'Découvrez l\'histoire, la vision et les valeurs du groupe L3M Holding.',
    },
    {
      slug: 'expertises',
      title: 'Nos Expertises',
      description: 'Découvrez nos domaines d\'expertise en investissement et développement stratégique.',
      metaTitle: 'Nos Expertises - L3M Holding',
      metaDescription: 'Découvrez nos domaines d\'expertise en investissement et développement stratégique.',
    },
    {
      slug: 'filiales',
      title: 'Nos Filiales',
      description: 'Découvrez les entreprises de notre portefeuille.',
      metaTitle: 'Nos Filiales - L3M Holding',
      metaDescription: 'Découvrez les entreprises de notre portefeuille.',
    },
    {
      slug: 'actualites',
      title: 'Actualités',
      description: 'Restez informé des dernières actualités du groupe L3M Holding.',
      metaTitle: 'Actualités - L3M Holding',
      metaDescription: 'Restez informé des dernières actualités du groupe L3M Holding.',
    },
    {
      slug: 'contact',
      title: 'Contact',
      description: 'Contactez-nous pour discuter de vos projets d\'investissement.',
      metaTitle: 'Contact - L3M Holding',
      metaDescription: 'Contactez-nous pour discuter de vos projets d\'investissement.',
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: {
        ...page,
        published: true,
      },
    });
  }
  console.log('✅ Pages created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
