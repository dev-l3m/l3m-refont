import { Metadata } from "next";
import { FadeIn } from "@/components/animations/fade-in";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { prisma } from "@/lib/prisma";
import { L3M_ABOUT_CONTENT } from "@/src/content/l3m-about-legacy";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({
    where: { slug: 'groupe' },
  });

  return {
    title: page?.metaTitle || page?.title || L3M_ABOUT_CONTENT.header.title,
    description: page?.metaDescription || page?.description || L3M_ABOUT_CONTENT.header.subtitle,
    keywords: page?.metaKeywords,
  };
}

export default async function AboutPage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'groupe' },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center bg-sand">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-32">
          <FadeIn>
            <div className="max-w-5xl">
              <p className="small-caps text-accent mb-4 tracking-wider">
                {L3M_ABOUT_CONTENT.header.subtitle}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-hero font-medium text-ink leading-[1.05] tracking-tight mb-6 lg:mb-8">
                {L3M_ABOUT_CONTENT.header.title}
              </h1>
              <p className="font-serif text-2xl lg:text-3xl text-ink/90 leading-relaxed mb-8 font-light max-w-4xl">
                {L3M_ABOUT_CONTENT.header.headline}
              </p>
              <div className="space-y-6 font-sans text-lg lg:text-xl text-ink/80 leading-relaxed max-w-4xl">
                {L3M_ABOUT_CONTENT.header.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 lg:py-32 bg-sand">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl mb-12">
              <p className="small-caps text-accent mb-4 tracking-wider">
                {L3M_ABOUT_CONTENT.history.subtitle}
              </p>
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-8">
                {L3M_ABOUT_CONTENT.history.title}
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-4xl space-y-6">
              {L3M_ABOUT_CONTENT.history.paragraphs.map((paragraph, index) => (
                <p key={index} className="font-sans text-lg leading-relaxed text-ink/70">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Role Section */}
      <section className="py-24 lg:py-32 bg-sand-light">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl">
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                {L3M_ABOUT_CONTENT.role.title}
              </h2>
              <p className="font-serif text-xl lg:text-2xl text-ink/90 leading-relaxed mb-8 font-light max-w-4xl">
                {L3M_ABOUT_CONTENT.role.intro}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-4xl space-y-4 mb-8">
              <ul className="space-y-3 font-sans text-lg leading-relaxed text-ink/70">
                {L3M_ABOUT_CONTENT.role.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-3">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-sans text-lg leading-relaxed text-ink/70 max-w-4xl">
              {L3M_ABOUT_CONTENT.role.closing}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-24 lg:py-32 bg-sand">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl mb-16">
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-8">
                {L3M_ABOUT_CONTENT.differentiation.title}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {L3M_ABOUT_CONTENT.differentiation.items.map((item, index) => (
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

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-sand-light">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl mb-16">
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-8">
                Nos valeurs
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {L3M_ABOUT_CONTENT.values.map((value, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.1}>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-medium text-ink">
                    {value.title}
                  </h3>
                  <p className="font-sans text-lg leading-relaxed text-ink/70">
                    {value.text}
                  </p>
                  {"highlight" in value && value.highlight && (
                    <div className="pt-4 border-t border-rail">
                      <p className="font-semibold text-ink mb-2">{value.highlight}</p>
                      <p className="font-sans text-base leading-relaxed text-ink/70">
                        {value.explanation}
                      </p>
                    </div>
                  )}
                  {value.explanation && !("highlight" in value && value.highlight) && (
                    <p className="font-sans text-base leading-relaxed text-ink/70 pt-4 border-t border-rail">
                      {value.explanation}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footprint Section */}
      <section className="py-24 lg:py-32 bg-sand">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-5xl mb-12">
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-8">
                {L3M_ABOUT_CONTENT.footprint.title}
              </h2>
              {L3M_ABOUT_CONTENT.footprint.paragraphs.map((paragraph, index) => (
                <p key={index} className="font-sans text-lg leading-relaxed text-ink/70 mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-4xl space-y-4">
              <ul className="space-y-4 font-sans text-lg leading-relaxed text-ink/70">
                {L3M_ABOUT_CONTENT.footprint.items.map((item, index) => (
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

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-ink text-sand-light">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="font-serif text-2xl lg:text-3xl text-sand-light/90 leading-relaxed mb-8 font-light">
                {L3M_ABOUT_CONTENT.cta.text}
              </p>
              <p className="font-serif text-xl text-accent mb-6">
                {L3M_ABOUT_CONTENT.cta.question}
              </p>
              <p className="font-sans text-lg text-sand-light/80 mb-8">
                {L3M_ABOUT_CONTENT.cta.action}
              </p>
              <Button
                asChild
                className="bg-accent text-ink hover:bg-accent-light"
              >
                <Link href="/#contact">
                  {L3M_ABOUT_CONTENT.cta.button}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </>
  );
}
