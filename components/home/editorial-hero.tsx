"use client";

import { TransitionLink } from "@/components/transitions/transition-link";
import { FadeIn } from "@/components/animations/fade-in";

interface EditorialHeroProps {
  title: string;
  subtitle?: string;
  content?: string;
}

export function EditorialHero({ title, subtitle, content }: EditorialHeroProps) {
  // Parse le contenu pour identifier les mots à accentuer et les liens
  const parseContent = (text: string) => {
    if (!text) return null;
    
    // Détecter les patterns pour les accents et liens
    // Format: [mot accent] ou {texte|href} pour les liens
    const parts: (string | JSX.Element)[] = [];
    let currentIndex = 0;
    
    // Pattern pour les liens: {texte|href}
    const linkPattern = /\{([^|]+)\|([^}]+)\}/g;
    let match;
    let lastIndex = 0;
    
    while ((match = linkPattern.exec(text)) !== null) {
      // Ajouter le texte avant le lien
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        parts.push(beforeText);
      }
      
      // Ajouter le lien
      parts.push(
        <TransitionLink
          key={match.index}
          href={match[2]}
          className="editorial-link"
        >
          {match[1]}
        </TransitionLink>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Ajouter le reste du texte
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    // Si aucun lien trouvé, chercher les mots accentués [mot]
    if (parts.length === 0) {
      const accentPattern = /\[([^\]]+)\]/g;
      let accentMatch;
      let accentLastIndex = 0;
      
      while ((accentMatch = accentPattern.exec(text)) !== null) {
        if (accentMatch.index > accentLastIndex) {
          parts.push(text.substring(accentLastIndex, accentMatch.index));
        }
        parts.push(
          <span key={accentMatch.index} className="editorial-accent">
            {accentMatch[1]}
          </span>
        );
        accentLastIndex = accentMatch.index + accentMatch[0].length;
      }
      
      if (accentLastIndex < text.length) {
        parts.push(text.substring(accentLastIndex));
      }
      
      if (parts.length === 0) {
        parts.push(text);
      }
    }
    
    return parts;
  };

  const parsedContent = content ? parseContent(content) : null;

  return (
    <section className="min-h-[85vh] flex items-center bg-sand pt-20 lg:pt-0">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <FadeIn>
          <div className="max-w-5xl">
            <h1 className="font-serif text-hero font-medium text-ink leading-[1.05] tracking-tight mb-8">
              {title}
            </h1>
            {subtitle && (
              <p className="font-serif text-2xl lg:text-3xl text-ink/90 leading-relaxed mb-6 font-light max-w-4xl">
                {subtitle}
              </p>
            )}
            {parsedContent && (
              <p className="font-sans text-lg lg:text-xl text-ink/80 leading-relaxed max-w-4xl">
                {parsedContent}
              </p>
            )}
            {content && !parsedContent && (
              <p className="font-sans text-lg lg:text-xl text-ink/80 leading-relaxed max-w-4xl">
                {content}
              </p>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
