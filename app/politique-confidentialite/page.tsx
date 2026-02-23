import { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/animations/fade-in";

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "politique-confidentialite" },
    });
  } catch (error) {
    console.log("Database not available during build, using default metadata");
  }

  return {
    title:
      page?.metaTitle ||
      page?.title ||
      "Politique de confidentialité (RGPD) - L3M Holding",
    description:
      page?.metaDescription ||
      page?.description ||
      "L3M Holding veille à la sécurité et à la confidentialité de vos données. Découvrez comment nous protégeons vos informations personnelles.",
    keywords: page?.metaKeywords || undefined,
    openGraph: {
      title:
        page?.metaTitle ||
        page?.title ||
        "Politique de confidentialité (RGPD) - L3M Holding",
      description:
        page?.metaDescription ||
        page?.description ||
        "L3M Holding veille à la sécurité et à la confidentialité de vos données. Découvrez comment nous protégeons vos informations personnelles.",
    },
  };
}

export default async function PolitiqueConfidentialitePage() {
  return (
    <>
      <div className="min-h-screen bg-sand pt-20 lg:pt-0">
        <section className="py-24 lg:py-32 bg-sand">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
            <div className="max-w-5xl">
              <FadeIn>
                <div className="mb-16">
                  <h1 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                    Politique de protection des données personnelles (RGPD)
                  </h1>
                  <p className="font-serif text-xl lg:text-2xl leading-relaxed text-ink/80 font-light max-w-4xl">
                    L3M Holding veille à la sécurité et à la confidentialité de
                    vos données. Voici comment nous protégeons vos informations, en
                    toute transparence.
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-12">
                {/* Section 1 */}
                <FadeIn delay={0.1}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      1. Introduction
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      La protection de vos données personnelles et de votre vie
                      privée est fondamentale pour L3M Holding. Cette politique
                      vous informe de manière transparente sur la collecte,
                      l&apos;utilisation, le stockage et la protection de vos
                      données personnelles, conformément au Règlement Général sur
                      la Protection des Données (RGPD).
                    </p>
                  </div>
                </FadeIn>

                {/* Section 2 */}
                <FadeIn delay={0.2}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      2. Responsable du traitement
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-4">
                      Le responsable du traitement des données collectées sur ce
                      site est :
                    </p>
                    <div className="bg-white/50 rounded-lg p-6 border-l-2 border-accent/30">
                      <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/80 font-medium mb-2">
                        L3M Holding
                      </p>
                      <p className="font-sans text-base leading-relaxed text-ink/70">
                        123 Quartier Financier
                      </p>
                      <p className="font-sans text-base leading-relaxed text-ink/70">
                        75008 Paris, France
                      </p>
                      <p className="font-sans text-base leading-relaxed text-ink/70 mt-2">
                        Email :{" "}
                        <a
                          href="mailto:gestiondeprojets@l3m-holding.fr"
                          className="text-accent hover:underline"
                        >
                          gestiondeprojets@l3m-holding.fr
                        </a>
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* Section 3 */}
                <FadeIn delay={0.3}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      3. Données collectées
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-4">
                      Nous collectons les données personnelles suivantes :
                    </p>
                    <ul className="space-y-3 list-none">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Nom et prénom
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Adresse email
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Numéro de téléphone
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Informations professionnelles (poste, entreprise)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Données de navigation (cookies, pages visitées, durée de
                          la visite, etc.)
                        </span>
                      </li>
                    </ul>
                  </div>
                </FadeIn>

                {/* Section 4 */}
                <FadeIn delay={0.4}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      4. Finalités de traitement
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-4">
                      Vos données personnelles sont traitées pour les finalités
                      suivantes :
                    </p>
                    <ul className="space-y-3 list-none">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Répondre à vos demandes de contact ou de rendez-vous
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Élaborer des plans personnalisés
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Vous adresser des communications commerciales ou
                          informatives (avec votre consentement)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Améliorer notre site et votre expérience utilisateur
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Respecter nos obligations légales et réglementaires
                        </span>
                      </li>
                    </ul>
                  </div>
                </FadeIn>

                {/* Section 5 */}
                <FadeIn delay={0.5}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      5. Base légale du traitement
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-4">
                      Le traitement de vos données personnelles repose sur les
                      bases légales suivantes :
                    </p>
                    <ul className="space-y-3 list-none">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Votre consentement (formulaires, newsletters)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          L&apos;exécution de mesures précontractuelles ou
                          contractuelles
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Nos obligations légales
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Notre intérêt légitime à améliorer nos services
                        </span>
                      </li>
                    </ul>
                  </div>
                </FadeIn>

                {/* Section 6 */}
                <FadeIn delay={0.6}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      6. Durée de conservation
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-4">
                      Vos données personnelles sont conservées pour les durées
                      suivantes :
                    </p>
                    <ul className="space-y-3 list-none">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          <strong>3 ans</strong> pour les données liées aux
                          prospects
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          <strong>5 à 10 ans</strong> pour les données
                          contractuelles (selon obligations légales)
                        </span>
                      </li>
                    </ul>
                  </div>
                </FadeIn>

                {/* Section 7 */}
                <FadeIn delay={0.7}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      7. Destinataires des données
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Vos données personnelles sont destinées exclusivement à L3M
                      Holding et à nos prestataires techniques de confiance, qui
                      sont soumis à des obligations strictes de confidentialité
                      et de sécurité.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 8 */}
                <FadeIn delay={0.8}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      8. Vos droits
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-4">
                      Conformément au RGPD, vous disposez des droits suivants :
                    </p>
                    <ul className="space-y-3 list-none mb-6">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Droit d&apos;accès
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Droit de rectification
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Droit d&apos;opposition au traitement
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Droit à l&apos;effacement (« droit à l&apos;oubli »)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Droit à la limitation du traitement
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Droit à la portabilité
                        </span>
                      </li>
                    </ul>
                    <div className="bg-white/50 rounded-lg p-6 border-l-2 border-accent/30">
                      <p className="font-sans text-base leading-relaxed text-ink/70 mb-2">
                        Pour exercer ces droits, contactez-nous à :
                      </p>
                      <p className="font-sans text-base leading-relaxed text-ink/80 font-medium">
                        <a
                          href="mailto:info@l3m-holding.fr"
                          className="text-accent hover:underline"
                        >
                          info@l3m-holding.fr
                        </a>
                      </p>
                      <p className="font-sans text-sm leading-relaxed text-ink/60 mt-3">
                        Nous nous engageons à vous répondre dans un délai de 30
                        jours.
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* Section 9 */}
                <FadeIn delay={0.9}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      9. Sécurité des données
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Nous mettons en œuvre des mesures techniques et
                      organisationnelles appropriées pour garantir la
                      confidentialité, l&apos;intégrité et la disponibilité de
                      vos données personnelles.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 10 */}
                <FadeIn delay={1.0}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      10. Cookies
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-4">
                      Nous utilisons des cookies pour :
                    </p>
                    <ul className="space-y-3 list-none mb-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Améliorer votre expérience utilisateur
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Mesurer l&apos;audience du site
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="font-sans text-base leading-relaxed text-ink/70">
                          Assurer le bon fonctionnement du site
                        </span>
                      </li>
                    </ul>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Vous pouvez gérer vos préférences de cookies via la bannière
                      de cookies qui s&apos;affiche lors de votre première visite.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 11 */}
                <FadeIn delay={1.1}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      11. Mise à jour
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-4">
                      Cette politique peut être modifiée pour refléter
                      l&apos;évolution de notre site ou de la réglementation.
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-ink/60 italic">
                      Dernière mise à jour : 30/06/2025
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
