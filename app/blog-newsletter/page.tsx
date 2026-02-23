import { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { BlogNewsletterForm } from "@/components/newsletter/blog-newsletter-form";
import { FadeIn } from "@/components/animations/fade-in";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "blog-newsletter" },
    });
  } catch (error) {
    console.log("Database not available during build, using default metadata");
  }

  return {
    title:
      page?.metaTitle ||
      page?.title ||
      "Blog & Newsletter - L3M Holding",
    description:
      page?.metaDescription ||
      page?.description ||
      "Restez informé des tendances et projets L3M Holding. Abonnez-vous à notre newsletter pour une veille stratégique sur l'investissement et l'innovation.",
    keywords: page?.metaKeywords || undefined,
    openGraph: {
      title:
        page?.metaTitle ||
        page?.title ||
        "Blog & Newsletter - L3M Holding",
      description:
        page?.metaDescription ||
        page?.description ||
        "Restez informé des tendances et projets L3M Holding. Abonnez-vous à notre newsletter pour une veille stratégique sur l'investissement et l'innovation.",
    },
  };
}

export default async function BlogNewsletterPage() {

  return (
    <>
      <div className="min-h-screen bg-sand pt-20 lg:pt-0">
        <section className="py-24 lg:py-32 bg-sand">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <div className="bg-white rounded-lg border-t-4 border-accent shadow-sm p-8 lg:p-12">
                  {/* Titre principal */}
                  <h1 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-6 text-center">
                    Restez informé des tendances et projets L3M Holding
                  </h1>

                  {/* Paragraphe d'introduction */}
                  <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-8 text-center">
                    Notre blog vous propose une veille stratégique sur
                    l&apos;investissement et l&apos;innovation. Ne manquez rien :
                    abonnez-vous dès maintenant.
                  </p>

                  {/* Section "Dans notre rubrique" */}
                  <FadeIn delay={0.1}>
                    <div className="mb-10">
                      <h2 className="font-serif text-xl lg:text-2xl font-medium text-ink leading-tight mb-6">
                        Dans notre rubrique :
                      </h2>
                      <ul className="space-y-4 list-none">
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span className="font-sans text-base leading-relaxed text-ink/70">
                            Décryptages des marchés financiers et sectoriels
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span className="font-sans text-base leading-relaxed text-ink/70">
                            Retours d&apos;expérience sur nos projets
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span className="font-sans text-base leading-relaxed text-ink/70">
                            Zoom sur nos engagements RSE et partenariats
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span className="font-sans text-base leading-relaxed text-ink/70">
                            Conseils d&apos;experts pour optimiser votre stratégie
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span className="font-sans text-base leading-relaxed text-ink/70">
                            Vie de l&apos;entreprise, événements, interviews
                          </span>
                        </li>
                      </ul>
                    </div>
                  </FadeIn>

                  {/* Appel à l'action */}
                  <FadeIn delay={0.2}>
                    <div className="mb-8">
                      <p className="font-serif text-xl lg:text-2xl font-medium text-ink leading-relaxed text-center">
                        Rejoignez notre newsletter exclusive.
                      </p>
                    </div>
                  </FadeIn>

                  {/* Formulaire d'inscription */}
                  <FadeIn delay={0.3}>
                    <BlogNewsletterForm />
                  </FadeIn>

                  {/* Texte de confidentialité */}
                  <FadeIn delay={0.4}>
                    <p className="font-sans text-sm leading-relaxed text-ink/60 text-center">
                      Nous respectons votre vie privée. Désinscription possible à
                      tout moment.
                    </p>
                  </FadeIn>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
