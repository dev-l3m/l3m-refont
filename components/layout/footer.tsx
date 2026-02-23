import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { L3M_CONTENT } from "@/src/content/l3m-legacy-content";
import { NewsletterForm } from "./newsletter-form";

export async function Footer() {
  let settingsMap: Record<string, string> = {};
  
  try {
    const settings = await prisma.siteSettings.findMany({
      where: {
        key: {
          in: ['contact_email', 'contact_phone', 'contact_address', 'social_linkedin', 'social_facebook', 'social_twitter'],
        },
      },
    });

    settingsMap = settings.reduce((acc: Record<string, string>, setting: { key: string; value: string }) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    // La DB n'est pas disponible pendant le build, on utilise un objet vide
    console.log('Database not available during build, using empty settings');
  }

  const navigation = {
    legal: [
      { name: "FAQ", href: "/faq" },
      { name: "Politique de confidentialité", href: "/politique-confidentialite" },
      { name: "Nos engagements / Notre charte", href: "/nos-engagements-notre-charte" },
      { name: "Conditions Générales de Vente", href: "/conditions-generales-de-vente" },
      { name: "Newsletter", href: "/blog-newsletter" },
    ],
  };

  return (
    <footer className="bg-ink text-sand-light border-t border-rail-dark/30">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-serif font-semibold tracking-tight">L3M Holding</span>
            </div>
            <p className="text-base leading-relaxed text-sand-light/80 mb-6 max-w-md">
              {L3M_CONTENT.footer.baseline.title}
            </p>
            <p className="text-sm leading-relaxed text-sand-light/60 mb-6 max-w-md">
              {L3M_CONTENT.footer.baseline.subtitle}
            </p>
            <div className="flex space-x-5">
              {settingsMap.social_linkedin && (
                <a
                  href={settingsMap.social_linkedin}
                  className="text-sand-light/60 hover:text-accent transition-colors duration-250"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {settingsMap.social_facebook && (
                <a
                  href={settingsMap.social_facebook}
                  className="text-sand-light/60 hover:text-accent transition-colors duration-250"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div>
            <h3 className="small-caps text-sand-light/80 mb-6">Newsletter</h3>
            <p className="text-sm leading-relaxed text-sand-light/70 mb-4">
              Restez informé de nos actualités et événements
            </p>
            <NewsletterForm />
          </div>
          <div>
            <h3 className="small-caps text-sand-light/80 mb-6">Contact</h3>
            <ul role="list" className="space-y-3">
              <li>
                <span className="text-sm font-medium text-sand-light/80">{L3M_CONTENT.contact.emailLabel}</span>
                <a
                  href={`mailto:${L3M_CONTENT.contact.email}`}
                  className="block text-sm leading-relaxed text-sand-light/70 hover:text-accent transition-colors duration-250"
                >
                  {L3M_CONTENT.contact.email}
                </a>
              </li>
              <li>
                <span className="text-sm font-medium text-sand-light/80">{L3M_CONTENT.contact.phoneLabel}</span>
                <a
                  href={`tel:${L3M_CONTENT.contact.phone}`}
                  className="block text-sm leading-relaxed text-sand-light/70 hover:text-accent transition-colors duration-250"
                >
                  {L3M_CONTENT.contact.phone}
                </a>
              </li>
              <li>
                <span className="text-sm font-medium text-sand-light/80">{L3M_CONTENT.contact.addressLabel}</span>
                <div className="text-sm leading-relaxed text-sand-light/70">
                  {L3M_CONTENT.contact.address.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-sand-light/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 order-1 sm:order-2 items-center sm:items-center">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs text-sand-light/50 hover:text-accent transition-colors duration-250 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <p className="text-xs text-sand-light/50 order-2 sm:order-1 text-center sm:text-left">
              {L3M_CONTENT.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
