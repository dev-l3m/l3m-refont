import { Metadata } from "next";
import { EditorialHero } from "@/components/home/editorial-hero";
import { About } from "@/components/sections/about";
import { Partners } from "@/components/sections/partners";
import { Mission } from "@/components/sections/mission";
import { Collaborators } from "@/components/sections/collaborators";
import { AdnL3mHolding } from "@/components/sections/adn-l3m-holding";
import { Joinus } from "@/components/sections/joinus";
import { Contact as ContactSection } from "@/components/sections/contact";
import { Metrics } from "@/components/sections/metrics";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { StickyCta } from "@/components/ui/sticky-cta";
import { prisma } from "@/lib/prisma";
import { L3M_CONTENT } from "@/src/content/l3m-legacy-content";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({
    where: { slug: 'home' },
  });

  return {
    title: page?.metaTitle || page?.title,
    description: page?.metaDescription || page?.description || undefined,
    keywords: page?.metaKeywords || undefined,
    openGraph: {
      title: page?.metaTitle || page?.title,
      description: page?.metaDescription || page?.description || undefined,
      images: page?.ogImage ? [page.ogImage] : [],
    },
  };
}

export default async function HomePage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: {
      sections: {
        where: { visible: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  const heroSection = page?.sections.find(s => s.type === 'hero');
  const aboutSection = page?.sections.find(s => s.type === 'about');

  // Utiliser le contenu legacy pour le hero
  const heroTitle = L3M_CONTENT.home.hero.lines.join(" ");
  const heroSubtitle = L3M_CONTENT.home.hero.paragraph;
  const heroContent = L3M_CONTENT.home.hero.bullets;

  return (
    <>
      <EditorialHero
        title={heroTitle}
        subtitle={heroSubtitle}
        content={heroContent}
      />
      <About
        title={L3M_CONTENT.home.intro.title}
        subtitle={undefined}
        content={L3M_CONTENT.home.intro.paragraphs.join(" ")}
      />
      <Partners
        title={L3M_CONTENT.home.partners.title}
        text={L3M_CONTENT.home.partners.text}
      />
      <Mission
        title={L3M_CONTENT.home.missions.title}
        text={L3M_CONTENT.home.missions.text}
      />
      <Collaborators
        title={L3M_CONTENT.home.collaborators.title}
        text={L3M_CONTENT.home.collaborators.text}
        benefits={[...L3M_CONTENT.home.collaborators.benefits]}
        cards={[...L3M_CONTENT.home.collaborators.cards]}
      />
      <AdnL3mHolding
        title={L3M_CONTENT.home.adnL3mHolding.title}
        text={L3M_CONTENT.home.adnL3mHolding.text}
        cards={L3M_CONTENT.home.adnL3mHolding.cards.map(card => ({
          ...card,
          items: [...card.items],
        }))}
      />
      <Joinus
        title={L3M_CONTENT.home.joinus.title}
        text={L3M_CONTENT.home.joinus.text}
      />
      <Metrics />
      <ContactSection
        title={L3M_CONTENT.contact.title}
        subtitle={L3M_CONTENT.contact.subtitle}
        emailLabel={L3M_CONTENT.contact.emailLabel}
        email={L3M_CONTENT.contact.email}
        phoneLabel={L3M_CONTENT.contact.phoneLabel}
        phone={L3M_CONTENT.contact.phone}
        addressLabel={L3M_CONTENT.contact.addressLabel}
        address={[...L3M_CONTENT.contact.address]}
      />
      <ScrollToTop />
      <StickyCta />
      <Footer />
     
    </>
  );
}
