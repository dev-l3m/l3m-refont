"use client";

import { FadeIn } from "@/components/animations/fade-in";

interface JoinusProps {
  title?: string;
  text?: string;
}

export function Joinus({ title, text }: JoinusProps) {
  const defaultTitle = "REJOIGNEZ NOTRE ÉCOSYSTÈME";
  const defaultText = "L'ADN de L3M, c'est aussi une culture: celle de l'excellence sobre. Nos collaborateurs, associés et partenaires intègrent ce niveau d'exigence dès leur entrée dans notre écosystème.";

  return (
    <section className="py-24 lg:py-32 bg-sand">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <FadeIn>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
              {title || defaultTitle}
            </h2>
            <p className="font-sans text-lg lg:text-xl leading-relaxed text-ink/70 max-w-4xl mx-auto">
              {text || defaultText}
            </p>
          </div>
        </FadeIn>

        {/* Animated Map */}
        <FadeIn delay={0.2}>
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-sand/20 to-sand/40 border border-rail/30 hover:shadow-3xl transition-shadow duration-500">
              <div className="relative aspect-video w-full">
                <img
                  src="https://www.l3m-holding.net/assets/carte%20L3M-Ddh4WM5C.gif"
                  alt="Carte mondiale de l'écosystème L3M montrant les connexions internationales"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
