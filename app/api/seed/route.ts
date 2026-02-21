import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Vérifier une clé secrète pour sécuriser l'endpoint (optionnel mais recommandé)
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.SEED_SECRET_TOKEN;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: "Non autorisé. Fournissez un token valide dans l'en-tête Authorization: Bearer <token>" },
        { status: 401 }
      );
    }

    // Vérifier si le seed a déjà été exécuté
    const existingUser = await prisma.user.findFirst();
    if (existingUser && !request.headers.get("x-force-seed")) {
      return NextResponse.json(
        { 
          message: "Le seed a déjà été exécuté. Utilisez x-force-seed: true pour forcer.",
          alreadySeeded: true 
        },
        { status: 200 }
      );
    }

    // Exécuter le seed directement
    console.log("🌱 Starting seed via API...");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.upsert({
      where: { email: "admin@l3m-holding.net" },
      update: {},
      create: {
        email: "admin@l3m-holding.net",
        password: hashedPassword,
        name: "Administrateur",
        role: "admin",
      },
    });

    // Create homepage
    const homepage = await prisma.page.upsert({
      where: { slug: "home" },
      update: {},
      create: {
        slug: "home",
        title: "L3M Holding - Investissement & Développement Stratégique",
        description: "L3M Holding est une société d'investissement et de développement stratégique, spécialisée dans l'accompagnement de projets à fort potentiel.",
        metaTitle: "L3M Holding - Investissement & Développement Stratégique",
        metaDescription: "L3M Holding accompagne les entreprises dans leur développement stratégique. Expertise en investissement, conseil et croissance.",
        metaKeywords: "holding, investissement, développement stratégique, conseil, croissance entreprise",
        published: true,
      },
    });

    // Create homepage sections (skip if exist)
    const existingHeroSection = await prisma.section.findFirst({
      where: { pageId: homepage.id, type: "hero" },
    });

    if (!existingHeroSection) {
      await prisma.section.create({
        data: {
          pageId: homepage.id,
          type: "hero",
          title: "L3M Holding",
          subtitle: "Investissement & Développement Stratégique",
          content: "Nous accompagnons les entreprises dans leur développement et leur croissance à travers une approche stratégique et un investissement ciblé.",
          order: 0,
          visible: true,
        },
      });
    }

    const existingAboutSection = await prisma.section.findFirst({
      where: { pageId: homepage.id, type: "about" },
    });

    if (!existingAboutSection) {
      await prisma.section.create({
        data: {
          pageId: homepage.id,
          type: "about",
          title: "À propos du Groupe",
          subtitle: "Notre Vision",
          content: "L3M Holding est une société d'investissement et de développement stratégique qui accompagne les entreprises dans leur croissance. Nous combinons expertise sectorielle, vision stratégique et accompagnement opérationnel pour créer de la valeur durable.",
          order: 1,
          visible: true,
        },
      });
    }

    // Create metrics (skip if exist)
    const existingMetricsCount = await prisma.metric.count();
    if (existingMetricsCount === 0) {
      const metrics = [
        { label: "Années d'expérience", value: "15", suffix: "+", description: "d'expertise en investissement stratégique" },
        { label: "Filiales", value: "8", suffix: "", description: "entreprises dans notre portefeuille" },
        { label: "Investissements", value: "50", suffix: "M€", description: "de capital investi" },
        { label: "Croissance moyenne", value: "25", suffix: "%", description: "par an sur les 5 dernières années" },
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
    }

    // Create site settings
    const settings = [
      { key: "site_name", value: "L3M Holding", type: "text" },
      { key: "site_description", value: "Investissement & Développement Stratégique", type: "text" },
      { key: "contact_email", value: "contact@l3m-holding.net", type: "text" },
      { key: "contact_phone", value: "+33 1 XX XX XX XX", type: "text" },
      { key: "contact_address", value: "Paris, France", type: "text" },
      { key: "social_linkedin", value: "https://linkedin.com/company/l3m-holding", type: "text" },
      { key: "social_facebook", value: "https://www.facebook.com/profile.php?id=61578880743766&mibextid=LQQJ4d&rdid=vGfzFPoBDvYdP2Sk&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F192gpE1Hej%2F%3Fmibextid%3DLQQJ4d#", type: "text" },
    ];

    for (const setting of settings) {
      await prisma.siteSettings.upsert({
        where: { key: setting.key },
        update: {},
        create: setting,
      });
    }

    // Create other pages
    const pages = [
      {
        slug: "groupe",
        title: "Le Groupe L3M",
        description: "Découvrez l'histoire, la vision et les valeurs du groupe L3M Holding.",
        metaTitle: "Le Groupe L3M - L3M Holding",
        metaDescription: "Découvrez l'histoire, la vision et les valeurs du groupe L3M Holding.",
      },
      {
        slug: "expertises",
        title: "Nos Expertises",
        description: "Découvrez nos domaines d'expertise en investissement et développement stratégique.",
        metaTitle: "Nos Expertises - L3M Holding",
        metaDescription: "Découvrez nos domaines d'expertise en investissement et développement stratégique.",
      },
      {
        slug: "filiales",
        title: "Nos Filiales",
        description: "Découvrez les entreprises de notre portefeuille.",
        metaTitle: "Nos Filiales - L3M Holding",
        metaDescription: "Découvrez les entreprises de notre portefeuille.",
      },
      {
        slug: "actualites",
        title: "Actualités",
        description: "Restez informé des dernières actualités du groupe L3M Holding.",
        metaTitle: "Actualités - L3M Holding",
        metaDescription: "Restez informé des dernières actualités du groupe L3M Holding.",
      },
      {
        slug: "contact",
        title: "Contact",
        description: "Contactez-nous pour discuter de vos projets d'investissement.",
        metaTitle: "Contact - L3M Holding",
        metaDescription: "Contactez-nous pour discuter de vos projets d'investissement.",
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

    return NextResponse.json({
      success: true,
      message: "Seed exécuté avec succès",
      data: {
        adminUser: admin.email,
        pagesCreated: pages.length + 1,
        settingsCreated: settings.length,
      },
    });
  } catch (error) {
    console.error("Error running seed:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de l'exécution du seed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// GET pour vérifier si le seed a déjà été exécuté
export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    
    // Vérifier si des données existent déjà
    const userCount = await prisma.user.count();
    const pageCount = await prisma.page.count();
    const settingsCount = await prisma.siteSettings.count();

    return NextResponse.json({
      seeded: userCount > 0 || pageCount > 0 || settingsCount > 0,
      counts: {
        users: userCount,
        pages: pageCount,
        settings: settingsCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la vérification" },
      { status: 500 }
    );
  }
}
