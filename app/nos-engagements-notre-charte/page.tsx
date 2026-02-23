import { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/animations/fade-in";

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "nos-engagements-notre-charte" },
    });
  } catch (error) {
    console.log("Database not available during build, using default metadata");
  }

  return {
    title:
      page?.metaTitle ||
      page?.title ||
      "Nos engagements & Notre charte - L3M Holding",
    description:
      page?.metaDescription ||
      page?.description ||
      "Chez L3M Holding, nos actions reposent sur une charte d'engagement claire, éthique et durable. Découvrez nos engagements en faveur d'un investissement responsable.",
    keywords: page?.metaKeywords || undefined,
    openGraph: {
      title:
        page?.metaTitle ||
        page?.title ||
        "Nos engagements & Notre charte - L3M Holding",
      description:
        page?.metaDescription ||
        page?.description ||
        "Chez L3M Holding, nos actions reposent sur une charte d'engagement claire, éthique et durable. Découvrez nos engagements en faveur d'un investissement responsable.",
    },
  };
}

export default async function NosEngagementsPage() {
  return (
    <>
      <div className="min-h-screen bg-sand pt-20 lg:pt-0">
        <section className="py-24 lg:py-32 bg-sand">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
            <div className="max-w-5xl">
              <FadeIn>
                <div className="mb-16">
                  <h1 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                    Nos engagements & Notre charte
                  </h1>
                  <p className="font-serif text-xl lg:text-2xl leading-relaxed text-ink/90 font-semibold mb-8">
                    Une ambition : l&apos;investissement au service du progrès
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-8">
                {/* Introduction */}
                <FadeIn delay={0.1}>
                  <div className="space-y-6">
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Chez L3M Holding, nos actions reposent sur une charte
                      d&apos;engagement claire, éthique et durable.
                    </p>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                      Nous croyons qu&apos;un investissement performant peut – et
                      doit – être responsable.
                    </p>
                  </div>
                </FadeIn>

                {/* Engagements clés */}
                <FadeIn delay={0.2}>
                  <div className="mt-12">
                    <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink leading-tight mb-8">
                      Nos engagements clés :
                    </h2>
                    <ul className="space-y-6 list-none">
                      <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                        <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                          Favoriser une croissance durable, conforme aux critères
                          ESG.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                        <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                          Soutenir l&apos;innovation à impact, notamment via notre
                          implication RSE et nos partenariats associatifs.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                        <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                          Promouvoir l&apos;inclusion, la diversité et
                          l&apos;égalité des chances au sein de notre écosystème.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                        <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                          Agir avec transparence, intégrité et exigence dans chaque
                          mission confiée.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                        <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70">
                          Réduire notre empreinte environnementale en interne et chez
                          nos partenaires.
                        </p>
                      </li>
                    </ul>
                  </div>
                </FadeIn>

                {/* Conclusion */}
                <FadeIn delay={0.3}>
                  <div className="mt-16 pt-8 border-t border-rail-dark/30">
                    <p className="font-serif text-2xl lg:text-3xl font-semibold text-ink leading-relaxed text-center">
                      Chez L3M, performance et responsabilité progressent
                      ensemble.
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
