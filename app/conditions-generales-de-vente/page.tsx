import { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/animations/fade-in";

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "conditions-generales-de-vente" },
    });
  } catch (error) {
    console.log("Database not available during build, using default metadata");
  }

  return {
    title:
      page?.metaTitle ||
      page?.title ||
      "Conditions Générales de Vente (CGV) - L3M Holding",
    description:
      page?.metaDescription ||
      page?.description ||
      "Veuillez prendre connaissance de nos conditions générales de vente pour mieux encadrer nos relations commerciales.",
    keywords: page?.metaKeywords || undefined,
    openGraph: {
      title:
        page?.metaTitle ||
        page?.title ||
        "Conditions Générales de Vente (CGV) - L3M Holding",
      description:
        page?.metaDescription ||
        page?.description ||
        "Veuillez prendre connaissance de nos conditions générales de vente pour mieux encadrer nos relations commerciales.",
    },
  };
}

export default async function ConditionsGeneralesVentePage() {
  return (
    <>
      <div className="min-h-screen bg-sand pt-20 lg:pt-0">
        <section className="py-24 lg:py-32 bg-sand">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
            <div className="max-w-5xl">
              <FadeIn>
                <div className="mb-16">
                  <h1 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                    Conditions Générales de Vente
                  </h1>
                  <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                    Veuillez prendre connaissance de nos conditions de vente pour
                    mieux encadrer nos relations commerciales.
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-12">
                {/* Section 1 */}
                <FadeIn delay={0.1}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      1. Objet
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Les présentes Conditions Générales de Vente (CGV) encadrent
                      les relations commerciales entre L3M Holding et ses clients,
                      dans le cadre de la fourniture de services de conseil,
                      d&apos;accompagnement stratégique et de solutions
                      d&apos;investissement.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 2 */}
                <FadeIn delay={0.2}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      2. Services proposés
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      L3M Holding fournit des prestations personnalisées, selon les
                      besoins définis conjointement avec le client. Toute commande
                      fait l&apos;objet d&apos;un devis validé par écrit.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 3 */}
                <FadeIn delay={0.3}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      3. Prix et modalités de paiement
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Les tarifs sont indiqués hors taxes, sauf mention contraire.
                      Le paiement s&apos;effectue selon les conditions précisées
                      dans le devis : acompte à la commande, solde à réception de
                      facture, sauf accord spécifique.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 4 */}
                <FadeIn delay={0.4}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      4. Délais et livrables
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Les délais d&apos;exécution sont précisés lors de la
                      commande. Tout retard dû à un cas de force majeure ne pourra
                      entraîner l&apos;annulation de la commande ni indemnité.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 5 */}
                <FadeIn delay={0.5}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      5. Responsabilité
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      L3M Holding s&apos;engage à fournir les prestations avec
                      diligence, mais ne saurait être tenu responsable des décisions
                      prises par le client sur la base des recommandations
                      fournies.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 6 */}
                <FadeIn delay={0.6}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      6. Données personnelles
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Les données collectées sont traitées conformément à notre{" "}
                      <a
                        href="/politique-confidentialite"
                        className="text-accent hover:underline"
                      >
                        politique de confidentialité
                      </a>
                      . Le client peut à tout moment demander leur accès,
                      rectification ou suppression.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 7 */}
                <FadeIn delay={0.7}>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-4">
                      7. Litiges
                    </h2>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      En cas de litige, une solution amiable sera recherchée en
                      priorité. À défaut, les tribunaux compétents seront ceux du
                      siège social de L3M Holding.
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
