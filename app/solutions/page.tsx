import { Metadata } from "next";
import { FadeIn } from "@/components/animations/fade-in";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { prisma } from "@/lib/prisma";
import { L3M_SOLUTIONS_CONTENT } from "@/src/content/l3m-solutions-legacy";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SolutionsCtaButton } from "@/components/solutions-cta-button";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({
    where: { slug: 'solutions' },
  });

  return {
    title: page?.metaTitle || page?.title || L3M_SOLUTIONS_CONTENT.header.title,
    description: page?.metaDescription || page?.description || L3M_SOLUTIONS_CONTENT.vision.text,
    keywords: page?.metaKeywords,
  };
}

export default async function SolutionsPage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'solutions' },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center bg-sand pt-20 lg:pt-0">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-32">
          <FadeIn>
            <div className="max-w-5xl">
              <h1 className="font-serif text-hero font-medium text-ink leading-[1.05] tracking-tight mb-8">
                {L3M_SOLUTIONS_CONTENT.header.title}
              </h1>
              <div className="space-y-6 font-sans text-lg lg:text-xl text-ink/80 leading-relaxed max-w-4xl">
                {L3M_SOLUTIONS_CONTENT.header.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 lg:py-32 bg-sand-light">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl">
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                {L3M_SOLUTIONS_CONTENT.vision.title}
              </h2>
              <p className="font-sans text-lg leading-relaxed text-ink/70 mb-8 max-w-4xl">
                {L3M_SOLUTIONS_CONTENT.vision.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <p className="font-serif text-xl text-ink/90 font-light">
                  {L3M_SOLUTIONS_CONTENT.vision.ctaText}
                </p>
                <SolutionsCtaButton text={L3M_SOLUTIONS_CONTENT.vision.ctaAction} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-24 lg:py-32 bg-sand">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl mb-12">
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-4">
                {L3M_SOLUTIONS_CONTENT.domains.title}
              </h2>
              <p className="font-sans text-lg text-ink/70 mb-8">
                {L3M_SOLUTIONS_CONTENT.domains.subtitle}
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {L3M_SOLUTIONS_CONTENT.domains.items.map((item, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.1}>
                <div className="border-l-2 border-accent pl-6">
                  <h3 className="font-serif text-2xl font-medium text-ink mb-4">
                    {item.title}
                  </h3>
                  <p className="font-sans text-lg leading-relaxed text-ink/70">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-24 lg:py-32 bg-sand-light">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl mb-12">
              <p className="small-caps text-accent mb-4 tracking-wider">
                {L3M_SOLUTIONS_CONTENT.differentiation.subtitle}
              </p>
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-8">
                {L3M_SOLUTIONS_CONTENT.differentiation.title}
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-4xl space-y-4">
              <ul className="space-y-4 font-sans text-lg leading-relaxed text-ink/70">
                {L3M_SOLUTIONS_CONTENT.differentiation.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-3 mt-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Target Section */}
      <section className="py-24 lg:py-32 bg-sand">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl">
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                {L3M_SOLUTIONS_CONTENT.target.title}
              </h2>
              <p className="font-serif text-xl lg:text-2xl text-ink/90 leading-relaxed mb-8 font-light max-w-4xl">
                {L3M_SOLUTIONS_CONTENT.target.intro}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-4xl space-y-4">
              <ul className="space-y-3 font-sans text-lg leading-relaxed text-ink/70">
                {L3M_SOLUTIONS_CONTENT.target.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-3">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-ink text-sand-light">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="font-serif text-2xl lg:text-3xl text-sand-light/90 leading-relaxed mb-6 font-light">
                {L3M_SOLUTIONS_CONTENT.cta.question}
              </p>
              <p className="font-sans text-lg text-sand-light/80 mb-8">
                {L3M_SOLUTIONS_CONTENT.cta.text}
              </p>
              <SolutionsCtaButton text={L3M_SOLUTIONS_CONTENT.cta.button} />
            </div>
          </FadeIn>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </>
  );
}
