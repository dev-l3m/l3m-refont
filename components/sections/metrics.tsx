import { Counter } from "@/components/animations/counter";
import { FadeIn } from "@/components/animations/fade-in";
import { prisma } from "@/lib/prisma";
import { L3M_CONTENT } from "@/src/content/l3m-legacy-content";

export async function Metrics() {
  // Utiliser les stats du contenu legacy
  const metrics = L3M_CONTENT.home.stats.map((stat, index) => ({
    id: `stat-${index}`,
    value: stat.value,
    label: stat.label,
    description: null,
    suffix: "",
    visible: true,
    order: index,
  }));

  if (metrics.length === 0) return null;

  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <FadeIn>
          <div className="max-w-5xl mb-20">
            <h2 className="font-serif text-display font-medium text-ink leading-[1.05]">
              Comment L3M Holding se distingue-t-il ?
            </h2>
          </div>
        </FadeIn>
        <div className="max-w-7xl">
          <dl className="grid grid-cols-1 gap-x-16 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <FadeIn key={metric.id} delay={index * 0.15}>
                <div className="flex flex-col">
                  <dt className="small-caps text-muted mb-6">
                    {metric.label}
                  </dt>
                  <dd className="font-serif text-6xl lg:text-7xl font-medium tracking-tight text-ink leading-none">
                    {metric.value.includes("+") || metric.value.includes("%") ? (
                      <span>{metric.value}</span>
                    ) : (
                      <Counter value={parseInt(metric.value) || 0} suffix={metric.suffix || ""} />
                    )}
                  </dd>
                  {metric.description && (
                    <dd className="mt-6 font-sans text-sm leading-relaxed text-ink/70">
                      {metric.description}
                    </dd>
                  )}
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
