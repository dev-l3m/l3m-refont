import { Metadata } from "next";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "faq" },
    });
  } catch (error) {
    console.log("Database not available during build, using default metadata");
  }

  return {
    title: page?.metaTitle || page?.title || "FAQ - L3M Holding",
    description:
      page?.metaDescription ||
      page?.description ||
      "Retrouvez ici les réponses aux questions les plus fréquentes sur L3M Holding.",
    keywords: page?.metaKeywords || undefined,
    openGraph: {
      title: page?.metaTitle || page?.title || "FAQ - L3M Holding",
      description:
        page?.metaDescription ||
        page?.description ||
        "Retrouvez ici les réponses aux questions les plus fréquentes sur L3M Holding.",
    },
  };
}

export default async function FAQPage() {
  // Données FAQ basées sur l'image fournie
  const faqItems = [
    {
      question: "À qui s'adresse L3M Holding ?",
      answer:
        "Nous accompagnons les investisseurs institutionnels, particuliers, entreprises et fintechs en quête de solutions d'investissement sur mesure.",
    },
    {
      question: "Où êtes-vous implantés ?",
      answer:
        "Nous sommes présents dans 10 villes françaises et dans 3 hubs internationaux (Australie, Maroc, Madagascar).",
    },
    {
      question: "Proposez-vous un accompagnement personnalisé ?",
      answer:
        "Oui. Chaque client bénéficie d'un plan stratégique sur mesure, conçu selon son profil, ses objectifs et son horizon d'investissement.",
    },
    {
      question: "Comment prendre rendez-vous avec un expert ?",
      answer:
        'Vous pouvez remplir notre formulaire en ligne sur la page "Demander un rendez-vous". Un conseiller vous contactera sous 48h.',
    },
    {
      question: "Est-ce que mes données sont sécurisées ?",
      answer:
        "Absolument. Nous respectons les exigences du RGPD. Consultez notre politique de confidentialité pour plus de détails.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-sand pt-20 lg:pt-0">
        <FAQ
          title="FAQ"
          subtitle="Retrouvez ici les réponses aux questions les plus fréquentes."
          items={faqItems}
        />
      </div>
      <Footer />
    </>
  );
}
