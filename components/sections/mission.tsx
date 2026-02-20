import { FadeIn } from "@/components/animations/fade-in";

interface MissionProps {
  title?: string;
  text?: string;
}

const missionCards = [
  {
    icon: "fi fi-rr-chart-histogram",
    title: "Transformer des idées ambitieuses en projets concrets",
    description: "L3M agit comme un moteur entrepreneurial qui donne vie à des concepts innovants, en les structurant et en les accompagnant jusqu'à leur réalisation.",
    iconColor: "text-ink",
    titleColor: "text-ink",
  },
  {
    icon: "fi fi-rr-handshake",
    title: "Piloter et accompagner les filiales",
    description: "Nous assurons la gestion stratégique, opérationnelle, RH, communication et commerciale de nos filiales, garantissant cohérence et performance à chaque étape.",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-500",
  },
  {
    icon: "fi fi-rr-lightbulb",
    title: "Construire un écosystème structuré et ouvert",
    description: "L3M crée un environnement professionnel organisé où chaque partenaire, interne ou externe, trouve sa place et bénéficie d'un accompagnement adapté, notamment pour le développement international.",
    iconColor: "text-yellow-500",
    titleColor: "text-ink",
  },
];

export function Mission({ title, text }: MissionProps) {
  return (
    <section className="py-24 lg:py-32 bg-sand">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        {title && (
          <FadeIn>
            <div className="max-w-5xl mb-12">
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                {title}
              </h2>
              {text && (
                <p className="font-sans text-lg leading-relaxed text-ink/70 max-w-3xl">
                  {text}
                </p>
              )}
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {missionCards.map((card, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <div className="bg-white rounded-lg p-8 shadow-sm border border-rail/50 h-full flex flex-col">
                <div className="mb-6">
                  <i className={`${card.icon} ${card.iconColor} text-4xl lg:text-5xl`}></i>
                </div>
                <h3 className={`font-serif text-xl lg:text-2xl font-medium ${card.titleColor} leading-tight mb-4`}>
                  {card.title}
                </h3>
                <p className="font-sans text-base lg:text-lg leading-relaxed text-ink/70 flex-grow">
                  {card.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
