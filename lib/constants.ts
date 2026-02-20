export const SITE_CONFIG = {
  name: "L3M Holding",
  description: "Investissement & Développement Stratégique",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.l3m-holding.net",
  ogImage: "/og-image.jpg",
  links: {
    linkedin: "https://linkedin.com/company/l3m-holding",
    twitter: "https://twitter.com/l3mholding",
  },
} as const;

export const NAVIGATION = [
  { name: "Accueil", href: "/" },
  { name: "Le Groupe", href: "/groupe" },
  { name: "Expertises", href: "/expertises" },
  { name: "Filiales", href: "/filiales" },
  { name: "Actualités", href: "/actualites" },
  { name: "Contact", href: "/contact" },
] as const;
