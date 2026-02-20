import { FadeIn } from "@/components/animations/fade-in";

interface CollaboratorsProps {
  title?: string;
  text?: string;
  benefits?: string[];
  cards?: string[];
}

export function Collaborators({ title, text, benefits, cards }: CollaboratorsProps) {
  const defaultBenefits = [
    "Intégrez un écosystème agile et structuré",
    "Bénéficiez d'un accompagnement global et du pilotage stratégique.",
    "Rejoignez une organisation qui valorise compétences et engagement",
  ];

  const defaultCards = [
    "Expertise multisectorielle",
    "Réseau de partenaires engagés",
    "Présence internationale",
    "Solutions adaptées",
  ];

  const benefitsList = benefits || defaultBenefits;
  const cardsList = cards || defaultCards;

  return (
    <section className="py-24 lg:py-32 bg-sand">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Title and Benefits */}
          <FadeIn>
            <div>
              {title && (
                <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-10">
                  {title}
                </h2>
              )}
              {text && (
                <p className="font-sans text-lg leading-relaxed text-ink/70 mb-10">
                  {text}
                </p>
              )}
              <ul className="space-y-6">
                {benefitsList.map((benefit, index) => (
                  <FadeIn key={index} delay={index * 0.15}>
                    <li className="flex items-start gap-5 group">
                      <span className="flex-shrink-0 mt-0.5">
                        <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          <i className="fi fi-rr-check text-white text-xs font-bold"></i>
                        </div>
                      </span>
                      <span className="font-sans text-lg lg:text-xl leading-relaxed text-ink/80 pt-1 group-hover:text-ink transition-colors">
                        {benefit}
                      </span>
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right Column - Cards Grid */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {cardsList.map((card, index) => (
                <FadeIn key={index} delay={0.3 + index * 0.1}>
                  <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex items-center justify-center text-center group cursor-pointer">
                    <h3 className="font-serif text-lg lg:text-xl font-medium text-yellow-600 group-hover:text-yellow-700 transition-colors leading-tight">
                      {card}
                    </h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
