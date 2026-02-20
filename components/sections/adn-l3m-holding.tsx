import { FadeIn } from "@/components/animations/fade-in";

interface AdnCard {
  icon: string;
  title: string;
  intro: string;
  items: string[];
}

interface AdnL3mHoldingProps {
  title?: string;
  text?: string;
  cards?: AdnCard[];
}

export function AdnL3mHolding({ title, text, cards }: AdnL3mHoldingProps) {
  const defaultCards: AdnCard[] = [
    {
      icon: "fi fi-rr-building",
      title: "Une vision long terme",
      intro: "Nous construisons des structures durables, pas des effets d'annonce.",
      items: [
        "Vision globale dès l'origine",
        "Processus clairs, pas de hasard",
        "Synergie entre les entités",
        "Architecture d'ensemble maîtrisée",
      ],
    },
    {
      icon: "fi fi-rr-lock",
      title: "Une culture de la responsabilité",
      intro: "Nous ne vendons pas de rêve. Nous bâtissons. Et nous le faisons avec méthode, transparence et engagement",
      items: [
        "Engagements tenus",
        "Partenariats sélectionnés",
        "Responsabilité partagée",
        "Transparence",
      ],
    },
    {
      icon: "fi fi-rr-coins",
      title: "Qualité dans l'action, pas dans les mots",
      intro: "un partenariat basé sur la confiance",
      items: [
        "Standards élevés",
        "Pérennité comme objectif commun",
        "Éthique professionnelle",
        "Loyauté et confiance mutuelle",
      ],
    },
    {
      icon: "fi fi-rr-globe",
      title: "Une discrétion assumée, une efficacité reconnue",
      intro: "",
      items: [
        "Influence par la solidité",
        "Priorité à l'impact, pas au paraître",
        "structures qui tiennent",
        "résultats qui durent",
      ],
    },
  ];

  const cardsList = cards || defaultCards;

  return (
    <section className="py-24 lg:py-32 bg-sand">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        {/* Title and Intro */}
        <FadeIn>
          <div className="text-center mb-16">
            {title && (
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                {title}
              </h2>
            )}
            {text && (
              <p className="font-sans text-lg leading-relaxed text-ink/70 max-w-3xl mx-auto">
                {text}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Cards Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cardsList.map((card, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <div className="bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-rail/50 h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                    <i className={`${card.icon} text-ink text-2xl lg:text-3xl group-hover:scale-110 transition-transform`}></i>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl lg:text-2xl font-medium text-ink leading-tight mb-4 group-hover:text-yellow-600 transition-colors">
                  {card.title}
                </h3>

                {/* Intro */}
                {card.intro && (
                  <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 mb-6">
                    {card.intro}
                  </p>
                )}

                {/* Items List */}
                <ul className="space-y-3 mt-auto">
                  {card.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 group/item">
                      <span className="flex-shrink-0 mt-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 group-hover/item:scale-125 transition-transform"></div>
                      </span>
                      <span className="font-sans text-base lg:text-lg leading-relaxed text-ink/80 group-hover/item:text-ink transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
