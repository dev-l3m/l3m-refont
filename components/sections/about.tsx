import { FadeIn } from "@/components/animations/fade-in";

interface AboutProps {
  title?: string;
  subtitle?: string;
  content?: string;
}

export function About({ title, subtitle, content }: AboutProps) {
  if (!title && !content) return null;

  return (
    <section className="py-24 lg:py-32 bg-sand">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <div className="max-w-5xl">
          <FadeIn>
            <div>
              {title && (
                <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-8">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="font-serif text-xl lg:text-2xl leading-relaxed text-ink/80 mb-6 font-light max-w-4xl">
                  {subtitle}
                </p>
              )}
              {content && (
                <p className="font-sans text-lg leading-relaxed text-ink/70 max-w-3xl">
                  {content}
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
