"use client";

import { TransitionLink } from "@/components/transitions/transition-link";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PartnershipForm } from "@/components/forms/partnership-form";

interface EditorialHeroProps {
  title: string;
  subtitle?: string;
  content?: string;
}

export function EditorialHero({ title, subtitle, content }: EditorialHeroProps) {
  const [partnershipDialogOpen, setPartnershipDialogOpen] = useState(false);

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

  const handleContactClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="https://l3m.factorial.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-accent bg-transparent hover:bg-accent hover:text-white text-accent font-sans font-medium rounded-lg px-6 py-3 transition-all duration-300 text-center"
              >
                Rejoindre nos équipes
              </a>
              <Dialog open={partnershipDialogOpen} onOpenChange={setPartnershipDialogOpen}>
                <DialogTrigger asChild>
                  <button className="bg-accent hover:bg-accent-dark text-white font-sans font-medium rounded-lg px-6 py-3 transition-all duration-300 text-center">
                    Devenir partenaire
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <PartnershipForm onClose={() => setPartnershipDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
